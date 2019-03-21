var DEG2RAD = 0.01745329252;

interface IPoint {
  x: number;
  y: number;
  [prop: string]: any;
}

export class Point implements IPoint {
  x: number;
  y: number;
  [prop: string]: any;

  constructor(x: number | IPoint = 0, y = 0) {
    if (typeof x === 'number') {
      this.x = x;
      this.y = y;
    } else {
      this.x = x.x;
      this.y = x.y;
    }
  }

  set(point: IPoint): Point {
    this.x = point.x;
    this.y = point.y;
    return this;
  }

  clone(): Point {
    return new Point(this.x, this.y);
  }

  add(point: IPoint): Point {
    this.x += point.x;
    this.y += point.y;
    return this;
  }

  sub(point: IPoint): Point {
    this.x -= point.x;
    this.y -= point.y;
    return this;
  }

  scale(value: number): Point {
    this.x *= value;
    this.y *= value;
    return this;
  }

  scaled(value: number): Point {
    return this.clone().scale(value);
  }

  cross(point: IPoint): number {
    return this.x * point.y - this.y * point.x;
  }

  dot(point: IPoint): number {
    return this.x * point.x + this.y * point.y;
  }

  mag(): number {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2);
  }

  mag2(): number {
    return Math.sqrt(this.mag2());
  }

  rotate(degrees: number, origin?: IPoint): Point {
    if (!origin) {
      origin = { x: 0, y: 0 };
    }
    var angle = DEG2RAD * degrees;
    var s = Math.sin(angle);
    var c = Math.cos(angle);
    this.sub(origin);
    this.x = this.x * c - this.y * s;
    this.y = this.x * s + this.y * c;
    this.add(origin);
    return this;
  }

  rotated(degrees: number, origin?: IPoint): Point {
    return this.clone().rotate(degrees, origin);
  }

  normalize(): Point {
    var mag = this.mag();
    if (mag === 0) return this;
    this.x = this.x / mag;
    this.y = this.y / mag;
    return this;
  }

  normalized(): Point {
    return this.clone().normalize();
  }

  negate(): Point {
    return this.scale(-1);
  }

  negated(): Point {
    return this.clone().scale(-1);
  }

  dist(point: IPoint): number {
    return Math.sqrt(this.dist2(point));
  }

  dist2(point: IPoint): number {
    var dx = point.x - this.x;
    var dy = point.y - this.y;
    return Math.pow(dx, 2) + Math.pow(dy, 2);
  }

  radiansTo(point: IPoint): number {
    return Math.atan2(point.y - this.y, point.x - this.x);
  }

  radiansFrom(point: IPoint): number {
    return Math.atan2(this.y - point.y, this.x - point.x);
  }

  degreesTo(point: IPoint): number {
    var degrees = this.radiansTo(point) / DEG2RAD;
    return degrees < 0 ? degrees + 360 : degrees;
  }

  degreesFrom(point: IPoint): number {
    return new Point(point.x, point.y).degreesTo(this);
  }

  directionTo(point: IPoint): Point {
    var pt = new Point(point.x - this.x, point.y - this.y);
    return pt.normalize();
  }

  directionFrom(point: IPoint): Point {
    return this.directionTo(point).negate();
  }
}
