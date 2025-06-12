const model = require('../models/Todo.js');

// For Getting the All Data
const getTodos = async(req,res)=>{
    try {

        const item = await model.find({user:req.user.id});
        return res.json(item)
        
    } catch (error) {
        return res.status(500).json({message:"Failed when fetch Todos"})
    }
}

// For Getting a specific Data

const getTodo = async(req, res)=>{
    try {

        const {id} = req.params;

        const item = await model.findOne({_id:id,user:req.user.id});
        res.status(200).json(item)

        
    } catch (error) {
        return res.status(500).json({message:"Failed When get Specific data", error:error,message})
    }
}

// For Adding the new Data
const AddTodo = async(req, res)=>{
    try {

        const {name, date} = req.body;

        if(!name || !date){
            return res.status(400).json({message:"Enter Required Fields"})
        }

        const items = await model.create({
            name,date, user:req.user.id
        })

        return res.status(200).json({items,message:"Items are Entered"})
        
    } catch (error) {
        return res.status(500).json({message:"Failed To Enter The data", error:error.message})
    }
}

// For Editing a Data
const editTodo = async(req, res)=>{
    try {

        const {id} = req.params;
        const {name,date} = req.body;

        const item = await model.findOne({_id:id, user:req.user.id});

        if(!item){
            return res.status(404).json({message:"Item is not Found"})
        }

        const editData = await model.findByIdAndUpdate(id, {...req.body}, {new:true});
        return res.status(200).json({message:"Editing Data is : ", editData})
       
    } catch (error) {
        return res.status(500).json({message:"Enable to Edit the Data", error:error.message})
    }
}

// For Deleting a Todo 
const deleteTodo = async(req,res)=>{
    try {

        const {id} = req.params;

        const item = await model.findOneAndDelete({_id:id, user:req.user.id})
        res.status(200).json({message:"Below item is deleted", item})
        
    } catch (error) {
        return res.status(500).json({message:"Failed when deleting data", error:error.message})
    }
}

module.exports = {AddTodo, getTodo, getTodos, editTodo, deleteTodo};