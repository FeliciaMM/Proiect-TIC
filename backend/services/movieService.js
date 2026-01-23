const db = require('../src/firebase')
const movies = db.collection('movies')

async function createMovie(movie) {
  const newMovie = {
    name: movie.name,
    description: movie.description,
    launchDate:movie.launchDate,
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
  if (!doc.exists) {
    return null 
  }
  return { id: doc.id, ...doc.data() }
}

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById
}
