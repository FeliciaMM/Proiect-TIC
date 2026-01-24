const db = require('../src/firebase')
const movies = db.collection('movies')

async function createMovie(movie) {

  if (!movie.name || movie.name.trim() === '') {
    throw new Error('The movie must have a name')
  }

  if (movie.launchDate && isNaN(Date.parse(movie.launchDate))) {
    throw new Error('Invalid launch date')
  }

  if (movie.description && movie.description.length < 10) {
    throw new Error('Description must be at least 10 characters long')
  }
  
  const newMovie = {
    name: movie.name,
    description: movie.description,
    launchDate: movie.launchDate,
    posterUrl: movie.posterUrl,
    createdAt: new Date()
  }

  const ref = await movies.add(newMovie)
  return ref.id
}

async function getAllMovies() {
  const snapshot = await movies.get()
  const list = []
  snapshot.forEach(doc => {
    list.push({ id: doc.id, ...doc.data() })
  })
  return list
}

async function getMovieById(id) {
  const doc = await movies.doc(id).get()
  if (!doc.exists) return null
  return { id: doc.id, ...doc.data() }
}

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById
}
