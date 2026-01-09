require('dotenv').config()
const express = require('express')
const fileupload = require('express-fileupload')
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

const auth = require('./routes/auth')
app.use('/api/auth',auth)

const profile = require('./routes/profile')
app.use('/api/profile',profile)

//eva
const edit_eva = require('./routes/Eva/edit_eva')
app.use('/api/Eva/edit_eva',edit_eva)

const selfeva = require('./routes/Eva/selfeva')
app.use('/api/Eva/selfeva',selfeva)

const score_member = require('./routes/Eva/score_member')
app.use('/api/Eva/score_member',score_member)

const score_commit = require('./routes/Eva/score_commit')
app.use('/api/Eva/score_commit',score_commit)

//commit
const show_eva = require('./routes/Commit/show_eva')
app.use('/api/Commit/show_eva',show_eva)

const detail_eva = require('./routes/Commit/detail_eva')
app.use('/api/Commit/detail_eva',detail_eva)

const save_score = require('./routes/Commit/save_score')
app.use('/api/Commit/save_score',save_score)

const detail_commit = require('./routes/Commit/detail_commit')
app.use('/api/Commit/detail_commit',detail_commit)

const check_confirm = require('./routes/Commit/check_confirm')
app.use('/api/Commit/check_confirm',check_confirm)

const signature = require('./routes/Commit/signature')
app.use('/api/Commit/signature',signature)

app.use((req,res) => res.status(404).json({message:'ปิดปรับปรุง!'}))
app.listen(3001 , () => console.log('Server Running On Port 3001'))