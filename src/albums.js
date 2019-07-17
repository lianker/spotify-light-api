
export default function albums () {
  return {
    album: id => this.request(`${this.apiURL}/albums/${id}`),
    albums: ids => this.request(`${this.apiURL}/albums/?ids=${ids}`),
    tracks: id => this.request(`${this.apiURL}/albums/${id}/tracks`)
  }
}
