module.exports = {
  stringPatterns: [
    /'.*?'/gs,
    /".*?"/gs,
    /`.*?`/gs
  ],

  prePatterns: [
    /\[.*?\]/s,
    /{.*?}/s,
    /=>\s*?\(.*?\)/s,
    /=\s*?function\s*?\(.*(?=.*\))/s,
    /=\s*?\(.*(?=.*\))/s,
    /\s*?=[^>][^,\)]*/s
  ],

  postPatterns: [
    /\(.*?\)/s,
  ]
}
