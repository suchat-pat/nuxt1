const express = require('express')
const db = require('../../db')
const router = express.Router()
const bc = require('bcryptjs')
const {verifyToken,requireRole} = require('../../middleware/authMiddleware')

// API สำหรับ Get ข้อมูล
router.get('/eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const [rows] = await db.query(`select id_member,first_name,last_name,email,username,role from tb_member where role='ผู้รับการประเมินผล' order by id_member desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({ message:'Error Get' })
    }
})

// API สำหรับ Get ข้อมูล
router.get('/commit',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const [rows] = await db.query(`select id_member,first_name,last_name,email,username,role from tb_member where role='กรรมการประเมิน' order by id_member desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({ message:'Error Get' })
    }
})

// API สำหรับ Get ข้อมูล #getAll
router.get('/',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_member order by id_member desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({ message:'Error Get' })
    }
})


// API สำหรับ Get ข้อมูล จาก params
router.get('/:id_member',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_member} = req.params
        const [rows] = await db.query(`select * from tb_member where id_member='${id_member}'`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({ message:'Error Get' })
    }
})

// API PUT
router.put('/:id_member',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_member} = req.params
        const {first_name,last_name,email,username,password,role} = req.body
        const hashPassword = await bc.hash(password,10)
        const [rows] = await db.query(`update tb_member set first_name=?,last_name=?,email=?,username=?,password=?,role=? where id_member='${id_member}'`,[first_name,last_name,email,username,hashPassword,role])
        res.json({rows,message: "Update Success!"})
    }catch(err){
        console.error('Error Put',err)
        res.status(500).json({ message: 'Error Put' })
    }
})

// API Delete
router.delete('/:id_member',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_member} = req.params
        const [rows] = await db.query(`delete from tb_member where id_member='${id_member}'`)
        res.json({rows,message:'Delete Success!'})
    }catch(err){
        console.error("Error Delete",err)
        res.status(500).json({ message:'Error Delete' })
    }
    
})

module.exports = router