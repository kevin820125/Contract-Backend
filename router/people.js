const express = require('express');
var ObjectId = require('mongodb').ObjectId; 
const router = express.Router()
const User = require('../model/people')

router.get('/' , async (req, res)=>{
    try{
        const user = await User.find()
        res.json(user)
    }catch(e){
        res.status(500).json({message : e.message})
    }
})


router.get('/:id' , async (req, res)=>{
    try{
        dp = await User.findOne({ _id : ObjectId(req.params.id)})
        if(!dp){
            res.status(400).json({message : 'no this contract'})
        }
        res.json({person : dp})
    }catch(e){
        return res.status(500).json({message : e.message})
    }
})

router.post('/' , async(req, res)=>{
    try{
        doc = {
            firstName: req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email
        }
        const result = await User.updateOne(
            doc ,doc , {upsert: true});
        if(result.upsertedId === null){
            res.status(400).json({message : 'duplicated contract'})
        }else{
            res.status(201).json(result);
        }
    }catch(err){
        res.status(400).json({message : err.message})
    }
})


router.put('/:id' , async (req, res)=>{
    let dp;
    doc = {
        firstName: req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email
    }
    try{
        dp = await User.findOne({ _id : ObjectId(req.params.id)})
        if(!dp){
            res.status(400).json({message : 'no this contract'})
        }
        res.json({person : dp})
    }catch(e){
        return res.status(500).json({message : e.message})
    }
    const result = await User.updateOne(
        dp ,doc , {upsert: true});
    res.status(201).json(result);
})



router.delete('/:id' , async(req,res) =>{
    dp = await User.findOneAndRemove({ _id : ObjectId(req.params.id)});
    res.status(202).json({deleted : "success"})
})

module.exports = router