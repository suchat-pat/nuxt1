const express = require('express')
const db = require('../../db')
const router = express.Router()
const {verufyToken,requireRole} = require('../../middleware/authMiddleware')

// API สำหรับ Get ข้อมูล
router.get('/eva',verufyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_member where role='ผู้รับการประเมินผล' order by id_member desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({ message:'Error Get' })
    }
})

// API สำหรับ Get ข้อมูล
router.get('/commit',verufyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_member where role='กรรมการประเมิน' order by id_member desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({ message:'Error Get' })
    }
})

// API สำหรับ Get ข้อมูล #getAll
router.get('/',verufyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_member order by id_member desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({ message:'Error Get' })
    }
})


// API สำหรับ Get ข้อมูล จาก params
router.get('/:id_member',verufyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
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
router.put('/:id_member',verufyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_member} = req.params
        const {first_name,last_name,email,username,password,role} = req.body
        const [rows] = await db.query(`update tb_member set first_name=?,last_name=?,email=?,username=?,password=?,role=? where id_member='${id_member}'`,[first_name,last_name,email,username,password,role])
        res.json({rows,message: "Update Success!"})
    }catch(err){
        console.error('Error Put',err)
        res.status(500).json({ message: 'Error Put' })
    }
})

// API Delete
router.delete('/:id_member',verufyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
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