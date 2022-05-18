const chordify = require("@emilkloeden/eleventy-plugin-chordify")

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/css/")
    eleventyConfig.addWatchTarget("./src/css/")
    eleventyConfig.addWatchTarget("./src/js/")
    eleventyConfig.addPassthroughCopy("./src/images/")
    eleventyConfig.addPlugin(chordify)


    return {
        dir: {
            input: "src",
            output: "public"
        }
    }
}