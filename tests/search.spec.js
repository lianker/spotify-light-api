import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import SpotifyWrapper from '../src/index'

//  enable fetch in node
global.fetch = require('node-fetch')

// integrate sinon and chai and add promises stubs
chai.use(sinonChai)

describe('Search - Smoke Tests', () => {
  let spotify
  beforeEach(() => {
    spotify = new SpotifyWrapper(
      { token: 'bar' }
    )
  })

  it('should exist the spotify.search.tracks method', () => {
    expect(spotify.search.tracks).to.exist
  })

  it('should exist the spotify.search.albums method', () => {
    expect(spotify.search.albums).to.exist
  })

  it('should exist the spotify.search.artists method', () => {
    expect(spotify.search.artists).to.exist
  })

  it('should exist the spotify.search.playlists method', () => {
    expect(spotify.search.playlists).to.exist
  })
})

describe('Search', () => {
  let fetchedStub
  let spotify

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch')
    fetchedStub.resolves({ json: () => ({ body: 'json' }) })
    spotify = new SpotifyWrapper(
      { token: 'bar' }
    )
  })

  afterEach(() => {
    fetchedStub.restore()
  })

  describe('spotify.search.artists', () => {
    it('Should call fetch function', () => {
      spotify.search.artists('araketu')

      expect(fetchedStub).to.have.been.calledOnce
    })

    it('Should call fetch with correct URL', () => {
      spotify.search.artists('araketu')

      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=araketu&type=artist'
      )

      spotify.search.artists('gerasamba')

      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=gerasamba&type=artist'
      )
    })
  })

  describe('spotify.search.albums', () => {
    it('Should call fetch function', () => {
      // teste
      spotify.search.albums('araketu')

      expect(fetchedStub).to.have.been.calledOnce
    })

    it('Should call fetch with correct URL', () => {
      // teste
      spotify.search.albums('araketu')

      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=araketu&type=album'
      )

      spotify.search.albums('gerasamba')

      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=gerasamba&type=album'
      )
    })
  })

  describe('spotify.search.playlists', () => {
    it('Should call fetch function', () => {
      // teste
      spotify.search.playlists('araketu')

      expect(fetchedStub).to.have.been.calledOnce
    })

    it('Should call fetch with correct URL', () => {
      // teste
      spotify.search.playlists('araketu')

      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=araketu&type=playlist'
      )

      spotify.search.playlists('gerasamba')

      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=gerasamba&type=playlist'
      )
    })
  })

  describe('spotify.search.tracks', () => {
    it('Should call fetch function', () => {
      // teste
      spotify.search.tracks('pipoca')

      expect(fetchedStub).to.have.been.calledOnce
    })

    it('Should call fetch with correct URL', () => {
      // teste
      spotify.search.tracks('pipoca')

      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=pipoca&type=track'
      )

      spotify.search.tracks('arere')

      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=arere&type=track'
      )
    })
  })
})
