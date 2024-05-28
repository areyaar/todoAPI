const { Router } = require("express");
const router = Router();
const { ToDo } = require('../db/index.js');
const validateInput = require('../middleware/zodValidation.js');

// Get all todos
router.get('/', async (req, res) => {
  //console.log("got a req")
  try {
    const toDos = await ToDo.find();
    res.status(200).json(toDos);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Make new todo
router.post('/', validateInput, async (req, res) => {
  const { title, description } = req.body;
  try {
    const toDo = new ToDo({ title, description });
    await toDo.save();
    res.status(201).json({ message: "Todo created" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific todo by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await ToDo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "ToDo not found" });
    }
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Update a specific todo by ID
router.put('/:id', validateInput, async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;


  try {
    // we have to find that specific todo
    const todo = await ToDo.findById(id);
    todo.title = title;
    todo.description = description;
    if (completed !== undefined) todo.completed = completed;
    await todo.save();
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post('/mark-completed/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // we have to find that specific todo
    const todo = await ToDo.findById(id);
    if(!todo) throw new Error("Todo not found")
    todo.completed = true;
    await todo.save();
    const toDos = await ToDo.find();
    if(!toDos) throw new Error("Todo marked as complete but new todo list could not be fetched")
    res.status(200).json(toDos);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
})

module.exports = router;