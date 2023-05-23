const { conn, seedData, Todo, Category } = require('./db');
const express = require('express');
const app = express();
const path = require('path');
const ws = require('ws');
app.use(express.json());
app.use('/dist', express.static('dist'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

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
    const todo = await Todo.create(req.body);
    res.send(todo);
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
