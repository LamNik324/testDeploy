import User from '../server/models/user.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const db = mongoose.connect(process.env.MONGO_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// mongoose.pluralize(null)

db.then(async () => {
// mongoose.connection.db.dropDatabase()

  await User.create({
    name: 'Nikita',
    email: 'test@test.ru',
    password: 'Mikita',
    phone: 89124234923,
  })
  mongoose.disconnect()
})


