const imgUrls = ["./assets/dog.png", "./assets/cat.png"];

// Get state localstorage
var getState = localStorage.getItem("myState");

// Either create a new state or use a prexisting one from localstorage
const state = getState
  ? getState
  : () => {
      const myNewState = {
        images: [],
        canvas: null,
        canvasContext: null,
        mouseOffsetX: 0, // These are the mouse offsets based on the image
        mouseOffsetY: 0,
        canDrag: false,
        indexToDrag: -1, // set to -1 becuase we do not have a desired index to drag on inital load
      };
      localStorage.setItem("myState", myNewState);
      return myNewState;
    };

// Asynchronously create the new images and await the loading of the images before rendering
const loadImages = async (imageUrls) => {
  const images = [];
  for (let i = 0; i < imgUrls.length; i++) {
    try {
      const element = await loadImage(imageUrls[i]);
      images.push({
        element,
        data: {
          zindex: i,
          x: 0,
          y: 0,
          width: element.width,
          height: element.height,
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  }
  return images;
};

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.addEventListener("error", reject);
    image.src = src;
  });
};
const render = () => {
  const { canvas } = state;
  state.canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  drawImages();
};

const drawImages = () => {
  state.images.forEach((image) => {
    // Desctructure the variables so I dont have "state." everywhere
    // Can only use it on variables where I dont have to update the state
    const { canvasContext, canDrag, indexToDrag } = state;
    const imageRect = new Path2D();
    imageRect.rect(0, 0, image.data.width, image.data.height);
    // adding style and width to add later to the strokeRect if we can drag
    canvasContext.strokeStyle = "#007f0c"; // green border
    canvasContext.lineWidth = 2; // border width
    image.path = imageRect;
    canvasContext.drawImage(
      image.element,
      image.data.x,
      image.data.y,
      image.data.width,
      image.data.height
    );
    // We only want to apply border and when dragging (turns off on mouseup or mouseout)
    if (canDrag && image.data.zindex === indexToDrag) {
      canvasContext.strokeRect(
        image.data.x,
        image.data.y,
        image.data.width,
        image.data.height
      );
    }
  });
};

const adjustCanvasSize = () => {
  // Desctructure the variables so I dont have "state." everywhere
  // Can only use it on variables where I dont have to update the state
  const { innerWidth } = window;
  const { canvas } = state;
  canvas.width = innerWidth;
  canvas.height = Math.floor((innerWidth / 16) * 9);
};

const setInitialState = async () => {
  state.images = await loadImages(imgUrls);
  state.canvas = document.getElementById("canvas");
  state.canvasContext = state.canvas.getContext("2d");
};

window.addEventListener("load", async () => {
  //Whenever we resize the window update the  canvas size and rerender the images
  window.addEventListener("resize", () => {
    adjustCanvasSize();
    render();
  });

  //* Set the Inital State
  await setInitialState();
  adjustCanvasSize();
  render();

  // Desctructure the variables so I dont have "state." everywhere
  // Can only use it on variables where I dont have to update the state
  const { canvas, images } = state;
  canvas.onmousemove = (e) => {
    let {
      mouseX,
      mouseY,
      canDrag,
      indexToDrag,
      mouseOffsetX,
      mouseOffsetY,
    } = state;

    if (canDrag) {
      // Set the mouseX and mouseY witht he offset of the canvas incase it moves
      mouseX = e.pageX - canvas.offsetLeft;
      mouseY = e.pageY - canvas.offsetTop;
      images.forEach((image) => {
        // Only rerender images that have the indexToDrag (one at a time)
        if (image.data.zindex === indexToDrag) {
          // Set the image to the offset positon (based on where your mouse is)
          let imageXposition = mouseX - mouseOffsetX;
          let imageYposition = mouseY - mouseOffsetY;
          // Dont let the image go off the edges of the canvas
          if (
            imageYposition >= 0 &&
            imageYposition <= canvas.height - image.data.height &&
            imageXposition >= 0 &&
            imageXposition <= canvas.width - image.data.width
          ) {
            image.data.x = imageXposition;
            image.data.y = imageYposition;
            render();
          }
        }
      });
    }
  };
  canvas.onmouseup = (e) => {
    state.canDrag = false;
    //rerender the image to remove the border
    render();
  };
  canvas.onmouseout = (e) => {
    state.canDrag = false;
    //rerender the image to remove the border
    render();
  };
  canvas.onmousedown = (e) => {
    // Set the mouseX and mouseY witht he offset of the canvas incase it moves
    let mouseX = e.pageX - state.canvas.offsetLeft;
    let mouseY = e.pageY - state.canvas.offsetTop;

    // This loop will check and see if the mouse is over the image and
    // And more importantly update the "indexToDrag" so that it knows what image is on top
    images.forEach((image) => {
      if (
        mouseX >= image.data.x &&
        mouseX <= image.data.x + image.data.width &&
        mouseY >= image.data.y &&
        mouseY <= image.data.y + image.data.height
      ) {
        state.mouseOffsetX = mouseX - image.data.x;
        state.mouseOffsetY = mouseY - image.data.y;
        state.canDrag = true;
        state.indexToDrag = image.data.zindex;
      }
    });
  };
});
