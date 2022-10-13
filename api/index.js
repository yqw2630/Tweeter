const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const multer = require('multer')
const path = require('path')

dotenv.config();

mongoose.connect(process.env.MONGO_URL, ()=>{
    console.log('MongoDB Connected!')
});

app.use('/images', express.static(path.join(__dirname, 'public/images')))

//middleware
app.use(express.json());
app.use(helmet())
app.use(morgan('common'))
//FILE Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage })
app.post('/api/upload', upload.any(), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
})

app.get('/', (req,res)=> {
    res.send('Welcome to homepage')
})

app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)

app.listen(8800,()=> {
    console.log('Backend server fired up! Ready to go')
})