var DEG2RAD = 0.01745329252;
class Point {
  constructor(point = { x: 0, y: 0 }) {
    this.x = point.x;
    this.y = point.y;
  }
  set(point = { x: 0, y: 0 }) {
    this.x = point.x;
    this.y = point.y;
    return this;
  }
  clone() {
    return new Point({ x: this.x, y: this.y });
  }
  add(point = { x: 0, y: 0 }) {
    this.x += point.x;
    this.y += point.y;
    return this;
  }
  sub(point = { x: 0, y: 0 }) {
    this.x -= point.x;
    this.y -= point.y;
    return this;
  }
  scale(value) {
    this.x *= value;
    this.y *= value;
    return this;
  }
  scaled(value) {
    return this.clone().scale(value);
  }
  cross(point = { x: 0, y: 0 }) {
    return this.x * point.y - this.y * point.x;
  }
  dot(point = { x: 0, y: 0 }) {
    return this.x * point.x + this.y * point.y;
  }
  mag2() {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2);
  }
  mag() {
    return Math.sqrt(this.mag2());
  }
  rotate(degrees, origin = { x: 0, y: 0 }) {
    var angle = DEG2RAD * degrees;
    var s = Math.sin(angle);
    var c = Math.cos(angle);
    this.sub(origin);
    var x = this.x * c - this.y * s;
    var y = this.x * s + this.y * c;
    this.set({ x: x, y: y });
    this.add(origin);
    return this;
  }
  rotated(degrees, origin = { x: 0, y: 0 }) {
    return this.clone().rotate(degrees, origin);
  }
  normalize() {
    var mag = this.mag();
    if (mag === 0) return this;
    this.x = this.x / mag;
    this.y = this.y / mag;
    return this;
  }
  normalized() {
    return this.clone().normalize();
  }
  negate() {
    return this.scale(-1);
  }
  negated() {
    return this.clone().scale(-1);
  }
  dist2(point = { x: 0, y: 0 }) {
    var dx = point.x - this.x;
    var dy = point.y - this.y;
    return Math.pow(dx, 2) + Math.pow(dy, 2);
  }
  dist(point = { x: 0, y: 0 }) {
    return Math.sqrt(this.dist2(point));
  }
  radiansTo(point = { x: 0, y: 0 }) {
    return Math.atan2(point.y - this.y, point.x - this.x);
  }
  radiansFrom(point = { x: 0, y: 0 }) {
    return Math.atan2(this.y - point.y, this.x - point.x);
  }
  degreesTo(point = { x: 0, y: 0 }) {
    var degrees = this.radiansTo(point) / DEG2RAD;
    return degrees < 0 ? degrees + 360 : degrees;
  }
  degreesFrom(point = { x: 0, y: 0 }) {
    return new Point(point).degreesTo(this);
  }
  directionTo(point = { x: 0, y: 0 }) {
    var pt = new Point({ x: point.x - this.x, y: point.y - this.y });
    return pt.normalize();
  }
  directionFrom(point = { x: 0, y: 0 }) {
    return this.directionTo(point).negate();
  }
}
module.exports = Point;
