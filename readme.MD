[![NPM version](https://img.shields.io/npm/v/transition-height.svg?style=flat)](https://www.npmjs.org/package/transition-height)
[![Size](https://badgen.net/bundlephobia/minzip/transition-height)](https://bundlephobia.com/result?p=transition-height)
[![Build Status](https://travis-ci.com/kasvtv/transition-height.svg?branch=master)](https://travis-ci.com/kasvtv/transition-height)
[![Coverage Status](https://coveralls.io/repos/github/kasvtv/transition-height/badge.svg?branch=master)](https://coveralls.io/github/kasvtv/transition-height?branch=master)
[![Dependency Status](https://david-dm.org/kasvtv/transition-height.svg)](https://david-dm.org/kasvtv/transition-height)
[![Known Vulnerabilities](https://snyk.io/test/github/kasvtv/transition-height/badge.svg?targetFile=package.json)](https://snyk.io/test/github/kasvtv/transition-height?targetFile=package.json)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)


# transition-height

Don't you often run into the problem that CSS can only transition to a set height and not to an element's full height? That's why this micro library exists. `transition-height` allows you to transition the height of an element from its full dynamic height to 0 height and back with an easy interface!

## Installation

```bash
npm install transition-height
```

## Usage

```js
import {toggle, expand, collapse} from 'transition-height';

const element = document.getElementById('myElement');

// Expand the element to its full height
expand(element);

// Collapse the element to 0 height
collapse(element);

// Collapse the element to 100 pixels of height
collapse(element, 100)

// Toggle between expanded and collapsed state
toggle(element);

// Toggle between expanded and collapsed to 100 pixels
toggle(element, 100)

// Toggle between expanded and collapsed state, save whether or not the element started to collapse or expand
const isExpanding = toggle(element)

```