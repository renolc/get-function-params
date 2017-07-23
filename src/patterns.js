module.exports = {
  prePatterns: [
    /'.*?'/,
    /".*?"/,
    /`.*?`/,
    /\[.*?\]/,
    /{.*?}/,
    /=>\s*?\(.*?\)/
  ],

  postPatterns: [
    /\(.*?\)/,
  ]
}