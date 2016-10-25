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
