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
router.get('/header/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_eva} = req.params
        const [rows] = await db.query(`select * from tb_member , tb_eva , tb_system where tb_eva.id_eva='${id_eva}' and tb_eva.id_member=tb_member.id_member and tb_system.id_sys=tb_eva.id_sys`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({ message:'Error Get' })
    }
})

// Get Api
router.get('/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_eva} = req.params
        const [before] = await db.query(`select id_member,concat(first_name,' ',last_name) as fullname_commit from tb_member where role='กรรมการประเมิน' order by id_member desc`)
        const [after] = await db.query(`select id_commit,first_name,last_name,tb_member.id_member,level_commit as role from tb_eva,tb_commit,tb_member where tb_commit.id_eva='${id_eva}' and tb_eva.id_eva=tb_commit.id_eva and tb_commit.id_member=tb_member.id_member order by tb_member.id_member desc`)
        res.json({before,after})
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({ message:'Error Get' })
    }
})

// Post Api
router.post('/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_eva} = req.params
        await db.query(`delete from tb_commit where id_eva='${id_eva}'`)
        const commit = req.body
        const v = commit.map(m => [id_eva,m.id_member,m.role,'n'])
        await db.query(`insert into tb_commit (id_eva,id_member,level_commit,status_commit) values ?`,[v])
        res.json({message:'Insert Success!'})
    }catch(err){
        console.error('Error Insert',err)
        res.status(500).json({ message:'Error Insert' })
    }
})

// Delete Api
router.delete('/:id_commit',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_commit} = req.params
        const [rows] = await db.query(`delete from tb_commit where id_commit='${id_commit}'`)
        res.json(rows)
    }catch(err){
        console.error('Error Delete',err)
        res.status(500).json({ message:'Error Delete' })
    }
})

module.exports = router