import SpotifyLightApi from '../lib/index'
global.fetch = require('node-fetch')

const spotify = new SpotifyLightApi({
  token: 'BQAQd9im5BNfoiMEiM_gHsFr997ysZ4I15QnHQLaBr7bKY4zi1n3tyzFBZAtrVi7rBYvQm6BH5QA5Fhxo7b2GQigtfz_UfuW4_RInq0iGSSDxhwSp5rEgwXFjz2B4sinAyg1bMqZBV___w'
})

const albums = spotify.search.albums('angra')

albums.then(data => {
  if (data.error) {
    console.log(data)
  } else {
    data.albums.items.map(item => console.log(item.name))
  }
})
