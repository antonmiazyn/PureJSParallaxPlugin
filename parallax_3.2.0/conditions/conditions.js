/* === Common Class === */

class Condition {

  constructor(weight, speed, y, top, bottom) {
    this.weight = weight;
    this.speed = speed;
    this.y = y;
    this.top = top;
    this.bottom = bottom;

    this.result;
    this.height;
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

  setTop(value) {
    this.top = value;
  }

  setBottom(value) {
    this.bottom = value;
  }

  /*-------------------------------------*/

  getHeight() {
    this.height = this.bottom - this.top;

    return this.height;
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
