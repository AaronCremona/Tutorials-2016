# Flexbox

## Setting display to flex
```
display: flex;
/* or */
display: inline-flex;
```
Both flex and inline-flex affect the layout of its children. Both flex and inline flex will layout the children the same, but flex makes the container a block level element, so it will affect the horizontal flow with its siblings, but inline flex (like an img tag) will not.

When flex is applied the orientation of the children will line up horizontally. Flex has an orientation that defaults to horizontal (rows). This can be set using flex-direction

```
flex-direction: row | row-reverse | column | column-reverse
```
Most flex properties need prefixes. Check docs or better yet, use an auto-prefixer.  

## Adjusting order of children
First, set parent to flex:
```css
.parent {
  display: flex;
  flex-direction: column;
}
```
To override order, you can use the order property. The property defaults to zero, so all children appear in the order they are laid out in the DOM.
```css
.child {
  order: -1;
  /*jumps in front*/
}
.child {
  order: 1;
  /*jumps to end*/
}
```
Any ties are decided by order in the DOM

## Alignment in Flexbox Children

Justify content affects the way the children are aligned along the direction the content is flowing (i.e. along the rows or columns)
```css
body {
  display: flex;
  flex-direction: column;
  /* content is flowing vertically, so justify-content will affect the vertical spacing without affecting the size of the children */

  justify-content: flex-start;
  /* this is the default setting, which means they bunch up at the start */

  justify-content: flex-end;
  /* they bunch up at the end, so in this case, bottom */

  justify-content: center;
  /* they bunch together in the middle. This is *finally* a way to center one thing vertically in CSS!!!! If you only have one child, it's still centered vertically */

  justify-content: space-between;;
  /* the first goes to the top, the last goes to the bottom, then the rest spread out evenly */

  justify-content: space-around;
  /*  */

}
```
