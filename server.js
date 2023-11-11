const PORT = process.env.PORT ?? 8000
const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')


app.use(cors())

// get all boards 
app.get('/boards/:username', async (req, res) => {
     
    const { username } = req.params

    try{
        const boards = await pool.query('SELECT * FROM boards WHERE username = $1', [username]) // query to db
        res.json(boards.rows)
    }catch(error){
        console.error(error)
    }

})


app.listen(PORT, () => console.log(`Server running at PORT ${PORT}`))