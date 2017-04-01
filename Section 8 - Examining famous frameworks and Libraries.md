### Learning from other's good code
- READ frameworks, libraries of JS, for example: githunb.com -> explore

### Deep Dive jQuery part 1
```javascript
  jQuery = function( selector, context ) {
    // The jQuery object is actually just the init constructor 'enhanced'
    // Need init if jQuery is called (just allow error to be thrown if not included)
    return new jQuery.fn.init( selector, context );
  },
```
- function jQuery return a call to function constructor -> so it keeps me from having to use the new keyword myself all the time (it's a neat trick)

### Deep Dive jQuery part 3
- Method chaining: call a method after completing the previous on same object
> bằng cách "return this"
