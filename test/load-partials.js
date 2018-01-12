'use strict';

const Hogan = require('hogan.js');
const path = require('path');
const fs = require('fs');

const partialsDirectory = path.resolve(__dirname, '..', 'views', 'partials');
const partials = {};

// load in all partials
fs.readdirSync(partialsDirectory).forEach(filename => {
    filename = path.resolve(partialsDirectory, filename);
    let key = 'hmpo-partials-' + path.basename(filename, '.html');
    partials[key] = fs.readFileSync(filename, 'utf8');
});

module.exports = {
    all: partials,
    get(key) {
        return partials[key];
    },
    compile(key) {
        return Hogan.compile(this.get(key));
    },
    render(key, locals) {
        return this.compile(key).render(locals, partials);
    }
};
