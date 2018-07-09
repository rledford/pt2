var DEG2RAD = 0.01745329252;

function Point(point) {
  if (!point) {
    point = { x: 0, y: 0 }
  }
  this.x = point.x;
  this.y = point.y;
}

Point.prototype.set = function (point) {
  this.x = point.x;
  this.y = point.y;

  return this;
}
Point.prototype.clone = function () {
  return new Point({ x: this.x, y: this.y });
}
Point.prototype.add = function (point) {
  this.x += point.x;
  this.y += point.y;
  return this;
}
Point.prototype.sub = function (point) {
  this.x -= point.x;
  this.y -= point.y;
  return this;
}
Point.prototype.scale = function (value) {
  this.x *= value;
  this.y *= value;
  return this;
}
Point.prototype.scaled = function (value) {
  return this.clone().scale(value);
}
Point.prototype.cross = function (point) {
  return this.x * point.y - this.y * point.x;
}
Point.prototype.dot = function (point) {
  return this.x * point.x + this.y * point.y;
}
Point.prototype.mag2 = function () {
  return Math.pow(this.x, 2) + Math.pow(this.y, 2);
}
Point.prototype.mag = function () {
  return Math.sqrt(this.mag2());
}
Point.prototype.rotate = function (degrees, origin) {
  if (!origin) {
    origin = { x: 0, y: 0 };
  }
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
Point.prototype.rotated = function (degrees, origin) {
  return this.clone().rotate(degrees, origin);
}
Point.prototype.normalize = function () {
  var mag = this.mag();
  if (mag === 0) return this;
  this.x = this.x / mag;
  this.y = this.y / mag;
  return this;
}
Point.prototype.normalized = function () {
  return this.clone().normalize();
}
Point.prototype.negate = function () {
  return this.scale(-1);
}
Point.prototype.negated = function () {
  return this.clone().scale(-1);
}
Point.prototype.dist2 = function (point) {
  var dx = point.x - this.x;
  var dy = point.y - this.y;
  return Math.pow(dx, 2) + Math.pow(dy, 2);
}
Point.prototype.dist = function (point) {
  return Math.sqrt(this.dist2(point));
}
Point.prototype.radiansTo = function (point) {
  return Math.atan2(point.y - this.y, point.x - this.x);
}
Point.prototype.radiansFrom = function (point) {
  return Math.atan2(this.y - point.y, this.x - point.x);
}
Point.prototype.degreesTo = function (point) {
  var degrees = this.radiansTo(point) / DEG2RAD;
  return degrees < 0 ? degrees + 360 : degrees;
}
Point.prototype.degreesFrom = function (point) {
  return new Point(point).degreesTo(this);
}
Point.prototype.directionTo = function (point) {
  var pt = new Point({ x: point.x - this.x, y: point.y - this.y });
  return pt.normalize();
}
Point.prototype.directionFrom = function (point) {
  return this.directionTo(point).negate();
}

module.exports = Point;
