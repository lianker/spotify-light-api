import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import SpotifyLightApi from '../src/index'

global.fetch = require('node-fetch')
chai.use(sinonChai)

describe('SpotifyLightApi Library', () => {
  it('Should create a instance of SpotifyLightApi', () => {
    const spotify = new SpotifyLightApi({})
    expect(spotify).to.be.an.instanceOf(SpotifyLightApi)
  })

  it('Should receive apiURL as an option', () => {
    const spotify = new SpotifyLightApi({ apiURL: 'http://spotify.com' })

    expect(spotify.apiURL).to.be.equal('http://spotify.com')
  })

  it('Should use the default apiURL if not provided', () => {
    const spotify = new SpotifyLightApi({})

    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1')
  })

  it('Should receive token as an option', () => {
    const spotify = new SpotifyLightApi({ token: 'blabla' })

    expect(spotify.token).to.be.equal('blabla')
  })

  describe('request()', () => {
    let stubedFetch

    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch')
      stubedFetch.resolves({ json: () => ({ body: 'data' }) })
    })

    afterEach(() => {
      stubedFetch.restore()
    })

    it('Should exist request method', () => {
      const spotify = new SpotifyLightApi({})
      expect(spotify.request).to.exist
    })

    it('Should call fetch when request', () => {
      const spotify = new SpotifyLightApi({
        token: 'bla'
      })

      spotify.request('url')
      expect(stubedFetch).to.have.been.calledOnce
    })

    it('Should call fetch correct URL', () => {
      const spotify = new SpotifyLightApi({
        token: 'bla'
      })

      spotify.request('url')
      expect(stubedFetch).to.have.been.calledWith('url')
    })

    it('Should call fetch correct headers', () => {
      const spotify = new SpotifyLightApi({
        token: 'bla'
      })

      const headers = {
        headers: {
          Authorization: `'Bearer bla'`
        }
      }

      spotify.request('url')
      expect(stubedFetch).to.have.been.calledWith('url', headers)
    })
  })
})
