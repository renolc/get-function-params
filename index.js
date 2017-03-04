const cache = []

const prePatterns = [
  /'.*?'/g,
  /".*?"/g,
  /`.*?`/g,
  /{.*?}/g,
  /=>\s*?\(.*?\)/g,
]

const postPatterns = [
  /\(.*?\)/g,
]

const encode = (string, patterns) => {
  patterns.forEach((pattern) => {
    ;(string.match(pattern) || [])
      .forEach((value) => {
        string = string.replace(value, `:~:${cache.push(value)}:~:`)
      })
  })

  return string
}

const decode = (string) => {
  const pattern = /:~:(\d+?):~:/
  while (pattern.test(string)) {
    const id = pattern.exec(string)[1]
    string = string.replace(`:~:${id}:~:`, cache[id-1])
  }
  return eval(`(${string})`)
}

module.exports = function (fn) {
  let params = encode(fn.toString().replace(/\/\*.*?\*\//g, ''), prePatterns)
    .match(/(?:function\s*\((.*)\)|\((.*)\))/)

  params = params[1] || params[2] || ''

  return encode(params, postPatterns)
    .split(',')
    .filter((i) => i)
    .map((i) => {
      const data = i.split('=')
      const obj = {
        param: data[0].trim()
      }
      if (data[1]) obj.default = decode(data.slice(1).join('='))
      return obj
    })
}