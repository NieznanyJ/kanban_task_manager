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
        const boards = await pool.query(`SELECT * FROM boards WHERE username = $1`, [username]) // query to db
        res.json(boards.rows)
    } catch (error) {
        console.error(error)
    }

})


//create new board 

app.post('/boards/:username', async (req, res) => {
    const { username } = req.params
    const { title, columns } = req.body
    
    const id = uuidv4()

    try {
        await pool.query(`INSERT INTO boards (id, username, title, columns) VALUES ($1, $2, $3, $4)`, [id, username, title, columns])
        res.json(req.body)
        console.log("success")
    } catch (error) {
        console.error(error)
    }
})


//replace data in board

app.put('/boards/:username/:id', async (req, res) => {
    const { id } = req.params
    const {title, columns } = req.body
    try{
        await pool.query(`UPDATE boards SET  columns = $1, title = $2 WHERE id = $3`, [ columns,title, id])
        res.json(req.body)
        console.log("edited successfully")

    }catch(error){
        console.error(error)
    }
})


//delete board

app.delete('/boards/:username/:id', async (req, res) => {
    const { id } = req.params

    try{
        await pool.query(`DELETE FROM boards WHERE id = $1`, [id])
        console.log('deleted successfully')
    }catch(error){
        console.error(error)
    }

})


app.listen(PORT, () => console.log(`Server running at PORT ${PORT}`))



