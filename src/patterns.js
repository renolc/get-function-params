module.exports = {
  stringPatterns: [
    /'.*?'/g,
    /".*?"/g,
    /`.*?`/g
  ],

  prePatterns: [
    /\[.*?\]/,
    /{.*?}/,
    /=>\s*?\(.*?\)/
  ],

  postPatterns: [
    /\(.*?\)/,
  ]
}