const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Todo = require('./models/todo');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(methodOverride("_method"));

// configure mongoose or connect to mongoose
mongoose.connect('mongodb://127.0.0.1:27017/toDos')
    .then(() => { console.log("SUCCESS CONNECTING TO MONGODB!") }
    )
    .catch(err => {
        console.log("FAILED TO CONNECT TO THE DB");
        console.log(err)
    })


// ROUTES

// home route
app.get('/', async (req, res) => {
    const todos = await Todo.find({});
    res.render("home", { todos });
});


// create todo routes
app.get('/new', (req, res) => {
    res.render("newTodo");
})

app.post('/new', async (req, res) => {
    const todo = req.body;
    await Todo.insertOne(todo);
    res.redirect("/");
})

// editing todos
app.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    res.render("editTodo", { todo });
})

app.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const todo = req.body;
    await Todo.findByIdAndUpdate(id, todo);
    res.redirect("/");
})

// delete route
app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.redirect("/");
})

// connect to port 3000
app.listen(3000, () => {
    console.log("APP RUNNING ON PORT 3000");
})