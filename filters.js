const Moment = require('moment');
const git = require('git-rev-sync');
const fs = require('fs-extra');
const slugify = require('slugify');

const cleanSlug = (slug) => slugify(slug, {
    lower: true,
    remove: /[*+~.()'"!:@]/g
});

const date = (unformmatedDate) => new Moment(unformmatedDate).format('MM/DD/YYYY');

const validDate = () => {
    const today = new Date();
    const legalAge = 21;
    const valid = today.setFullYear(today.getFullYear() - legalAge);

    return date(valid);
};

const filterBeers = (beers, availability) => beers.filter((beer) => beer.data[availability]);

const sliceData = (data, count) => data.slice(0, count);

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
    cleanSlug,
    date,
    filterBeers,
    sliceData,
    svgContents,
    validDate,
    version
];
