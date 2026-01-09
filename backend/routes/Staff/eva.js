const express = require('express')
const router = express.Router()
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authMiddleware')

// Get Api
// router.get('/',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
//     try{
//         const [rows] = await db.query(`select * from`)
//         res.json(rows)
//     }catch(err){
//         console.error('Error Get',err)
//         res.status(500).json({ message:'Error Get' })
//     }
// })

// Get Api
router.get('/round',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_system where status_sys='y' order by id_sys desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({ message:'Error Get' })
    }
})

// Get Api
router.get('/',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_eva,tb_member,tb_system where tb_eva.id_member=tb_member.id_member and tb_system.id_sys=tb_eva.id_sys and status_eva=1 order by id_eva desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({ message:'Error Get' })
    }
})

// Get all Api
router.get('/all',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_eva,tb_member,tb_system where tb_eva.id_member=tb_member.id_member and tb_system.id_sys=tb_eva.id_sys order by id_eva desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({ message:'Error Get' })
    }
})

// Post Api
router.post('/',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_member,day_eva,id_sys} = req.body
        const [rows] = await db.query(`insert into tb_eva (id_member,day_eva,id_sys,status_eva,total_eva) values (?,?,?,?,?)`,[id_member,day_eva,id_sys,1,'00.00'])
        res.json({rows,message:'Insert Success!'})
    }catch(err){
        console.error('Error insert',err)
        res.status(500).json({ message:'Error insert' })
    }
})

// Put Api
router.put('/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_eva} = req.params
        const {id_member,day_eva,id_sys} = req.body
        const [rows] = await db.query(`update tb_eva set id_member=?,day_eva=?,id_sys=?,status_eva=? where id_eva='${id_eva}'`,[id_member,day_eva,id_sys,1])
        res.json({rows,message:'Update Success!'})
    }catch(err){
        console.error('Error Update',err)
        res.status(500).json({ message:'Error Update' })
    }
})

// Delete Api
router.delete('/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_eva} = req.params
        // const {id_member,day_eva,id_sys} = req.body
        const [rows] = await db.query(`delete from tb_eva where id_eva='${id_eva}'`)
        res.json({rows,message:'Delete Success!'})
    }catch(err){
        console.error('Error Delete',err)
        res.status(500).json({ message:'Error Delete' })
    }
})

module.exports = router