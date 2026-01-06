const express = require('express')
const db = require('../../db')
const router = express.Router()
const bc = require('bcryptjs')
const {verifyToken,requireRole} = require('../../middleware/authMiddleware')

router.get('/',verifyToken,requireRole('ผู้รับการประเมินผล'),async (req,res) => {
    try{
        const id_member = req.user.id_member
        const [rows] = await  db.query(`select * from tb_member where id_member=?`,[id_member])
        res.json(rows[0])
    }catch(err){
        console.error("Error GET User",err)
        res.status(500).json({ message:'Error GET User' })
    }
})

router.put('/editname',verifyToken,requireRole('ผู้รับการประเมินผล'),async (req,res) => {
    try{
        const id_member = req.user.id_member
        const {first_name,last_name,email,username} = req.body
        const [rows] = await  db.query(
            `update tb_member set first_name=?,last_name=?,email=?,username=? where id_member=?`,
            [first_name,last_name,email,username,id_member]
        )
        res.status(200).json({message:'Edit Success'},rows[0])
    }catch(err){
        console.error("Error GET Progile",err)
        res.status(500).json({ message:'Error GET Progile' })
    }
})

router.put('/editpass',verifyToken,requireRole('ผู้รับการประเมินผล'),async (req,res) => {
    try{
        const id_member = req.user.id_member
        const {first_name,last_name,email,username,password} = req.body
        const hashPassword = await bc.hash(password,10)
        const [rows] = await  db.query(
            `update tb_member set first_name=?,last_name=?,email=?,username=?,password=? where id_member=?`,
            [first_name,last_name,email,username,hashPassword,id_member]
        )
        res.status(200).json({message:'Edit Success'},rows[0])
    }catch(err){
        console.error("Error GET Progile",err)
        res.status(500).json({ message:'Error GET Progile' })
    }
})

module.exports = router