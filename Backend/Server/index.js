const express = require ('express')
const cors = require('cors')
const { Pool } = require('pg')

 const config = {
    host: 'localhost',
    user: 'postgres',
    password: '123456789', 
    database: 'likeme',
    allowExitOnIdle: true
}

const pool = new Pool(config)
const app = express()
app.listen(3000, () => console.log("Server is running"))

//Middlewares
app.use(express.json())
app.use(cors())

//PATHS
app.get('/posts', async (req, res) => {
    try {
        const query = 'SELECT * FROM posts;'
        const {rows} = await pool.query(query)
        res.json(rows)
    } catch (error) {
        console.log("Error del GET:", error.message)
    }
})

app.post('/posts', async  (req, res) => {
    try {
        const {titulo, url, descripcion} = req.body
        const id = Math.floor(Math.random() * 9999)
        const query = "INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4, $5)"
        const values = [id, titulo, url, descripcion, 0]
        const {rows} = await pool.query(query, values)
        res.json("Post creado")

    } catch (error) {
        console.log("Error del POST:", error.message)
    }
})
