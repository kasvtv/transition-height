[![NPM version](https://img.shields.io/npm/v/transition-height.svg?style=flat)](https://www.npmjs.org/package/transition-height)


# transition-height

A micro library for animating the height of an element using CSS transitions, circumventing CSS' inability to transition from or to an automatically computed height.

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