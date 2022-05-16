const { chordify } = require("./src/js/index.js")

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/css/")
    eleventyConfig.addWatchTarget("./src/css/")
    eleventyConfig.addWatchTarget("./src/js/")
    eleventyConfig.addPassthroughCopy("./src/images/")
    eleventyConfig.addFilter("chordify", (content) => { console.log(chordify(content)); return chordify(content) })


    return {
        dir: {
            input: "src",
            output: "public"
        }
    }
}