const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { signToken } = require("./middlewares/jwt");

const { User, Chat } = require("./models/index");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (data) => {
    io.emit("newMessage", data);
  });

  socket.on("leave", (data) => {
    socket.leave(data);
  });
});

app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let findUser = await User.findOne({ where: { email: email } });
    if (!findUser) {
      throw { name: "Invalid" };
    }
    let access_token = signToken({
      username: findUser.username,
      id: findUser.id,
    });

    res.status(200).json({
      access_token: access_token,
      username: findUser.username,
      UserId: findUser.id,
    });
  } catch (error) {
    next(error);
  }
});

app.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    let data = await User.create({
      username,
      email,
      password,
    });
    res.status(201).json({ id: data.id, email: data.email });
  } catch (error) {
    next(error);
  }
});

app.post("/payments", (req, res, next) => {
  const { item } = req.body;
  const midtransClient = require("midtrans-client");

  let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: "SB-Mid-server-dBPOMLz-8x5QKXcP7D9RkTN7",
  });

  let parameter = {
    transaction_details: {
      order_id: `${item}`,
      gross_amount: 50000,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: `reyman`,
      last_name: "mankarman",
      email: `karman.sonys@gmail.com`,
      phone: "08516175033",
    },
  };
  snap
    .createTransaction(parameter)
    .then((transaction) => {
      let transactionToken = transaction.token;

      res.status(201).json({ transactionToken: transactionToken });
    })
    .catch((err) => {
      next(err);
    });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
