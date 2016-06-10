# hmpo-templates

Common page layouts and partials. Inherits from [hmpo-govuk-template](https://github.com/UKHomeOffice/govuk-template-compiler).

## Installation

```
npm install [--save] hmpo-templates
```

## Setup

Install [hogan-express-strict](https://github.com/lennym/hogan-express) as part of your project.
```
var app = require('express')();

app.use(require('hmpo-templates'));
app.engine('html', require('hogan-express-strict'));
```

## Basic usage

my-page.html
```
{{< hmpo-layout}}
    {{$pageTitle}}...page title...{{/pageTitle}}

    {{$header}}
        <h1>...heading...</h1>
    {{/header}}

    {{$content}}
        <p>...intro content...</p>
        {{< hmpo-partials-form}}
            {{$form}}
                ...form inputs...
                ...form submit button...
            {{/form}}
        {{/ hmpo-partials-form}}
    {{/content}}
{{/ hmpo-layout}}
```

## Templates

The templates are added to `res.locals`.

Layout:
+ maincontent (sets maincontent-left as the default and provides a block to override)
+ maincontent-left
+ maincontent-right
+ maincontent-full
+ flash-card

Partials:
+ analytics
+ back-link
+ back
+ betatag
+ body-end
+ cookies
+ form
+ head
+ new-window
+ sidebar
+ validation-summary

### Changing a page layout

layout.html
```
{{< hmpo-layout}}
    {{$pageTitle}}...page title...{{/pageTitle}}

    {{$main-content}}
        {{< hmpo-partials-maincontent-right}}
            {{$header}}...heading...{{/header}}
            {{$content}}...content...{{/content}}
        {{/ hmpo-partials-maincontent-right}}
    {{/main-content}}
{{/ hmpo-layout}}
```

## Compatibility

Use with [hmpo-template-mixins](https://github.com/UKHomeOffice/passports-template-mixins) for form inputs and view formatters. When used with [hmpo-form-wizard](https://github.com/UKHomeOffice/passports-form-wizard) you'll get a validation summary appearing at the top of your page when a form error occurs.
