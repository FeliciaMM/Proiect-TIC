const express = require("express")
require('dotenv').config()
const morgan = require("morgan")
const db = require("./firebase") 
const userRoutes = require('../routes/users')
const movieRoutes = require('../routes/movies')
const reviewsRoutes = require('../routes/reviews')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.get('/test-db', async (req, res) => {
  try {
    const ref = await db.collection('test').add({
      message: 'Conexiunea funcționează',
      createdAt: new Date()
    })
    res.json({ success: true, id: ref.id })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.use('/api/users', userRoutes)
app.use('/api/movies', movieRoutes)
app.use('/api/reviews', reviewsRoutes)

app.get('/', (req, res)=>{
    res.send("Server is running!")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
