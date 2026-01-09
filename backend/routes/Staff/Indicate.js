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
router.get('/',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_indicate,tb_topic where tb_indicate.id_topic=tb_topic.id_topic order by id_indicate desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({ message:'Error Get' })
    }
})

// Get Api By params
router.get('/:id_indicate',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_indicate} = req.params
        const [rows] = await db.query(`select * from tb_indicate where id_indicate='${id_indicate}'`)
        if(rows.length === 0) return res.status(403).json({ message:'ไม่พบข้อมูลจากไอดีนี้' })
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({ message:'Error Get' })
    }
})

// Post Api
router.post('/',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_topic,name_indicate,detail_indicate,point_indicate,check_indicate} = req.body
        const [rows] = await db.query(`insert into tb_indicate (id_topic,name_indicate,detail_indicate,point_indicate,check_indicate) values (?,?,?,?,?)`,[id_topic,name_indicate,detail_indicate,point_indicate,check_indicate])
        res.json({rows,message:'Post Success'})
    }catch(err){
        console.error('Error Post',err)
        res.status(500).json({ message:'Error Post' })
    }
})

// Put Api
router.put('/:id_indicate',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_indicate} = req.params
        const {id_topic,name_indicate,detail_indicate,point_indicate,check_indicate} = req.body
        const [rows] = await db.query(`update tb_indicate set id_topic=?,name_indicate=?,detail_indicate=?,point_indicate=?,check_indicate=? where id_indicate='${id_indicate}'`,[id_topic,name_indicate,detail_indicate,point_indicate,check_indicate])
        res.json({rows,message:'Put Success'})
    }catch(err){
        console.error('Error Put',err)
        res.status(500).json({ message:'Error Put' })
    }
})

// Delete Api
router.delete('/:id_indicate',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_indicate} = req.params
        const [rows] = await db.query(`delete from tb_indicate where id_indicate='${id_indicate}'`)
        if(rows.affectedRows === 0) return res.status(403).json({message:'ไม่พบข้อมูลจากไอดีนี้'})
        res.json({rows,message:'Delete Success'})
    }catch(err){
        console.error('Error Delete',err)
        res.status(500).json({ message:'Error Delete' })
    }
})

module.exports = router