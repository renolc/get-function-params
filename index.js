module.exports = function (fn) {
  return fn.toString()
    .replace(/\/\*.*?\*\//g, '')
    .split('=>')[0]
    .split('(')
    .slice(-1)[0]
    .split(')')[0]
    .split(',')
    .reduce(function (res, i) {
      i = i.split('=').map(function (j) { return j.trim() })
      if (i[0]) res.push({ param: i[0] })
      if (i[1]) res[res.length-1].default = i[1]
      return res
    }, [])
}