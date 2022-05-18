const getKnownChords = require("./chords")


/**
 * Returns true when every non-space characterset in {line} is in {keys}
 * @param {string} line
 * @param {string[]} keys
 * @returns {bool}
 */
const isChordLine = (line, keys) => {
  const tokens = line.split(/\s/).filter(a => a) // strip out the ''s
  return tokens.every(token => keys.includes(token))
}


/**
 * Returns true if a line consists only of '[' <something> ']'
 * Used to aid styling of block descriptors such as '[Intro]' and '[Chorus]' 
 * @param {string} line
 * @returns {bool}
 */
const isBlockLine = (line) => {
  return /^\[(.*)\]$/.test(line.trim())
}


/**
 * Returns an array of objects containing information about a chord's position on a line
 * @param {any} line
 * @returns {Object[]}
 */
function buildChordLineObject(line) {
  const nonSpaceRegex = /[^\s]+/g
  const matches = [...line.matchAll(nonSpaceRegex)]
  let firstSpace = 0
  const chordData = matches.map((match, i) => {
    return {
      index: i,
      start: match.index,
      end: match.index + match[0].length,
      chord: match[0]
    }
  })

  for (const chordDatum of chordData) {
    chordDatum.precedingSpaces = chordDatum.start - firstSpace
    firstSpace = chordDatum.end
  }
  return chordData
}




/**
 * Replace all chord strings within a string {line} with an opinionated <span> element in the correct position
 * <span> element comes with the 'chord' classname and the string value representing the chord as the value
 * of the "data-finger-positioning" attribute.
 * @param {string} line
 * @param {Map<string, string>} knownChords
 * @returns {any}
 */
function chordLine(line, knownChords) {
  const chordData = buildChordLineObject(line)

  return chordData.map(chordDatum => {
    const spaces = ' '.repeat(chordDatum.precedingSpaces)
    return `${spaces}<span class="chord" data-finger-positioning="${knownChords.get(chordDatum.chord)}">${chordDatum.chord}</span>`
  }).join("")
}

/**
 * Stylises lines in a string, replacing "Block" line e.g. '[Chorus]', and "Chord" lines e.g. ' Am   Amaj7'
 * with opinionated <span> elements.
 * @param {any} songData
 * @returns {any}
 */
function chordify(songData) {
  const knownChords = getKnownChords()
  const keys = Array.from(knownChords.keys())
  const songLines = songData.split("\n")
  const highlightedLines = songLines.map(line => {
    let replacePreCode = false
    // Markdown processing tacks on a <pre><code> tag to the head of the first line, whatever it is
    if (/<pre><code>/.test(line)) {
      line = line.replace("<pre><code>", "").replace("</code></pre>", "")
      replacePreCode = true
    }
    if (isBlockLine(line)) {
      return `${replacePreCode ? "<pre><code>" : ""}<span class="block" >${line}</span > `
    }
    if (!isChordLine(line, keys)) {
      return `${replacePreCode ? "<pre><code>" : ""}${line}`
    }

    return `${replacePreCode ? "<pre><code>" : ""}${chordLine(line, knownChords)}`
  })
  return highlightedLines.join("\n")
}


module.exports = { chordify } 