'use strict';

require('chai').should();
const Hogan = require('hogan.js');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');

const filename = path.resolve(__dirname, '..', 'views', 'partials', 'analytics.html');

describe('Analytics partial', () =>  {
	let compiled;

	beforeEach(() => {
		let template = fs.readFileSync(filename, 'utf8');
		compiled = Hogan.compile(template);
	});

	it('should render', () => {
		let html = compiled.render({});
		html.should.equal('');
	});

	it('should render a script tag if a ga-id is given', () => {
		let html = compiled.render({ 'ga-id': 'abc' });
		let $ = cheerio.load(html);
		$('script').length.should.equal(1);
	});

	it('should fire ga events for each error', () => {
		let html = compiled.render({
			'ga-id': 'abc',
			'ga-page': '/path',
			errorlist: [
				{ key: 'KEY1', type: 'TYPE1' },
				{ key: 'KEY2', type: 'TYPE2' }
			]
		});

		html.should.match(/eventCategory: 'form validation'/);
		html.should.match(/eventAction: 'failed'/);
		html.should.match(/eventLabel: "KEY1: TYPE1"/);
		html.should.match(/eventLabel: "KEY2: TYPE2"/);
	});

	it('should fire custom ga events for each error', () => {
		let html = compiled.render({
			'ga-id': 'abc',
			'ga-page': '/path',
			errorlist: [
				{ key: 'KEY1', type: 'TYPE1', category: 'CAT1', action: 'ACTION1', label: 'LABEL1', value: 12 }
			]
		});

		html.should.match(/eventCategory: "CAT1"/);
		html.should.match(/eventAction: "ACTION1"/);
		html.should.match(/eventLabel: "LABEL1"/);
		html.should.match(/eventValue: "12"/);
	});

	it('should fire ga events for each event', () => {
		let html = compiled.render({
			'ga-id': 'abc',
			'ga-page': '/path',
			gaevents: [
				{ category: 'CAT1', action: 'ACTION1' },
				{ category: 'CAT2', action: 'ACTION2', label: 'LABEL2', value: 23 }
			]
		});

		html.should.match(/eventCategory: "CAT1"/);
		html.should.match(/eventAction: "ACTION1"/);
		html.should.match(/eventCategory: "CAT2"/);
		html.should.match(/eventAction: "ACTION2"/);
		html.should.match(/eventLabel: "LABEL2"/);
		html.should.match(/eventValue: "23"/);
	});

});