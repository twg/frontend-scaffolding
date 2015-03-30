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

### Naming Conventions

The TWG front-end scaffolding follows a variation of the BEM naming convention. BEM stands for Block Element Modifier. Blocks, are resuable components that together make up the various views of a web application or site. Elements are the components within a block. Modifiers are classes that can be applied to blocks or elements to alter their default appearance. More info on BEM in general can be found here:  [http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/). Our version of BEM follows a slightly different syntax as it uses dash exclusievly instead of a combination of dashes and underscores.

```
.block
.block-element
.block--modifier
```

Since dashes indicate BEM structure they should **not** be used for multi-word names, instead camel case should be used.

### Breakpoints

Scaffolding comes with some predefined default breakpoints, though you can easily override them as you see fit. They include:

- `palm` - 480px and down
- `lap` - greater than 480px and less than 1024px
- `portable` - less than 1024px
- `large` - greater than 480px
- `desk` - 1024px and greater

### Container

Scaffolding provides a generic `.container` element that can be used to provide your site with a maximum width. If the browser goes beyond the container's maximum width, container will horizontally center itself. By default, the container's max-width is set to 1024px.

### Grid

The grid system is inspired by the [CSS Wizardry Grid](https://github.com/csswizardry/csswizardry-grids). The following changes have been made:

- adheres to the TWG BEM naming convention (single and double dashes, no underscores, camelCase)
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

##### Changing Grid Based-on Breakpoint

As the scaffolding grid is responsive, you'll likeley need to alter the grid based on a particular breakpoint. To do this, simply append the name of the breakpoint to the grid item class like so: `.grid-1of4.grid-1of1--palm`.

##### Grid Modifiers

The grid supports a number of optional modifiers that can be applied to `.grid` to adjust the formatting of the grid. These include:

- `.grid.grid--middle` - vetically centers the grid items
- `.grid.grid--bottom` - bottom align the grid items
- `.grid.grid--rev` - reverse the order of the grid items

Any of these modifiers can also be applied at a specific breakpoint, rather than across all breakpoints. To do this, simply append the breakpoint name to the modifier. For example: `.grid.grid--middle--desk` would only vertically center the grid items at the desk breakpoint.

### Combo

The Combo element is inspired by [Stubbornella's media object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/). Combos are like a grid that always contains exactly two columns By default, the first column will consume as much width as it's content requires and the last column will consume all remaining width.

##### General Usage

There are three required elements to implement a combo. They are:

- `.combo` - the wrapper that will house the combo elements
- `.combo-first` - the left element of the combo
- `.combo-last` - the right element of the combo

The general strcture looks like:

```
.combo
  .combo-first lorem ipsum...
  .combo-last lorem ipsum...
```

##### Combo Modifiers

Like the grid the combo supports a number of modifiers, these include:

- `.combo.combo--middle` - vetically centers the combo items
- `.combo.combo--bottom` - bottom align the combo items
- `.combo.combo--rev` - reverse the the way `.combo-first` and `.combo-last` work

Any of these modifiers can also be applied at a specific breakpoint, rather than across all breakpoints. To do this, simply append the breakpoint name to the modifier. For example: `.combo.combo--middle--desk` would only vertically center the combo items at the desk breakpoint.

### Stylus

If you `@require '_scaffolding.styl' with your application's Stylus code you are able to override scaffolding's default variables and work with some of the mixins it provides.

#### Variables

The following scaffolding variables can be overridden by defining them prior to `@require`-ing the the scaffolding Stylus file:

| Variable        | Default |
|:----------------|:--------| 
| base-font-size  | 16px    |
| container-width | 1024px  |
| grid-columns    | 12      |

```
breakpoints = {
  large: {breakpoint: '(min-width: 481px)', gutter: 24px},
  desk: {breakpoint: '(min-width: 1024px)', gutter: 24px},
  lap: {breakpoint: '(min-width: 481px) and (max-width: 1023px)', gutter: 24px},
  portable: {breakpoint: '(max-width: 1023px)', gutter: 24px},
  palm: {breakpoint: '(max-width: 480px)', gutter: 24px}
}
```

#### Mixins

If you require `_scaffolding.styl` with your applications Stylus code, scaffolding will provide you with a number of additional mixins you can use throughout your project.

The replicate mixin allows you to create breakpoint specific versions of any class (similar to the way the modifiers work above). You would implement it like so:

```
+replicate('.foo')
  background: red
  color: white
```

which would generate the following:

```
.foo {
  background: #f00;
  color: #fff;
}
@media (min-width: 481px) {
  .foo--large {
    background: #f00;
    color: #fff;
  }
}
@media (min-width: 1024px) {
  .foo--desk {
    background: #f00;
    color: #fff;
  }
}
@media (min-width: 481px) and (max-width: 1023px) {
  .foo--lap {
    background: #f00;
    color: #fff;
  }
}
@media (max-width: 1023px) {
  .foo--portable {
    background: #f00;
    color: #fff;
  }
}
@media (max-width: 480px) {
  .foo--palm {
    background: #f00;
    color: #fff;
  }
}
```
