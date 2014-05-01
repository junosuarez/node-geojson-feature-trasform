function featureTransform(opts) {
  opts = opts || {}
  opts.x = opts.x || 'x'
  opts.y = opts.y || 'y'
  opts.id = opts.id || 'id'
  var skip = [opts.id]
  if (opts.xy) {
    skip.push(opts.xy)
  } else if (opts.yx) {
    skip.push(opts.yx)
  } else {
    skip.push(opts.x)
    skip.push(opts.y)
  }
  return function (obj) {
    var feature = {type: 'Feature', geometry: {type: 'Point', coordinates: []}, properties: {}}
    if (opts.xy) {
      feature.geometry.coordinates[0] = parseFloat(obj[opts.xy][0])
      feature.geometry.coordinates[1] = parseFloat(obj[opts.xy][1])
    } else if (opts.yx) {
      feature.geometry.coordinates[0] = parseFloat(obj[opts.yx][1])
      feature.geometry.coordinates[1] = parseFloat(obj[opts.yx][0])
    } else {
      feature.geometry.coordinates[0] = parseFloat(obj[opts.x])
      feature.geometry.coordinates[1] = parseFloat(obj[opts.y])
    }
    if (opts.id in obj) { feature.id = obj[opts.id] }
    Object.keys(obj).forEach(function (key) {
      if (skip.indexOf(key) !== -1) { return }
      feature.properties[key] = obj[key]
    })
    return feature
  }
  
}

module.exports = featureTransform