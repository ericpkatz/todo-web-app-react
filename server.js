const { conn, seedData, Todo, User, Category } = require('./db');
const express = require('express');
const app = express();
const path = require('path');
const ws = require('ws');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
app.use(express.json());
app.use('/dist', express.static('dist'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.post('/api/auth/login', async(req, res, next)=> {
  try{
    const { username, password } = req.body
    const user = await User.findOne({
      where: {
        username
      }
    });
    if(!user){
      throw 'NOOOOO';
    }
    const correctPassword = await bcrypt.compare(password, user.password);
    if(!correctPassword){
      throw 'NOOOOO';
    }
    const token = jwt.sign({ id: user.id}, process.env.JWT);
    console.log(token);
    res.send({ token });
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/auth/register', async(req, res, next)=> {
  try{
    const password = await bcrypt.hash(req.body.password, 5);
    const user = await User.create({...req.body, password });
    if(!user){
      throw 'NOOOOO';
    }
    const token = jwt.sign({ id: user.id}, process.env.JWT);
    console.log(token);
    res.send({ token });
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/auth', async(req, res, next)=> {
  try{
    const token = jwt.verify(req.headers.authorization, process.env.JWT);
    const { id } = token;
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ['password']
      }
    });
    if(!user){
      throw 'NOOOOO';
    }
    res.send(user);
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/todos', async(req, res, next)=> {
  try {
    const todos = await Todo.findAll();
    res.send(todos);
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/todos/:id', async(req, res, next)=> {
  try {
    const todo = await Todo.findByPk(req.params.id);
    await todo.destroy();
    res.sendStatus(204);
    sockets.forEach( socket => {
      socket.send(JSON.stringify({type: 'TODO_DESTROY', payload: todo}));
    });
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/categories/:id', async(req, res, next)=> {
  try {
    const category = await Category.findByPk(req.params.id);
    await category.destroy();
    res.sendStatus(204);
    sockets.forEach( socket => {
      socket.send(JSON.stringify({type: 'CATEGORY_DESTROY', payload: category}));
    });
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/todos', async(req, res, next)=> {
  try {
    //look for header to find out user
    //that user can own the todo
    const todo = await Todo.create(req.body);
    res.send(todo);
    sockets.forEach( socket => {
      socket.send(JSON.stringify({ type: 'TODO_CREATE', payload: todo}));
    });
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/categories', async(req, res, next)=> {
  try {
    const category = await Category.create(req.body);
    res.send(category);

    sockets.forEach( socket => {
      socket.send(JSON.stringify({ type: 'CATEGORY_CREATE', payload: category}));
    });
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/todos/:id', async(req, res, next)=> {
  try {
    const todo = await Todo.findByPk(req.params.id);
    await todo.update(req.body);
    res.send(todo);
    sockets.forEach( socket => {
      socket.send(JSON.stringify({ type: 'TODO_UPDATE', payload: todo}));
    });
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/categories', async(req, res, next)=> {
  try {
    res.send(await Category.findAll());
  }
  catch(ex){
    next(ex);
  }
});





app.use((err, req, res, next)=> {
  console.log(err);
  res.status(500).send(err);
});

const port = process.env.PORT || 3000;

const server = app.listen(port, async()=> {
  try{
    console.log(`listening on port ${port}`);
    await conn.sync({ force: true });
    console.log('connected');
    await seedData();
    console.log('seeded');
  }
  catch(ex){
    console.log(ex);
  }
});

let sockets = [];

const socketServer = new ws.WebSocketServer({ server });

socketServer.on('connection', (socket)=> {
  socket.send(JSON.stringify({ message: 'hello world'}));
  sockets.push(socket);
  console.log(sockets.length);

  socket.on('close', ()=> {
    sockets = sockets.filter(s => s !== socket);
  });
});
