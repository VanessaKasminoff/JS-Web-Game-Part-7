function move(element) {
  element.style.position = "fixed";

  function moveToCoordinates(left, bottom) {
    element.style.left = left + "px";
    element.style.bottom = bottom + "px";
  }

  function moveWithArrowKeys(left, bottom, callback) {
    let direction = null;
    let x = left;
    let y = bottom;

    element.style.left = x + "px";
    element.style.bottom = y + "px";

    function moveCharacter() {
      if (direction === "west") {
        x--;
      }
      if (direction === "north") {
        y++;
      }
      if (direction === "east") {
        x++;
      }
      if (direction === "south") {
        y--;
      }
      element.style.left = x + "px";
      element.style.bottom = y + "px";
    }

    setInterval(moveCharacter, 1);

    // Declare an array for the pressed keys
    let pressedKeys = [];

    // Adds the pressed key(s) to the array
    document.addEventListener("keydown", function (e) {
      if (e.repeat || pressedKeys.includes(e.key)) return;
      pressedKeys.push(e.key);
      updateDirection(); // Invokes the updateDirection function to determine direction of keys pressed.
    });

    document.addEventListener("keyup", function (e) {
      let index = pressedKeys.indexOf(e.key); // Finds the index of the released key in the array and stores it in the variable named index. If the released key is not in the array, it will return the value -1.
      if (index !== -1) { // logic checks if the released key is in the array by checking index.
        pressedKeys.splice(index, 1); // Removes the released key from the array
        updateDirection();  // Invokes the updateDirection function to determine direction of keys still pressed
      }
    });

    function updateDirection() {
      direction = null;
      if (pressedKeys.includes("ArrowLeft") || pressedKeys.includes("a")) {
        direction = "west";
      }
      if (pressedKeys.includes("ArrowUp") || pressedKeys.includes("w")) {
        direction = "north";
      }
      if (pressedKeys.includes("ArrowRight") || pressedKeys.includes("d")) {
        direction = "east";
      }
      if (pressedKeys.includes("ArrowDown") || pressedKeys.includes("s")) {
        direction = "south";
      }
      callback(direction);
    }
  }

  return {
    to: moveToCoordinates,
    withArrowKeys: moveWithArrowKeys,
  };
}
