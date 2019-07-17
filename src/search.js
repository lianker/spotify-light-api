function searcher(type, query) {
  return this.request(`${this.apiURL}/search?q=${query}&type=${type}`)
}

export default function search() {
  return {
    artists: searcher.bind(this, 'artist'),
    albums: searcher.bind(this, 'album'),
    playlists: searcher.bind(this, 'playlist'),
    tracks: searcher.bind(this, 'track')
  }
}
