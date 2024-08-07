const { Router } = require('express');
const router = Router()
const {getTasks, getById, addTasks, deleteId, editById} = require("../controllers/controllers")


router.get("/tasks/:id", getById )
router.put("/tasks/:id", editById)
router.get("/tasks", getTasks)
router.post("/tasks", addTasks)
router.delete("/tasks/:id", deleteId)

module.exports = router