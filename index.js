var app = require('express')(),
    path = require('path');

app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './views'));
app.use(require('express-partial-templates')(app, { prefix: 'hmpo' }));

module.exports = app;
