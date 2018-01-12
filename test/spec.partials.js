'use strict';

require('chai').should();
const partials = require('./load-partials');

describe('Check all templates compile', () =>  {
    Object.keys(partials.all).forEach(key => {
        describe('partial ' + key, () => {
            it('should compile', () => {
                let compiled = partials.compile(key);
                compiled.should.be.an('object');
            });

            it('should render', () => {
                let html = partials.render(key);
                html.should.be.a('string');
            });
        });
    });
});
