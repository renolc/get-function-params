var delim = require('./delim')

module.exports = function (cache, string) {
  var pattern = /:~:(\d+?):~:/
  while (pattern.test(string)) {
    var id = pattern.exec(string)[1]
    string = string.replace(delim(id), cache[id-1])
  }
  return eval('('+string+')')
}