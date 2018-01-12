'use strict';

require('chai').should();
const partials = require('./load-partials');

describe('Analytics partial', () =>  {
    let locals;

    beforeEach(() => {
        locals = {
            'ga-id': 'abc'
        };
    });

    it('should render from the head partial', () => {
        let html = partials.render('hmpo-partials-head', locals);
        html.should.match(/\/\/www.google-analytics.com\/analytics.js/);
    });

    it('should load snippet if ga id is supplied', () => {
        let html = partials.render('hmpo-partials-analytics', locals);
        html.should.match(/\/\/www.google-analytics.com\/analytics.js/);
    });

    it('should not render if no ga-id is supplied', () => {
        delete locals['ga-id'];
        let html = partials.render('hmpo-partials-analytics', locals);
        html.should.not.match(/\/\/www.google-analytics.com\/analytics.js/);
    });

    it('should fire ga events for each error', () => {
        locals.errorlist = [
            { key: 'KEY1', type: 'TYPE1' },
            { key: 'KEY2', type: 'TYPE2' }
        ];
        let html = partials.render('hmpo-partials-analytics', locals);

        html.should.match(/hitType: 'event'[^]+eventCategory: 'form validation'[^]+eventAction: 'failed'[^]+eventLabel: "KEY1: TYPE1"/);
        html.should.match(/hitType: 'event'[^]+eventCategory: 'form validation'[^]+eventAction: 'failed'[^]+eventLabel: "KEY2: TYPE2"/);
    });

    it('should fire ga events for each event', () => {
        locals.gaevents = [
            { gaCategory: 'CAT1', gaAction: 'ACTION1' },
            { gaCategory: 'CAT2', gaAction: 'ACTION2', gaLabel: 'LABEL2', gaValue: 23 }
        ];
        let html = partials.render('hmpo-partials-analytics', locals);

        html.should.match(/hitType: 'event'[^]+eventCategory: "CAT1"[^]+eventAction: "ACTION1"/);
        html.should.match(/hitType: 'event'[^]+eventCategory: "CAT2"[^]+eventAction: "ACTION2"[^]+eventLabel: "LABEL2"[^]+eventValue: "23"/);
    });

});
