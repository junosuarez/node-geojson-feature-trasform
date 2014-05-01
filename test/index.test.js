require('mochi')

var featureTransform = require('../.')

describe('featureTransform', function () {
  it('creates a transform fn to make new GeoJSON Feature from an object', function () {
    var fromObj = featureTransform({x: 'lon', y: 'lat'})

    fromObj({lon: -120.499, lat: 33.33, foo: 'bar'})
      .should.deep.equal({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-120.499, 33.33]
        },
        properties: {
          foo: 'bar'
        }
      })
  })


  it('parses geometry numbers from strings', function () {
    featureTransform({x: 'lon', y: 'lat'})({lon: '-120.499', lat: '33.33', foo: 'bar'})
      .should.deep.equal({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-120.499, 33.33]
        },
        properties: {
          foo: 'bar'
        }
      })
  })


  it('parses geometry numbers from xy vectors', function () {
    featureTransform({xy: 'lonlat'})({lonlat:[-120.499,33.33], foo: 'bar'})
      .should.deep.equal({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-120.499, 33.33]
        },
        properties: {
          foo: 'bar'
        }
      })
  })

  it('parses geometry numbers from yx vectors', function () {
    featureTransform({yx: 'latlon'})({latlon:[33.33,-120.499], foo: 'bar'})
      .should.deep.equal({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-120.499, 33.33]
        },
        properties: {
          foo: 'bar'
        }
      })
  })

  it('gets id', function () {
    featureTransform({x: 'lon', y: 'lat'})({
      id: 394,
      lon: '-120.499', lat: '33.33', foo: 'bar'
    })
      .should.deep.equal({
        type: 'Feature',
        id: 394,
        geometry: {
          type: 'Point',
          coordinates: [-120.499, 33.33]
        },
        properties: {
          foo: 'bar'
        }
      })
  })

  it('you can specify the source id property', function () {
    featureTransform({x: 'lon', y: 'lat', id: '_id'})({
      _id: 394,
      lon: '-120.499', lat: '33.33', foo: 'bar'
    })
      .should.deep.equal({
        type: 'Feature',
        id: 394,
        geometry: {
          type: 'Point',
          coordinates: [-120.499, 33.33]
        },
        properties: {
          foo: 'bar'
        }
      })
  })


  it('copies all properties minus x y', function () {
    featureTransform({x: 'x', y: 'y'})({id: 0, x: '-120.499', y: '33.33', a: 'bar', qux: 13, jazz: true})
      .should.deep.equal({
        type: 'Feature',
        id: 0,
        geometry: {
          type: 'Point',
          coordinates: [-120.499, 33.33]
        },
        properties: {
          a: 'bar',
          qux: 13,
          jazz: true
        }
      })
  })

})