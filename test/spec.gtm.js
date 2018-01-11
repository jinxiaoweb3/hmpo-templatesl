'use strict';

require('chai').should();
const partials = require('./load-partials');

describe('Google tag manager partial', () =>  {
    let locals;

    beforeEach(() => {
        locals = {
            gtm: { id: 'abcd', auth: '1234', preview: 'prev' },
            sessionid: 'abc123'
        };
    });

    it('should render gtm from the head partial', () => {
        let html = partials.render('hmpo-partials-head', locals);
        html.should.match(/'https:\/\/www.googletagmanager.com\/gtm.js/);
    });

    it('should render if gtm config is supplied', () => {
        let html = partials.render('hmpo-partials-gtm', locals);
        html.should.match(/'https:\/\/www.googletagmanager.com\/gtm.js/);
    });

    it('should not render if no gtm config is supplied', () => {
        delete locals.gtm;
        let html = partials.render('hmpo-partials-gtm', locals);
        html.should.not.match(/'https:\/\/www.googletagmanager.com\/gtm.js/);
    });

    it('should render using the config settings', () => {
        let html = partials.render('hmpo-partials-gtm', locals);
        html.should.match(/'script','dataLayer','abcd'/);
        html.should.match(/gtm_auth=1234/);
        html.should.match(/gtm_preview=prev/);
    });

    it('should add session to dataLayer', () => {
        let html = partials.render('hmpo-partials-gtm', locals);
        html.should.match(/'Session ID': "abc123"/);
    });

    it('should fire validation events for each validation event', () => {
        locals.errorlist = [
            { key: 'KEY1', type: 'TYPE1' },
            { key: 'KEY2', type: 'TYPE2' }
        ];
        let html = partials.render('hmpo-partials-gtm', locals);

        html.should.match(/event: 'Validation Error'[^]+field: "KEY1"[^]+error: "TYPE1"/);
        html.should.match(/event: 'Validation Error'[^]+field: "KEY2"[^]+error: "TYPE2"/);
    });

    it('should fire ga events for each event', () => {
        locals.gaevents = [
            { gaCategory: 'CAT1', gaAction: 'ACTION1' },
            { gaEvent: 'ev2', gaCategory: 'CAT2', gaAction: 'ACTION2', gaLabel: 'LABEL2', gaValue: 23 }
        ];
        let html = partials.render('hmpo-partials-gtm', locals);

        html.should.match(/event: 'Custom Event'[^]+category: "CAT1"[^]+action: "ACTION1"/);
        html.should.match(/event: "ev2"[^]+category: "CAT2"[^]+action: "ACTION2"[^]+label: "LABEL2"[^]+value: "23"/);
    });

});
