const Moment = require('moment');
const git = require('git-rev-sync');
const fs = require('fs-extra');

const date = (unformmatedDate) => new Moment(unformmatedDate).format('MM/DD/YYYY');

const getApplicableAlerts = (data, page) => {
    const pageAlerts = data.filter((alert) => alert.data.pages === page);
    const activePageAlerts = pageAlerts.filter((alert) => alert.data.active);

    return activePageAlerts;
};

const generateFontSrc = (font, totalFiles) => font.map((file, index) => {
    const { font_file: fontFile } = file;
    const lastDot = fontFile.lastIndexOf('.');
    const fileExt = fontFile.slice(lastDot + 1);
    const formats = {
        svg: 'svg',
        ttf: 'truetype',
        woff: 'woff',
        woff2: 'woff2'
    };

    return `url('${fontFile}') format('${formats[fileExt]}')${totalFiles > index + 1 ? ' ' : ''}`;
});

const generateFont = (data, client) => data.map((font) => {
    const [fontData] = Object.keys(font);
    const fontStyle = fontData.split('_');
    const weights = {
        light: 200,
        regular: 400,
        bold: 700
    };
    const fontWeight = weights[fontStyle[0]];

    return `@font-face {
        font-family: '${client} Font';
        src: ${generateFontSrc(font[fontData], font[fontData].length)};
        font-weight: ${fontWeight};
        font-style: ${fontStyle[1]};
    }`;
});

const mergeData = (eleventyData, posts = [], links = [], docs = []) => {
    const mergedData = [];

    if (posts && posts.length) {
        posts.map((post) => {
            const { data } = post;
            data.slug = `/posts/${data.slug}`;

            return mergedData.push(data);
        });
    }

    if (links && links.length) {
        links.map((link) => mergedData.push(link));
    }

    if (docs && docs.length) {
        docs.map((doc) => mergedData.push(doc));
    }

    return mergedData;
};

const sectionPosts = (posts, section) => posts.filter((post) => post.data.section === section);

const sliceData = (data, count) => data.slice(0, count);

const sortByDate = (data) => data.sort((item1, item2) => {
    const returnSecond = -1;

    if (item1.date > item2.date) {
        return 1;
    }

    if (item1.date < item2.date) {
        return returnSecond;
    }

    return 0;
});

const svgContents = (file) => {
    const relativeFilePath = `./src${file}`;

    const data = fs.readFileSync(relativeFilePath, (err, contents) => {
        if (err) {
            return err;
        }

        return contents;
    });

    return data.toString('utf8');
};

const version = () => git.short();

module.exports = [
    date,
    getApplicableAlerts,
    generateFont,
    mergeData,
    sectionPosts,
    sliceData,
    sortByDate,
    svgContents,
    version
];
