const express = require('express')
const db = require('../db')
const router = express.Router()
const bc = require('bcryptjs')

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

router.post('/regis',async (req,res) => {
    try{
        const {first_name,last_name,email,username,password,role} = req.body
        const hashPassword = await bc.hash(password,10)
        const [rows] = await  db.query(`insert into tb_member (first_name,last_name,email,username,password,role) values (?,?,?,?,?,?)`,[first_name,last_name,email,username,hashPassword,role])
        res.json(rows)
    }catch(err){
        console.error("Error Register",err)
        res.status(500).json({ message:'Error Register' })
    }
})

router.post('/login',async (req,res) => {
    try{
        const {username,password,role} = req.body
        const [rows] = await db.query(`select * from tb_member where username='${username}' and role='${role}'`)
        const m = rows[0]
        if(!m || !(await bc.compare(password,m.password))) return res.status(401).json({ message:'Login Failed!' })
        
        const token = jwt.sign(
            { id_member:m.id_member,username:m.username,role:m.role } , JWT_SECRET , { expiresIn: '1h'}
        )
        res.json({token,role:m.role})
    }catch(err){
        console.error("Login Failed",err)
        res.status(500).json({ message:'Login Failed',err})
    }
})

module.exports = router