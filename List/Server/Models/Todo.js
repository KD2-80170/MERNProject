const mongoose=require('mongoose')

const TodoSchema=new mongoose.Schema({
    task:String,
    done:
    {
      type:Boolean,
      default:false
    }
});

const TodoModel =mongoose.model("todos",TodoSchema)//name of database is todo
module.exports =TodoModel;
