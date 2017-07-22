var cache = []

var prePatterns = [
  /'.*?'/,
  /".*?"/,
  /`.*?`/,
  /\[.*?\]/,
  /{.*?}/,
  /=>\s*?\(.*?\)/,
]

var postPatterns = [
  /\(.*?\)/,
]

var delim = function (id) { return [':~:', id, ':~:'].join('') }

var encode = function (string, patterns) {
  patterns.forEach(function (pattern) {
    while (pattern.test(string)) {
      var match = pattern.exec(string)[0]
      string = string.replace(match, delim(cache.push(match)))
    }
  })
  return string
}

var decode = function (string) {
  var pattern = /:~:(\d+?):~:/
  while (pattern.test(string)) {
    var id = pattern.exec(string)[1]
    string = string.replace(delim(id), cache[id-1])
  }
  return eval('('+string+')')
}

module.exports = function (fn) {
  var params = encode(fn.toString().replace(/\/\*.*?\*\//g, ''), prePatterns)
    .match(/(?:function\s*\((.*)\)|\((.*)\))/)

  params = params[1] || params[2] || ''

  return encode(params, postPatterns)
    .split(',')
    .filter(function (i) { return i }) // filter empty results
    .map(function (i) {
      var data = i.split('=')
      var obj = {
        param: data[0].trim()
      }
      if (data[1]) obj.default = decode(data.slice(1).join('='))
      return obj
    })
}