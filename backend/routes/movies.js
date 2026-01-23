const express = require('express')
const router = express.Router()
const { createMovie, getAllMovies,getMovieById } = require('../services/movieService')

router.post('/', async (req, res) => {
  try {
    const { name, description, launchDate } = req.body

    if (!name) {
      return res.status(400).json({
        error: 'Name is required'
      })
    }

    const id = await createMovie({name, description, launchDate })

    res.status(201).json({
      success: true,
      id
    })
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const movie = await getMovieById(id)
    if (!movie) {
      return res.status(404).json({ error: 'Movie does not exist' })
    }
    res.json(movie)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/', async (req, res) => {
    try {
        const movies = await getAllMovies()
        res.json(movies)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


module.exports = router