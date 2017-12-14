const DEG2RAD = 0.01745329252;

class Point {
  constructor(coords = { x: 0, y: 0 }) {
    this.x = coords.x || 0;
    this.y = coords.y || 0;
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
    let angle = DEG2RAD * degrees;
    let s = Math.sin(angle);
    let c = Math.cos(angle);
    this.sub(origin);
    let x = this.x * c - this.y * s;
    let y = this.x * s + this.y * c;
    this.set({ x: x, y: y });
    this.add(origin);

    return this;
  }

  rotated(degrees, origin = { x: 0, y: 0 }) {
    return this.clone().rotate(degrees, origin);
  }

  normalize() {
    let mag = this.mag();
    if (mag === 0) return this;

    this.x = this.x / mag;
    this.y = this.y / mag;

    return this;
  }

  normalized() {
    return this.clone().normalize();
  }

  negate() {
    this.x *= -1;
    this.y *= -1;

    return this;
  }

  negated() {
    return this.clone().negate();
  }

  dist2(point = { x: 0, y: 0 }) {
    let dx = (point.x || 0) - this.x;
    let dy = (point.y || 0) - this.y;

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
    let degrees = this.radiansTo(point) / DEG2RAD;
    return degrees < 0 ? degrees + 360 : degrees;
  }

  degreesFrom(point = { x: 0, y: 0 }) {
    return new Point(point).degreesTo(this);
  }

  directionTo(point = { x: 0, y: 0 }) {
    let pt = new Point({ x: point.x - this.x, y: point.y - this.y });
    pt.normalize();

    return pt;
  }

  directionFrom(point = { x: 0, y: 0 }) {
    return this.directionTo(point).negate();
  }
}

module.exports = Point;
