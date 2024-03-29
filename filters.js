const Moment = require('moment');
const git = require('git-rev-sync');
const fs = require('fs-extra');
const slugify = require('slugify');

const cleanSlug = (slug) => slugify(slug, {
    lower: true,
    remove: /[*+~.()'"!:@]/g
});

const date = (unformmatedDate) => new Moment(unformmatedDate).format('MMMM D, YYYY');

const validDate = () => {
    const today = new Date();
    const legalAge = 21;
    const valid = today.setFullYear(today.getFullYear() - legalAge);

    return date(valid);
};

const availableBeers = (beers) => beers.filter((beer) => beer.data.tap || beer.data.canned);

const orderMenu = (beers) => beers.sort((beer1, beer2) => {
    if (beer1.data.tap_loc > beer2.data.tap_loc) {
        return 1;
    }

    return -1;
});

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
    availableBeers,
    cleanSlug,
    date,
    filterBeers,
    orderMenu,
    sliceData,
    svgContents,
    validDate,
    version
];
