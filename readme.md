# TWG Front-end Scaffolding

## Overview

The TWG Front-end Scaffolding project provides the generic front-end foundation for most of our web projects. It contains the basic building blocks used to layout the various elements on a site. These building blocks include a front-end grid system, the combo element, and a sticky footer. This project does not include or enforce any stylistic choices (ie. button styles, default colour schemes, etc.).

## How to integrate with your project

#### Bower & Gulp

The preferred method of integratting this scaffolding into your project is via Bower and Gulp.

1. `bower install twg-frontend-scaffolding`
2. integrate `_scaffolding.styl` into your Gulp workflow

By integrating `_scaffolding.styl` into your Gulp workflow, you have the opportunity to override some of the default scaffolding settings as well as use the mixins that come with the scaffolding project in your own project.

#### Include minified CSS

Alternatively, you can simply include the minified scaffolding file to your project's head like so:

`<link href="path/to/file/scaffolding.min.css" media="all" rel="stylesheet" />`

## Usage

#### Sticky Footer

A sticky footer is a footer that sits at the bottom of the browser window unless the content on the page is taller than the height of the browser, in which case the sticky footer simply sits below the content. To implement the sticky footer simply ensure your project's DOM follows this basic structure:

```
body
  .siteWrapper
    .siteBody lorem ipsum...
    .siteFooter lorem ipsum...
```

#### Breakpoints

Scaffolding comes with some predefined default breakpoints, though you can easily override them as you see fit. They include:

- `palm` - 480px and down
- `lap` - greater than 480px and less than 1024px
- `portable` - less than 1024px
- `large` - greater than 480px
- `desk` - 1024px and greater

#### Grid

The grid system is inspired by the [CSS Wizardry Grid](https://github.com/csswizardry/csswizardry-grids). The following changes have been made:

- adheres to the TWG BEM naming convention
- variable gutter sizes based on breakpoints
- no markup or wordspacing fix needed
- includes an extra `large` breakpoint by default
- more granularity - `.grid-3of11` is now possible
- variable number of columns - 12 columns is the default

##### General Usage

There are two required elements to work with the grid. The first being `.grid` itself which will house one or more grid items (cells). Grid items follow the syntax `.grid-xofy` where `x` is the number of columns this grid item should span out of a total of `y` columsn. The general structure will resemeble this:

```
.grid
  .grid-1of2 lorem ipsum...
  .grid-1of2 lorem ipusm...
```

##### Grid Modifiers

The grid supports a number of optional modifiers that can be applied to `.grid` to adjust the formatting of the grid. These include:

- `.grid.grid--middle` - vetically centers the grid items
- `.grid.grid--bottom` - bottom align the grid items
- `.grid.grid--rev` - reverse the order of the grid items

Any of these modifiers can also be applied at a specific breakpoint, rather than across all breakpoints. To do this, simply append the breakpoint name to the modifier. For example: `.grid.grid--middle--desk` would only vertically center the grid items at the desk breakpoint.

#### Combo

The Combo element is inspired by [Stubbornella's media object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/). Combos are like a grid that always contains exactly two columns By default, the first column will consume as much width as it's content requires and the last column will consume all remaining width.
