# SCSS

Sass is a different format from css
- no brackets, semicolons etc
- indentation matters and controls nesting

SCSS
- includes many of the same features of sass, but uses standard syntax, brackets, semicolons etc instead of whitespace

## Variables

```
$text-color: #222222;

body {
  color: $text-color;
}
```
- Convention: all lower case, words separated by hyphens.
- Usually variables are put at the top as a configuration area.
- Variables can reference variables
- common practice is to separate variables into sections using comments

## Partials
Partials are scss files that do not get converted to css files by the preprocessor.

Partials files are named with an underscore at the beginning.

They are imported using a standard css import statement (no underscore or extension is necessary)
```
@import "partial";
```

## Mixins

Reusable pieces of code - super useful

```
@mixin warning {
  background-color: orange;
  color: #fff;
}

.warning-button {
  @include warning;
  padding: 10px;
  etc
}
```
Side note: you can next dashed properties under the first part of their name. e.g.
```
font {
  size: 2rem;
  weight: bold;
}
```

### Mixins with Arguments

Mixins support arguments to increase the reusability
```
@mixin rounded($radius: 6px) {
  border-radius: $radius;
}

.box {
  @include rounded(6px);
  border: 1px solid magenta;
}
```
The value in the mixin declaration is a default value. If no value is passed in, it will use the default, but if the argument is passed in, then it will use that value.

*Note*: if there are multiple parameters and you want to use default for the first parameter, you have to specify the parameter explicitly, eg $border: 1px solid brown. This can be used even when supplying all the arguments, and then order doesn't matter, and the code is a bit more readable.

You can also pass in any number of arguments using ...
```
@mixis box-shadow($shadows...) {
  box-shadow: $shadows;
  -moz-box-shadow: $shadows;
  -webkit-box-shadow: $shadows;
}

#header {
  @include box-shadows(2px 0px 4px #999, 1px 1px 6px $secondary-color);
}
```

Also, it's possible to pass css code into a mixin and using the @content directive inside the mixin

## Import Directives

Regular css supports some imports, so those will fall back to regular css and not scss:
```
@import url();
@import "http//..."
@import "filename.css"
@import "style-screen" screen;
```

Scss imports will search the current folder and import either a regular scss file (no underscore) or a partial (with underscore). Therefore, it's important not to have both versions of the same name, because then the scss preprocessor won't know what's up. You can use any relative path in the import.

## Media Queries

All the capabilities of regular css media queries apply, with the addition of the ability to nest media queries in selectors. Eg:

```
#main {
  width: $content-width;
  @media only screen and (max-width: 960px) {
    width: auto;
    max-width: $content-width;
  }
}
```
This is a bomb way to use media queries because then the relevant queries are right there with the selector they effect

### Using Mixins with Media queries

Usually you want to target the same breakpoints throughout the css, so it's a good use case for a mixin to just set the actual breakpoint once, then use it semantically in the rest of the code
```
@mixin tiny-screens() {
  @media only screen and (max-width: 320px) {
    @content;
  }
}

@include tiny-screens {
  font-size: .7rem;
}
```

## Functions

SCSS supports functions that do computations and return values as well as a some built in functions:

### Built in
```
a {
  color: $link-color

  &:hoover {
    color: darken($link-color, 15%);
  }                                                                                  
}
```
Other sweet built in functions are lighten, opacify, transparentize.

### Custom functions
```
@function sum($left, $right) {
  @return $left + right;
}

@function em($pixels, $context: 16px) {
  @return ($pixels / $context) * 1em;
}
```

## Inheritance

Sass has a way for classes to inherit from other classes and extend them:

```
.error {
  color: red;
}

critical-error {
  @extend .error;
  bottom: 1px solid red;
}
```

You can have multiple extends in the same selector.

There is also an extend only selector, %, that does not get complied to css, but is available to use as an extension in the scss code.
