const MarkdownIt = require('markdown-it');
const customFilters = require('./filters.js');

module.exports = (eleventyConfig) => {
    eleventyConfig.addPassthroughCopy('src/assets');

    eleventyConfig.addPassthroughCopy('src/upload');

    eleventyConfig.addPassthroughCopy('src/content');

    eleventyConfig.addNunjucksFilter('markdown', (content) => {
        const markdown = new MarkdownIt({ html: true });

        return markdown.render(content);
    });

    customFilters.map((filter) => eleventyConfig.addFilter(`${filter.name}`, filter));

    return {
        dir: {
            includes: 'partials',
            input: 'src',
            output: 'dist'
        },
        dataTemplateEngine: false,
        passthroughFileCopy: true,
        templateFormats: ['njk', 'yml', 'md', 'css', 'html'],
        htmlTemplateEngine: 'njk'
    };
};
