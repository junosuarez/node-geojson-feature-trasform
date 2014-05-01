# geojson-feature-transform
an easy way to convert objects into [GeoJSON](http://geojson.org/) Feature objects

## example
```js
var featureTransform = require('geojson-feature-transform')
var request = require('request')
var JSONStream = require('JSONStream')
var limit = require('limit-stream')
var filter = require('stream-filter')
var through = require('through0')

request('http://bikechattanooga.com/stations/json/')
  .pipe(JSONStream.parse('stationBeanList.*'))
  .pipe(limit(1))
  .pipe(filter(function (x) { return !x.testStation }))
  .pipe(through(featureTransform({x: 'longitude', y: 'latitude'})))
  .on('data', function (x) { console.log(JSON.stringify(x, null, 2))})
```


## usage
`geojson-feature-transform` is a function which returns a function. Ordinarily you will use this new function lots of times on a collection of many similar objects. After using this transform, you probably want to serialize it with `JSON.stringify` to get valid GeoJSON.

### options
You can specify an options object to override property names:

- *x* - the property indicating the [easting](http://wiki.gis.com/wiki/index.php/Northing) amount, e.g., longitude
- *y* - the property indicating the [northing](http://wiki.gis.com/wiki/index.php/Northing) amount, e.g. latitude
- *xy* - a property with an array ordered `[east, north]` (e.g., `[lon, lat]`)
- *yx* - a property with an array ordered `[north, east]` (e.g, `[lat, lon]`)
- *id* - a property with a feature id (primary key)


## installation
```
$ npm install geojson-feature-transform
```

## running the tests
from the project directory
```
$ npm install
$ npm test
```

## license
by jden <jason@denizac.org> - ISC license