const DEG2RAD = 0.01745329252;

class Point {
  constructor(coords = { x: 0, y: 0 }) {
    this.x = coords.x || 0;
    this.y = coords.y || 0;
  }

  add(point = { x: 0, y: 0 }) {
    this.x += point.x || 0;
    this.y += point.y || 0;

    return this;
  }

  sub(point = { x: 0, y: 0 }) {
    this.x -= point.x || 0;
    this.y -= point.y || 0;

    return this;
  }

  scale(value) {
    this.x *= value;
    this.y *= value;

    return this;
  }

  scaled(value) {
    return new Point({ x: this.x * value, y: this.y * value });
  }

  cross(point = { x: 0, y: 0 }) {
    return this.x * point.y - this.y * point.x;
  }

  mag2() {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2);
  }

  mag() {
    return Math.sqrt(this.mag2());
  }

  rotate(degrees) {
    let rad = degrees * DEG2RAD;
    let cos = Math.cos(rad);
    let sin = Math.sin(rad);
    let x = this.x * cos - this.y * sin;
    let y = this.x * sin + this.y * cos;
    this.x = x;
    this.y = y;

    return this;
  }

  rotated(degrees) {
    let rad = degrees * DEG2RAD;
    let cos = Math.cos(rad);
    let sin = Math.sin(rad);
    let point = new Point();
    point.x = this.x * cos - y * sin;
    point.y = this.x * sin + y * cos;

    return point;
  }

  normalize() {
    let mag = this.mag();
    if (mag === 0) return this;

    this.x = this.x / mag;
    this.y = this.y / mag;

    return this;
  }

  normalized() {
    let mag = this.mag();
    let point = new Point();
    if (mag === 0) return point;

    point.x = this.x / mag;
    point.y = this.y / mag;

    return point;
  }

  set(point = { x: 0, y: 0 }) {
    this.x = point.x;
    this.y = point.y;

    return this;
  }

  negate() {
    this.x *= -1;
    this.y *= -1;

    return this;
  }

  negated() {
    return new Point({ x: this.x * -1, y: this.y * -1 });
  }

  dist2(point = { x: 0, y: 0 }) {
    let dx = (point.x || 0) - this.x;
    let dy = (point.y || 0) - this.y;

    return Math.pow(dx, 2) + Math.pow(dy, 2);
  }

  dist(point = { x: 0, y: 0 }) {
    return Math.sqrt(this.dist2(point));
  }

  radTo(point = { x: 0, y: 0 }) {
    return Math.atan2(point.y - this.y, point.x - this.x);
  }

  radFrom(point = { x: 0, y: 0 }) {
    return Math.atan2(this.y - point.y, this.x - point.y);
  }

  degreesTo(point = { x: 0, y: 0 }) {
    return this.radTo(point) / DEG2RAD;
  }

  degreesFrom(point = { x: 0, y: 0 }) {
    return this.radFrom(point) * DEG2RAD;
  }

  directionTo(point = { x: 0, y: 0 }) {
    let pt = new Point({ x: point.x - this.x, y: point.y - this.y });
    pt.normalize();

    return pt;
  }

  directionFrom(point = { x: 0, y: 0 }) {
    return this.to(point).negate();
  }
}

module.exports = Point;
