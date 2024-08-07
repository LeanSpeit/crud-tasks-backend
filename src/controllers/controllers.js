const { newConnection } = require("../dataBase/baseDatos")



//obtener tarea
async function getTasks(req, res){
        const connection = await newConnection()
        const [result] = await connection.query("SELECT * FROM tasks")
        res.json(result[0]);  
        connection.end()
    }


//obtener tarea  por id
async function getById(req, res){
        const connection = await newConnection()

        const id = req.params.id
        const result = await connection.query("SELECT * FROM tasks where id = ?", id)

        res.json(result[0]);  
        connection.end()
    }

//agregar tarea
async function addTasks(req, res) {
    try {
        const connection = await newConnection();

        const { title, description, isComplete } = req.body;

        // Validación para que el título y la descripción no sean cadenas vacías
        if (title.trim() === "" || description.trim() === "") {
            res.status(400).json({ msg: "El título y la descripción no pueden estar vacíos" });
            return;
        }

        const result = await connection.query("INSERT INTO tasks (title, description, isComplete) values (?, ?, ?)", [title, description, isComplete]);

        res.json({ msg: "Se agregó la nueva tarea" });

        connection.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un problema en el servidor" });
    }
}

//editar tarea por id 
async function editById(req, res){
    const connection = await newConnection()
    const id = req.params.id
    const {title, description, isComplete} = req.body
    await connection.query("UPDATE tasks SET `title`=?,`description`=?,`isComplete`=? WHERE id = ?", [title, description, isComplete, id])

    res.json({msg: "Se actualizó la base de datos"}) 
    
    connection.end()
}

//eliminar tarea por id
async function deleteId(req, res){
    const connection = await newConnection()

    const id = req.params.id
    const result = await connection.query("DELETE FROM tasks where id = ?", id)

    res.json({msg: "Se eliminó la tarea"}) 
    connection.end()
}


    module.exports = {
        getTasks,
        getById,
        addTasks,
        deleteId,
        editById
    }