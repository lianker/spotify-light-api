/* global fetch */
import search from '../src/search'

import albums from './albums'

import { API_URL } from '../src/config'
import { toJSON } from './utils'

export default class SpotifyWrapper {
  constructor(options) {
    this.apiURL = options.apiURL || API_URL
    this.token = options.token

    this.albums = albums.bind(this)()
    this.search = search.bind(this)()
  }

  request(url) {
    const headers = {
      headers: {
        Authorization: `'Bearer ${this.token}'`
      }
    }

    return fetch(url, headers).then(toJSON)
  }
}
