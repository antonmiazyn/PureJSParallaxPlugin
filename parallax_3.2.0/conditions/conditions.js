/* === Common Class === */

class Condition {

  constructor(weight, speed, y, start) {
    this.weight = weight;
    this.speed = speed;
    this.y = y;
    this.result;
    this.start = start;
  }

  setWeight(value) {
    this.weight = value;
  }

  setSpeed(value) {
    this.speed = value;
  }

  setY(value) {
    this.y = value;
  }

  setStart(value) {
    this.start = value;
  }

}

/* === Vertical Condition Parallax === */

class Vertical extends Condition {

  /*-------- Execution ---------*/

  verticalMove() {
    this.result = this.y / this.weight;

    return this.result;
  }
}

/* === Horizontal Condition Parallax === */

class Horizontal extends Condition {

  /*-------- Execution ---------*/

  horizontalMove() {
    this.result = this.y / this.weight;

    return this.result;
  }
}

/* === Mousemove Condition Parallax === */

class Mousemove extends Condition {

  /*-------- Execution ---------*/

  move() { //getSpeed()
    return this.speed * 10;
  }

}
