var stringPatterns = require('./patterns').stringPatterns
var delim = require('./delim')

var encodeStrings = function (cache, string) {
  while (true) {
    var shortestString = stringPatterns
    .reduce(function (arr, pattern) {
      return arr.concat(string.match(pattern) || [])
    }, [])
    .sort(function (a, b) { return a.length - b.length })
    [0]

    if (!shortestString) return string
    string = string.replace(shortestString, delim(cache.push(shortestString)))
  }
}

module.exports = function (cache, string, patterns) {
  string = encodeStrings(cache, string)
  patterns.forEach(function (pattern) {
    while (pattern.test(string)) {
      var match = pattern.exec(string)[0]
      string = string.replace(match, delim(cache.push(match)))
    }
  })
  return string
}