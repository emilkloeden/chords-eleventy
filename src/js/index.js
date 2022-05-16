const getKnownChords = require("./chords")




const isChordLine = (line, keys) => {
  const tokens = line.split(/\s/).filter(a => a) // strip out the ''s
  return tokens.some(token => keys.includes(token))
}



function buildChordObject(line) {
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

const isBlockLine = (line) => {
  return /^\[(.*)\]$/.test(line.trim())
}

function chordify(songData) {
  const knownChords = getKnownChords()
  const keys = Array.from(knownChords.keys())
  const songLines = songData.split("\n")
  const highlightedLines = songLines.map((line, index) => {
    let replacePreCode = false
    // Markdown processing hacks on a <pre><code> tag to the head of the first line, whatever it is
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


function chordLine(line, knownChords) {
  const chordData = buildChordObject(line)

  return chordData.map(chordDatum => {
    const spaces = ' '.repeat(chordDatum.precedingSpaces)
    return `${spaces}<span class="chord" data-finger-positioning="${knownChords.get(chordDatum.chord)}">${chordDatum.chord}</span>`
  }).join("")
}

module.exports = { chordify } 