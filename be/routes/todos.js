import express from "express";
import pick from "lodash.pick";

import TodoModel from "../models/todo.js";
import { MISSING_PARAMETERS, NOT_FOUND, SERVER_ERROR } from "../consts/todos";

const router = express.Router()

router.post('/', async (req, res) => {
  const { title, description } = req.body

  if (!title || !description) {
    return res.status(400).send({ message: MISSING_PARAMETERS })
  }

  const todoItem = new TodoModel({
    checked: false,
    title,
    description
  });

  const ret = await todoItem.save();
  if (!ret) {
    return res.status(500).send({ message: SERVER_ERROR })
  }

  return res.status(200).send(todoItem);
})

router.put('/', async (req, res) => {
  const { id, title, description, checked } = req.body

  if (!id || !title || description === undefined || checked === undefined) {
    return res.status(400).send({ message: MISSING_PARAMETERS })
  }

  let todoItem = await TodoModel.findById(id);

  if (todoItem === null) {
    return res.status(404).send({ message: NOT_FOUND });
  }

  todoItem.overwrite({ title, description, checked });
  todoItem.save();

  return res.status(200).send(todoItem);
})

router.get('/', async (req, res) => {
  const query = pick(req.query, ['id', 'title', 'checked'])

  const items = await TodoModel.find(query);

  if (items === null) {
    return res.status(500).send({ message: SERVER_ERROR });
  }

  return res.status(200).send(items);
})

router.patch('/', async (req, res) => {
  const { id } = req.body

  if (!id) {
    return res.status(400).send({ message: MISSING_PARAMETERS })
  }

  let todoItem = await TodoModel.findById(id);

  if (todoItem === null) {
    return res.status(404).send({ message: NOT_FOUND });
  }

  todoItem.set(pick(req.body, ['description', 'title', 'checked']));
  todoItem.save();

  return res.status(200).send(todoItem);
})

router.delete('/', async (req, res) => {
  const { id } = req.query

  if (!id) {
    return res.status(400).send({ message: MISSING_PARAMETERS })
  }

  const item = await TodoModel.findByIdAndDelete(id);

  if (item === null) {
    return res.status(404).send({ message: NOT_FOUND });
  }

  return res.status(200).send(item);
})

export default router;
