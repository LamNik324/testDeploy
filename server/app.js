import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/user.js";

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//                                          middleware for cors
// app.use(async (req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// });

app.get('/test', (req, res) => {
  res.send('Im am alive')
})

app.get("/api", async (req, res) => {
  const todos = await Todo.find();
  setTimeout(() => {
    res.send(todos);
  }, 1000)
  // res.send(todos)
});

app.post("/api/create", async (req, res) => {
  const { todo } = req.body;
  const todoId = await Todo.create({
    title: todo,
    completed: false,
    createdAt: new Date().toLocaleTimeString(),
  })
  res.json(todoId)
});

app.post('/api/delete/:id', async (req, res) => {
  const {id} = req.body;
  await Todo.deleteOne({_id: id});
  res.end();
})

app.post('/api/update/:id', async (req, res) => {
  const {id} = req.params
  const {title} = req.body
  const todo = await Todo.findOne({_id: id})
  todo.title = title
  todo.save()
  res.send(todo)
})

app.post('/api/done/:id', async (req, res) => {
  const {id} = req.params;
  console.log(id);
  const todoCompleted = await Todo.findById(id)
  todoCompleted.completed = !todoCompleted.completed
  todoCompleted.save()
  res.send(todoCompleted)
})

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
