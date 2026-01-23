const { faker } = require('@faker-js/faker');
const db = require('./firebase'); 

const generateMovies = (count = 20) => {
  const movies = [];
  for (let i = 0; i < count; i++) {
    movies.push({
      name: faker.music.songName() + " " + faker.science.chemicalElement().name, 
      description: faker.lorem.paragraph(),
      rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }), 
      launchDate: faker.date.past({ years: 20 }), 
      posterUrl: faker.image.url({ width: 300, height: 450 }),
      createdAt: new Date()
    });
  }
  return movies;
};

const createData = async () => {
  console.log('Script is running...');

  try {
    const movies = generateMovies(20);
    const collectionRef = db.collection('movies');

    const promises = movies.map(movie => collectionRef.add(movie));
    
    await Promise.all(promises);

    console.log(`Script run succesfully`);
  } catch (error) {
    console.error('Script run failed', error);
  }

  process.exit();
};

createData();