import { Point } from '../src/Point';

function testGroup1() {
  var methods = [
    'add',
    'sub',
    'cross',
    'dot',
    'dist',
    'dist2',
    'radiansTo',
    'radiansFrom',
    'degreesTo',
    'degreesFrom',
    'directionTo',
    'directionFrom'
  ];
  methods.forEach(function(method) {
    var pointA = new Point(1, 1);
    var pointB = new Point(5, 10);
    console.log('***************************');
    console.log('test', method);
    console.log('pointA', pointA);
    console.log('pointB', pointB);
    var result = pointA[method](pointB);
    console.log('result', result);
    console.log('***************************');
  });
}
function testGroup2() {
  var methods = ['scale', 'scaled'];
  methods.forEach(function(method) {
    var pointA = new Point(1, 1);
    var value = 45;
    console.log('***************************');
    console.log('test', method);
    console.log('pointA', pointA);
    console.log('value', value);
    var result = pointA[method](value);
    console.log('result', result);
    console.log('***************************');
  });
}
function testGroup3() {
  var methods = ['normalize', 'normalized', 'negate', 'negated'];
  methods.forEach(function(method) {
    var pointA = new Point(1, -1);
    console.log('***************************');
    console.log('test', method);
    console.log('pointA', pointA);
    console.log(pointA[method]());
    console.log('***************************');
  });
}
function testGroup4() {
  var pointA = new Point(1, 1);
  var origin = new Point(2, 1);
  var degrees = 180;
  console.log('***************************');
  console.log('test rotation');
  console.log('pointA', pointA);
  console.log('degrees', degrees);
  console.log('origin', origin);
  console.log('rotate - no origin');
  console.log(pointA.clone().rotate(degrees));
  console.log('rotated - no origin');
  console.log(pointA.clone().rotated(degrees));
  console.log('rotate - with origin');
  console.log(pointA.clone().rotate(degrees, origin));
  console.log('rotated - with origin');
  console.log(pointA.clone().rotated(degrees, origin));
  console.log('***************************');
}
testGroup1();
testGroup2();
testGroup3();
testGroup4();
