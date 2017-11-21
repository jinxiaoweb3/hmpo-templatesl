'use strict';

require('chai').should();
const Hogan = require('hogan.js');
const path = require('path');
const fs = require('fs');

describe('Check all templates compile', () =>  {
	let partialsDirectory = path.resolve(__dirname, '..', 'views', 'partials');
	fs.readdirSync(partialsDirectory).forEach(filename => {
		describe('partial ' + filename, () => {
			let template = fs.readFileSync(path.resolve(partialsDirectory, filename), 'utf8');
			it('should compile', () => {
				let compiled = Hogan.compile(template);
				compiled.should.be.an('object');
			});

			it('should render', () => {
				let html = Hogan.compile(template).render();
				html.should.be.a('string');
			});
		});
	});
});