const E = window.showdown

export function mkdown (value) {
  var convert = new E.Converter()
  return convert.makeHtml(value)
}
