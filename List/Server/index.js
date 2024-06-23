const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./Models/Todo'); // Adjust the path to your Todo model
const TodoModel = require('./Models/Todo');

const app = express();
const PORT = 9999;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// POST route to add a new task
app.post('/add', (req, res) => {
    const { task } = req.body;
    const newTodo = new Todo({
        task
    });
    newTodo.save()
    .then(todo => res.status(201).json(todo))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/get',(req,res)=>{
    TodoModel.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))

});

app.put('/update/:id',(req,res)=>
    {
        const{id} =req.params;
        TodoModel.findByIdAndUpdate({_id:id},{done:true})
        .then(result=>response.json(result))
        .catch(err=>res.json(err));
    });

    app.delete('/delete/:id', (req, res) => {
        const { id } = req.params;
        TodoModel.findByIdAndDelete(id)
            .then(result => res.json(result))
            .catch(err => res.json(err));
    });
    
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
