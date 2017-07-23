var patterns = require('./src/patterns')
var encode = require('./src/encode')
var decode = require('./src/decode')

module.exports = function (fn) {
  var cache = []

  var params = encode(cache, fn.toString().replace(/\/\*.*?\*\//g, ''), patterns.prePatterns)
    .match(/(?:function\s*\((.*)\)|\((.*)\))/)

  params = params[1] || params[2] || ''

  return encode(cache, params, patterns.postPatterns)
    .split(',')
    .filter(function (i) { return i }) // filter empty results
    .map(function (i) {
      var data = i.split('=')
      var obj = {
        param: data[0].trim()
      }
      if (data[1]) obj.default = decode(cache, data.slice(1).join('='))
      return obj
    })
}