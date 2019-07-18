import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import SpotifyLightApi from '../src/index'

// integrate sinon and chai and add promises stubs
chai.use(sinonChai)
//  enable fetch in node
global.fetch = require('node-fetch')

describe('Albums', () => {
  let stubedFetch
  let spotify
  beforeEach(() => {
    spotify = new SpotifyLightApi({
      token: 'bar'
    })
    stubedFetch = sinon.stub(global, 'fetch')
    stubedFetch.resolves({ json: () => ({ body: 'album' }) })
  })

  afterEach(() => {
    stubedFetch.restore()
  })
  describe('Smoke Tests', () => {
    it('Should exist spotify.albums.album method', () => {
      expect(spotify.albums.album).to.exist
    })

    it('Should exist spotify.albums.tracks method', () => {
      expect(spotify.albums.tracks).to.exist
    })
  })

  describe('spotify.albums.album()', () => {
    it('Should call fetch method', () => {
      spotify.albums.album()

      expect(stubedFetch).to.have.been.calledOnce
    })

    it('Should call fetch method with correct URL', () => {
      spotify.albums.album('4aawyAB9vmqN3uQ7FjRGTy')

      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy'
      )

      spotify.albums.album('4aawyAB9vmqN3uQ7FjRGT5')

      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGT5'
      )
    })

    it('Should return correct data from the Promise', () => {
      const album = spotify.albums.album('4aawyAB9vmqN3uQ7FjRGTy')

      album.then(data => {
        expect(data).to.be.eql({ body: 'album' })
      })
    })
  })

  describe('spotify.albums.albums()', () => {
    it('Should call fetch method', () => {
      spotify.albums.albums()

      expect(stubedFetch).to.have.been.calledOnce
    })

    it('Should call fetch method with correct URL', () => {
      spotify.albums.albums(['4aawyAB9vmqN3uQ7FjRGTy', '2cctyAB9vmqN3uQ7FjRGKA'])

      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,2cctyAB9vmqN3uQ7FjRGKA'
      )

      spotify.albums.albums(['4aawyAB9vmqN3uQ7FjRGT5', '34rfyAB9vmqN3uQ7FjRGKA'])

      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGT5,34rfyAB9vmqN3uQ7FjRGKA'
      )
    })

    it('Should return correct data from the Promise', () => {
      const albums = spotify.albums.albums([
        '4aawyAB9vmqN3uQ7FjRGTy',
        '2cctyAB9vmqN3uQ7FjRGKA'
      ])
      albums.then(data => {
        expect(data).to.be.eql({ body: 'album' })
      })
    })
  })

  describe('spotify.albums.tracks()', () => {
    it('Should call fetch method', () => {
      spotify.albums.tracks()

      expect(stubedFetch).to.have.been.calledOnce
    })

    it('Should call fetch method with correct URL', () => {
      spotify.albums.tracks('4aawyAB9vmqN3uQ7FjRGTy')

      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks'
      )

      spotify.albums.tracks('34rfyAB9vmqN3uQ7FjRGKA')

      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/34rfyAB9vmqN3uQ7FjRGKA/tracks'
      )
    })

    it('Should return correct data from the Promise', () => {
      const albumtracks = spotify.albums.tracks('4aawyAB9vmqN3uQ7FjRGTy')
      albumtracks.then(data => {
        expect(data).to.be.eql({ body: 'album' })
      })
    })
  })
})
