/*
  Execution Script
*/

//=======================

window.onload = () => {
  //Finding the parallax elements in DOM
  const parallaxNodeElements = document.querySelectorAll(".purejs-parallax");
  const verticalNodeElements = Array.from(parallaxNodeElements).filter(element => (element.classList.contains("purejs-vertical") && element.offsetHeight > 0)); //separating vertical parallax elements in DOM
  const horizontalNodeElements = Array.from(parallaxNodeElements).filter(element => (element.classList.contains("purejs-horizontal") && element.offsetHeight > 0)); //separating horizontal parallax elements in DOM
  const mousemoveNodeElements = Array.from(parallaxNodeElements).filter(element => (element.classList.contains("purejs-mousemove") && element.offsetHeight > 0)); //separating mousemove parallax elements in DOM

  //=======================

  function setPagePosition() {
    const offset = window.pageYOffset;
    return offset;
  }

  const loadedPagePosition = setPagePosition();

  //=======================

  function setElementViewport(object, nodeElements, index) {
    object.setTop(Math.abs(nodeElements[index].getBoundingClientRect().top + pageYOffset));
    object.setBottom(Math.abs(nodeElements[index].getBoundingClientRect().top + pageYOffset + nodeElements[index].innerHeight));
  }

  //=======================

  const WINDOW_HEIGHT = window.innerHeight;
  const WINDOW_DIVIDER = 2;
  function checkViewport(object, height) {
    const isImageBelow = object.top >= window.pageYOffset;
    const isImageAbove = object.top < window.pageYOffset;
    const isImageInViewport = object.top - window.pageYOffset <= height / WINDOW_DIVIDER;

    if(isImageBelow && isImageInViewport) {
      return true;
    } else {
      if(isImageAbove) {
        return true;
      } else {
        return false;
      }
    }
  }

  //=======================

  const verticalCreatedObjects = verticalNodeElements ? createVerticalObjects(verticalNodeElements) : [];

  function createVerticalObjects(elements) {
    const array = [];
    elements.forEach((element) => {
      const object = new Vertical(0, 0, loadedPagePosition, 0, 0);
      array.push(object);
    });

    return array;
  }

  const horizontalCreatedObjects = horizontalNodeElements ? createHorizontalObjects(horizontalNodeElements) : [];

  function createHorizontalObjects(elements) {
    const array = [];
    elements.forEach((element) => {
      const object = new Horizontal(0, 0, loadedPagePosition, 0, 0);
      array.push(object);
    });

    return array;
  }

  let mousemoveCreatedObjects = mousemoveNodeElements ? createMousemoveObjects(mousemoveNodeElements) : [];

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

        setTimeout(() => {
          setElementViewport(object, verticalNodeElements, i);
        }, 800)
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

        setTimeout(() => {
          setElementViewport(object, horizontalNodeElements, i);
        }, 800)
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

  setHorizontalProperties();

  verticalNodeElements.forEach((element, i) => {
    element.style.transform = "translateY(" + verticalCreatedObjects[i].start + "px)"; //changing position
  });

  horizontalNodeElements.forEach((element, i) => {
    element.style.transform = "translateX(" + horizontalCreatedObjects[i].start + "px)"; //changing position
  });

  /*----------------*/

  setMousemoveProperties();

  //=======================

  //Scrolling actions | Affect Vertical and Horizontal parallax

  function scrollPage() {
    let currentPagePosition = setPagePosition();

    function changeImagePosition(object) {
      if(checkViewport(object, WINDOW_HEIGHT)) {
        if(object.top > WINDOW_HEIGHT) {
          object.setY(Math.abs(object.top - WINDOW_HEIGHT / WINDOW_DIVIDER - Number(currentPagePosition)));
        } else {
          object.setY(Number(currentPagePosition));
        }
      } else {
        object.setY(0);
      }
    }

    verticalCreatedObjects.forEach((object, i) => {
      changeImagePosition(object);
    });

    horizontalCreatedObjects.forEach((object) => {
      changeImagePosition(object);
    });

    if(verticalNodeElements) {
      verticalNodeElements.forEach((element, i) => {
        if(checkViewport(verticalCreatedObjects[i], WINDOW_HEIGHT)) {
          element.style.transform = "translateY(" + verticalCreatedObjects[i].verticalMove() + "px)"; //changing position
        }
      });
    }

    if(horizontalNodeElements) {
      horizontalNodeElements.forEach((element, i) => {
        if(checkViewport(horizontalCreatedObjects[i], WINDOW_HEIGHT)) {
          element.style.transform = "translateX(" + horizontalCreatedObjects[i].horizontalMove() + "px)"; //changing position
        }
      });
    }
  }

  /*--------------------*/

  setTimeout(() => {
    requestAnimationFrame(scrollPage);

    let scrollTicking = false;
    window.onscroll = (e) => {
      if(!scrollTicking) {
          scrollTicking = false;
      }
      scrollTicking = true;

      requestAnimationFrame(scrollPage);
    }
  }, 1000)

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
