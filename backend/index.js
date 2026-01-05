require('dotenv').config()
const express = requrie('express')
const fileupload = requrie('express-fileupload')
const cors = require('cors')
const app = express()
const path = require('path')

app.use(cors ({
    origin:'http://localhost:3000',
    credentials: true
}))

app.use(express.json())
app.use(fileupload())
app.use('/uploads',express.static(path.join('uploads')))

app.use((req,res) => res.status(404).json({message:'ปิดปรับปรุง!'}))
app.listen(3001 , () => console.log('Server Running On Port 3001'))