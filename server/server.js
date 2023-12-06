const PORT = process.env.PORT ?? 8080
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const app = express()
const pool = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


require('dotenv').config();


app.use(cors())

app.use(express.json()) // req.body

// get all boards 

app.get('/boards/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const boards = await pool.query(`SELECT * FROM boards WHERE username = $1`, [username])

        console.log(boards.rows)
        if (boards.rows.length === 0) {
            res.json({ error: 'No boards' })
        }
        else {
            res.json(boards.rows)
        }

    } catch (error) {
        console.error(error)
    }

})


const checkDuplicate = async (title, username) => {
    const currentBoards = await pool.query(`SELECT * FROM boards WHERE username = $1`, [username]);
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
        console.log(duplicate, 12)


        if (duplicate !== undefined) {
            res.status(400).json({ error: 'Duplicate board title' });
        } else {
            await pool.query(`INSERT INTO boards (id, username, title, columns) VALUES ($1, $2, $3, $4)`, [id, username, title, columns]);

            res.json({ success: true });
            console.log("success")
        }

        /* res.json(req.body) */

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
        const queryResult = await pool.query('SELECT * FROM tasks WHERE username = $1 AND board = $2', [username, board]);

        const tasks = queryResult.rows;
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//update task status 

app.put('/tasks/:username/:board', async (req, res) => {

    const { username, board } = req.params;
    const { taskId, boardId, status } = req.body;
    console.log(taskId, boardId, status)
    try {
        await pool.query('UPDATE tasks SET status = $1 WHERE taskId = $2', [status, taskId])
        console.log('Task status updated successfully');



        res.json({ success: true });

    } catch (error) {
        console.error(error)
    }
})

app.put('/tasks/:username/:board/:taskId', async (req, res) => {

    const { username, board, taskId } = req.params
    const subtasks = req.body
    try {
        await pool.query('UPDATE tasks SET subtasks = $1 WHERE taskId = $2', [subtasks, taskId])
        console.log('Subtasks updated successfully');



        res.json({ success: true });

    } catch (error) {
        console.error(error)
    }
})


//update task

app.put('/tasks/edit/:username/:board/:taskId', async (req, res) => {

    const { username, board, taskId } = req.params
    const { title, description, subtasks, status } = req.body
    try {
        await pool.query('UPDATE tasks SET title = $1, description = $2, subtasks = $3, status = $4 WHERE taskId = $5 AND username = $6', [title, description, subtasks, status, taskId, username])
        console.log('Task updated successfully');
        console.log(taskId)


        res.json({ success: true });

    } catch (error) {
        console.error(error)
    }
})



app.delete('/tasks/:username/:board/:taskId', async (req, res) => {
    const { taskId } = req.params

    try {
        await pool.query(`DELETE FROM tasks WHERE taskId = $1`, [taskId])
        console.log('deleted successfully')
    } catch (error) {
        console.error(error)
    }

})



//register user 



app.post('/users/registration', async (req, res) => {
    const { username, password } = req.body

    const saltRounds = 10
    const hashed_password = await bcrypt.hash(password, saltRounds)


    try {
        await pool.query(`INSERT INTO users (username, hashed_password) VALUES ($1, $2)`, [username, hashed_password]);
        console.log('user registered successfully')
    } catch (error) {
        console.error(error)
    }

})

//user login

app.get('/users/login/:username/:password', async (req, res) => {
    const { username, password } = req.params



    try {
        const user = await pool.query(`SELECT * FROM users WHERE username = $1`, [username])

        if (user.rows[0]) {

            const hashed_password = await pool.query('SELECT hashed_password FROM users WHERE username = $1', [username])
            const match = await bcrypt.compare(password, hashed_password.rows[0].hashed_password)

            if (match) {
                const user = await pool.query(`SELECT * FROM users WHERE username = $1`, [username])
                console.log('loggin successfull')

                const token = jwt.sign({ username }, 'secret', { expiresIn: '1hr' })
                const userInfo = user.rows[0]
                res.json({ userInfo, token })

            }
            else {
                res.status(400).json({ error: 'Incorrect password' })
                console.log('incorrect password')
            }

        }
        else {
            res.status(400).json({ error: 'Incorrect username' })
        }



    } catch (error) {
        console.error(error)
    }
})



app.listen(PORT, () => console.log(`Server running at PORT ${PORT}`))



