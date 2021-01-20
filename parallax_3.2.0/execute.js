/*
  Execution Script
*/

//=======================

window.onload = () => {
  //Finding the parallax elements in DOM
  const parallaxNodeElements = document.querySelectorAll(".parallax");
  const verticalNodeElements = Array.from(parallaxNodeElements).filter(p_el => p_el.classList.contains("p-vertical")); //separating vertical parallax elements in DOM
  const horizontalNodeElements = Array.from(parallaxNodeElements).filter(p_el => p_el.classList.contains("p-horizontal")); //separating horizontal parallax elements in DOM
  const mousemoveNodeElements = Array.from(parallaxNodeElements).filter(p_el => p_el.classList.contains("p-mousemove")); //separating mousemove parallax elements in DOM

  //=======================

  function setPagePosition() {
    const y_offset = window.pageYOffset;
    return y_offset;
  }

  const loadedPagePosition = setPagePosition();

  //=======================

  const verticalCreatedObjects = verticalNodeElements ? createVerticalObjects(verticalNodeElements) : [];

  function createVerticalObjects(elements) {
    const array = [];
    elements.forEach((element) => {
      const object = new Vertical(0, 0, loadedPagePosition, 0);
      array.push(object);
    });

    return array;
  }

  const horizontalCreatedObjects = horizontalNodeElements ? createHorizontalObjects(horizontalNodeElements) : [];

  function createHorizontalObjects(elements) {
    const array = [];
    elements.forEach((element) => {
      const object = new Horizontal(0, 0, loadedPagePosition, 0);
      array.push(object);
    });

    return array;
  }

  let mousemoveCreatedObjects = horizontalNodeElements ? createMousemoveObjects(mousemoveNodeElements) : [];

  function createMousemoveObjects(elements) {
    const array = [];
    elements.forEach((element) => {
      const element_speed = element.speed;
      const object = new Mousemove(0, element_speed, loadedPagePosition, 0);
      array.push(object);
    });

    return array;
  }

  //=======================

  function setVerticalProperties() {
    verticalCreatedObjects.forEach((object, i) => {
      if(verticalNodeElements) {
        if(Number(verticalNodeElements[i].getAttribute("data-weight")) != 0) {
          object.setWeight(Number(verticalNodeElements[i].getAttribute("data-weight")));
        } else {
          object.setWeight(10); //default
        }

        object.setY(Number(loadedPagePosition));
        object.setStart(object.verticalMove());
      }
    });
  }

  //=======================

  function setHorizontalProperties() {
    horizontalCreatedObjects.forEach((object, i) => {
      if(horizontalNodeElements) {
        if(Number(horizontalNodeElements[i].getAttribute("data-weight")) != 0) {
          object.setWeight(Number(horizontalNodeElements[i].getAttribute("data-weight")));
        } else {
          object.setWeight(10); //default
        }

        object.setY(Number(loadedPagePosition));
        object.setStart(object.horizontalMove());
      }
    });
  }

  //=======================

  function setMousemoveProperties() {
    mousemoveCreatedObjects.forEach((object, i) => {
      if(mousemoveNodeElements) {
        if(Number(mousemoveNodeElements[i].getAttribute("data-speed")) >= 0) {
          object.setSpeed(Number(mousemoveNodeElements[i].getAttribute("data-speed")));
        } else {
          object.setSpeed(-Number(mousemoveNodeElements[i].getAttribute("data-speed")));
        }
        object.setY(Number(loadedPagePosition));
      }
    });
  }

  //=======================

    setVerticalProperties();

    verticalNodeElements.forEach((element, i) => {
      element.style.transform = "translateY(" + verticalCreatedObjects[i].start + "px)"; //changing position
    });

    setHorizontalProperties();

    horizontalNodeElements.forEach((element, i) => {
      element.style.transform = "translateX(" + horizontalCreatedObjects[i].start + "px)"; //changing position
    });

    setMousemoveProperties();

  //=======================

  //Scrolling actions | Affects Vertical and Horizontal parallax

  window.onscroll = () => {
    let currentPagePosition = setPagePosition(); //dynamic value

    verticalCreatedObjects.forEach((object) => {
      object.setY(Number(currentPagePosition));
    });

    horizontalCreatedObjects.forEach((object) => {
      object.setY(Number(currentPagePosition));
    });

      if(verticalNodeElements) {
        verticalNodeElements.forEach((element, i) => {
          element.style.transform = "translateY(" + verticalCreatedObjects[i].verticalMove() + "px)"; //changing position
        });
      }

      if(horizontalNodeElements) {
        horizontalNodeElements.forEach((element, i) => {
          element.style.transform = "translateX(" + horizontalCreatedObjects[i].horizontalMove() + "px)"; //changing position
        });
      }
  }

  //Mousemove actions | Affects Mousemove parallax

  document.onmousemove = (e) => {
    let mouseXPosition = e.clientX; //getting cursor X position
    let mouseYPosition = e.clientY; //getting cursor Y position

    mousemoveNodeElements.forEach((element, i) => {
      const isSpeedPositive = Number(element.getAttribute("data-speed")) >= 0;

      const toBottomRight = mouseXPosition > window.innerWidth / 2 && mouseYPosition > window.innerHeight / 2;
      const toBottomLeft = mouseXPosition < window.innerWidth / 2 && mouseYPosition > window.innerHeight / 2;
      const toTopRight = mouseXPosition > window.innerWidth / 2 && mouseYPosition < window.innerHeight / 2;
      const toTopLeft = mouseXPosition < window.innerWidth / 2 && mouseYPosition < window.innerHeight / 2;

      if(toBottomRight) { //cursor moving to the bottom right
        if(isSpeedPositive) {
          element.style.transform = "translate3d(-" + mousemoveCreatedObjects[i].move()  + "%, -" + mousemoveCreatedObjects[i].move() + "%, 0)"; //changing position
        } else {
          element.style.transform = "translate3d(" + mousemoveCreatedObjects[i].move()  + "%, " + mousemoveCreatedObjects[i].move() + "%, 0)"; //changing position
        }
      } else if(toBottomLeft) { //cursor moving to the bottom left
        if(isSpeedPositive) {
          element.style.transform = "translate3d(" + mousemoveCreatedObjects[i].move()  + "%, -" + mousemoveCreatedObjects[i].move() + "%, 0)"; //changing position
        } else {
          element.style.transform = "translate3d(-" + mousemoveCreatedObjects[i].move()  + "%, " + mousemoveCreatedObjects[i].move() + "%, 0)"; //changing position
        }
      } else if(toTopRight) { //cursor moving to the top right
        if(isSpeedPositive) {
          element.style.transform = "translate3d(-" + mousemoveCreatedObjects[i].move()  + "%, " + mousemoveCreatedObjects[i].move() + "%, 0)"; //changing position
        } else {
          element.style.transform = "translate3d(" + mousemoveCreatedObjects[i].move()  + "%, -" + mousemoveCreatedObjects[i].move() + "%, 0)"; //changing position
        }
      } else if(toTopLeft) { //cursor moving to the top left
        if(isSpeedPositive) {
          element.style.transform = "translate3d(" + mousemoveCreatedObjects[i].move()  + "%, " + mousemoveCreatedObjects[i].move() + "%, 0)"; //changing position
        } else {
          element.style.transform = "translate3d(-" + mousemoveCreatedObjects[i].move()  + "%, -" + mousemoveCreatedObjects[i].move() + "%, 0)"; //changing position
        }
      } else {
        element.style.transform = "translate3d(0, 0, 0)"; //cursor on the cross lines (on the central vertical line of the screen, or on the central horizontal line of the screen, or in the center of the screen)
      }
    });
  }
}
