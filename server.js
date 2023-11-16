const PORT = process.env.PORT ?? 8000
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const app = express()
const pool = require('./db')



app.use(cors())

app.use(express.json()) // req.body

// get all boards 

app.get('/boards/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const boards = await pool.query(`SELECT * FROM boards WHERE username = $1`, [username]) 
        res.json(boards.rows)
    } catch (error) {
        console.error(error)
    }

})


const checkDuplicate = async (title, username) => {
    const currentBoards = await pool.query(`SELECT * FROM boards2 WHERE username = $1`, [username]);
    const duplicate = currentBoards.rows.find(board => board.title === title);
    return duplicate; // Return the duplicate board if found, or undefined if not found
};

//create new board 

app.post('/boards/:username', async (req, res) => {
    const { username } = req.params
    const { title, columns } = req.body

    const id = uuidv4()

    try {
        const duplicate = await checkDuplicate(title, username);

        if (duplicate) {
            res.status(400).json({ error: 'Duplicate board title' });
        } else {
            await pool.query(`INSERT INTO boards (id, username, title, columns) VALUES ($1, $2, $3, $4)`, [id, username, title, columns]);
            
            res.json({ success: true });
        }          
        
        /* res.json(req.body) */
        console.log("success")
    } catch (error) {
        console.error(error)
    }
})


//replace data in board

app.put('/boards/:username/:id', async (req, res) => {
    const { id } = req.params
    const { title, columns } = req.body
    try {
        await pool.query(`UPDATE boards SET  columns = $1, title = $2 WHERE id = $3`, [columns, title, id])
        res.json(req.body)
        console.log("edited successfully")

    } catch (error) {
        console.error(error)
    }
})


//delete board

app.delete('/boards/:username/:id', async (req, res) => {
    const { id } = req.params

    try {
        await pool.query(`DELETE FROM boards WHERE id = $1`, [id])
        await pool.query(`DELETE FROM tasks WHERE board = $1`, [id])
        console.log('deleted successfully')
    } catch (error) {
        console.error(error)
    }

})


// add tasks
app.post('/tasks/:username/:board', async (req, res) => {
    const { board } = req.params;
    const { taskId, boardId, username, title, description, subtasks, status } = req.body;

    try {
        const task = await pool.query(`INSERT INTO tasks (taskId, boardId, board, username, title, description, subtasks, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [taskId, boardId, board, username, title, description, subtasks, status]);
        res.json(task);
        console.log('Task added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get tasks

app.get('/tasks/:username/:board', async (req, res) => {
    try {
        const { board, username } = req.params;
        const queryResult = await pool.query('SELECT * FROM tasks WHERE username = $1',
            [ username]
        );

        const tasks = queryResult.rows;
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//update task status 

app.put('/tasks/:taskId/:username/:board', async (req, res) => {
    
        const {  taskId, username, board } = req.body;
        const {  boardId, status } = req.params;
    try{
        await pool.query('UPDATE tasks SET status = $1 WHERE taskId = $2', [status, taskId])
        console.log('Task status updated successfully');

    

        res.json({ success: true });

    }catch(error){
        console.error(error)
    }
})



app.listen(PORT, () => console.log(`Server running at PORT ${PORT}`))



