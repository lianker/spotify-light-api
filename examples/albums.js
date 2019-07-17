import SpotifyWrapper from '../lib/index'
global.fetch = require('node-fetch')

const spotify = new SpotifyWrapper({
  token: 'BQB0FpXd9zl0XnC0fYQW1G26eSCUQOXzCgu4VpWC_-0Gw3bvHGCSakC3Q9r0E73xvbZNbBFrCgYk1qy9qhbSlT568X00GOxeKBCKUDWvjVrJ577KQSMgUo_PvNhfQ3uWl6eLt0yqJ1cMrw'
})
const albums = spotify.search.albums('angra')

albums.then(data => data.albums.items.map(item => console.log(item.name)))
