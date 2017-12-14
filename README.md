## PT2

2D Point class that is capable of performing vector calculations. Provides convenience methods for calculating distance, magnitude, direction, angle (degrees and radians), to and from other Points or Point-like objects that contain 'x' and 'y' properties.

### Installing

#### NPM

```bash
npm install pt2 --save
```

#### Yarn

```bash
yarn add pt2
```

### Importing

```javascript
var Point = require('pt2');
```

#### Babel / ES6

```javascript
import Point from 'pt2';
```

### Creating a Point

The `Point` constructor expects an `Object` with `x` and `y` properties, with each being of the type `Number`. If the constructor `arg` is omitted, or does not contain `x` and `y` properties, the `x` and `y` properties of the `Point` will be set to 0 (zero).

```javascript
var pointA = new Point(); // {x: 0, y: 0}
var pointB = new Point({ x: 10, y: 5 }); // {x: 10, y: 5}
```

### Setting Properties

```javascript
var pointA = new Point(); // {x: 0, y: 0}
pointA.x = 10; // {x: 10, y: 0}
pointA.set({ x: 5, y: 10 }); // {x: 5: y: 10}
```

### Cloning a Point

```javascript
var pointA = new Point({ x: 1, y: 1 }); // {x: 1, y: 1}
var pointB = pointA.clone(); // {x: 1, y: 1} - a new Point is returned, not a reference to pointA
```

### Adding and Subtracting

```javascript
var pointA = new Point({ x: 1, y: 1 });
var pointB = new Point({ x: 5, y: 10 });

pointA.add(pointB); // pointA = {x: 6, y: 11}

pointB.sub(pointA); // pointB = {x: -1, y: -1}
```

### Scaling

```javascript
var pointA = new Point({ x: 1, y: 1 });
pointA.scale(10); // {x: 10, y: 10} - scales the Point in place

var pointB = pointA.scaled(10); // {x: 100, y: 100} - returns a new Point leaving pointA unaffected
```

### Cross Product

```javascript
var pointA = new Point({ x: 1, y: 1 });
var pointB = new Point({ x: 5, y: 10 });
pointA.cross(pointB); // 5
```

### Magnitude

```javascript
var pointA = new Point({ x: 1, y: 1 });
pointA.mag(); // 1.4142135623730951 - the magnitude, also referred to as the length, of the point
pointA.mag2(); // 2 - the squared magnitude of the point - similar to mag() but avoids using Math.sqrt
```

### Normalizing

```javascript
var pointA = new Point({ x: 1, y: 1 });
pointA.normalize(); // {x: 0.74, y: 0.74}

var pointB = new Point({ x: 1, y: 1 });
var norm = pointB.normalized(); // new Point {x: 0.74, y: 0.74} is returned - pointB is unaffected
```

### Rotating

```javascript
var pointA = new Point({ x: 1, y: 1 });
pointA.rotate(90); // {x: -1, y: 0}

var pointB = pointA.rotated(270); // {x: 1, y: 1} - leaves pointA unaffected
```

### Negating

```javascript
var pointA = new Point({ x: 1, y: 1 });
pointA.negate(); // {x: -1, y: -1})
var pointB = pointA.negated(); // {x: 1, y: 1} - leaves pointA unaffected
```

### Distance Between Two Points

```javascript
var pointA = new Point({ x: 1, y: 1 });
var pointB = new Point({ x: 5, y: 10 });
pointA.dist(pointB); // 9.848857801796104
pointA.dist2(pointB); // 97 - similar to dist() but avoids using Math.sqrt
```

### Angles Between Two Points

```javascript
var pointA = new Point({ x: 1, y: 1 });
var pointB = new Point({ x: 5, y: 10 });
pointA.radiansTo(pointB); // 1.1525719972156676
pointA.radiansFrom(pointB); // -1.9890206563741257
pointA.degreesTo(pointB); // 66.03751102520727
pointA.degreesFrom(pointB); // 246.03751102579207
```

#### Chaining

Most `Point` methods return a new `Point` or `this` so they can be chained.

```javascript
var pointA = new Point({ x: 1, y: 1 });
var pointB = new Point({ x: 5, y: 5 });
pointA
  .sub(pointB)
  .normalize()
  .rotate(90)
  .scale(10);
```

The methods that dot no return a `Point` or `this` include:

* mag
* mag2
* dist
* dist2
* radiansTo
* radiansFrom
* degreesTo
* degreesFrom
