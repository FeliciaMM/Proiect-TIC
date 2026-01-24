const movieService = require('../services/movieService')

async function create(req, res) {
  try {
    const { name } = req.body
    if (!name) {
      return res.status(400).json({ error: 'Name is required' })
    }

    const id = await movieService.createMovie(req.body)

    res.status(201).json({
      success: true,
      id
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function getAll(req, res) {
  try {
    const movies = await movieService.getAllMovies()
    res.status(200).json(movies)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function getById(req, res) {
  try {
    const movie = await movieService.getMovieById(req.params.id)
    if (!movie) {
      return res.status(404).json({ error: 'Movie does not exist' })
    }
    res.status(200).json(movie)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  create,
  getAll,
  getById
}
