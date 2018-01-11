'use strict';

require('chai').should();
const partials = require('./load-partials');

describe('Google tag manager partial noscript support', () =>  {
    let locals;

    beforeEach(() => {
        locals = {
            gtm: { id: 'abcd', auth: '1234', preview: 'prev' }
        };
    });

    it('should render gtm noscript from the body-end partial', () => {
        let html = partials.render('hmpo-partials-body-end', locals);
        html.should.match(/https:\/\/www.googletagmanager.com\/ns.html/);
    });

    it('should render if gtm config is supplied', () => {
        let html = partials.render('hmpo-partials-gtm-noscript', locals);
        html.should.match(/https:\/\/www.googletagmanager.com\/ns.html/);
    });

    it('should not render if no gtm config is supplied', () => {
        delete locals.gtm;
        let html = partials.render('hmpo-partials-gtm-noscript', locals);
        html.should.not.match(/https:\/\/www.googletagmanager.com\/ns.html/);
    });

    it('should render using the config settings', () => {
        let html = partials.render('hmpo-partials-gtm-noscript', locals);
        html.should.match(/id=abcd/);
        html.should.match(/gtm_auth=1234/);
        html.should.match(/gtm_preview=prev/);
    });
});
