<template>
  <div>

    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css"
    />

  <div class="paint-app">
    <div class="top-bar">
      <div class="active-tool">
        <span id="active-tool">{{ activeTool }}</span>
      </div>
      <div class="brush-tool">
        <div class="tool">
          <input type="color" v-model="brushColor" id="brush-color" />
        <i class="fas fa-brush" id="brush" @click="switchToBrush"></i>
        </div>
        <div class="tool">
        <span class="size">{{ formattedBrushSize }}</span>
        <input
            type="range"
            min="1"
            max="50"
            v-model="brushSize"
            class="slider"
            id="brush-slider"
        />
        </div>
        <div class="tool">
          <input type="color" v-model="bucketColor" id="bucket-color" @change="updateBucketColor" />
          <i class="fas fa-fill-drip"></i>
        </div>
      </div>
      <div class="tool">
        <i class="fas fa-eraser" id="eraser" @click="useEraser"></i>
      </div>
      <div class="tool">
        <i class="fas fa-undo-alt" id="clear-canvas" @click="clearCanvas"></i>
      </div>
      <div class="tool">
        <i class="fas fa-download" id="save-storage" @click="saveToLocalStorage"></i>
      </div>
      <div class="tool">
        <i class="fas fa-upload" id="load-storage" @click="loadFromLocalStorage"></i>
      </div>
      <div class="tool">
        <i class="fas fa-trash-alt" id="clear-storage" @click="clearLocalStorage"></i>
      </div>
      <div class="tool">
        <a id="download" @click="downloadImage">
          <i class="far fa-save"></i>
        </a>
      </div>
    </div>
    <canvas id="canvas" ref="canvas" @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing"></canvas>
  </div>
  </div>
</template>

<script>

/**
 * @fileoverview Paint app component using Vue.js.
 */

export default {
  data() {
    return {
      activeTool: "Brush",
      brushColor: "#070707",
      brushSize: 10,
      bucketColor: "#FFFFFF",
      isEraser: false,
      isMouseDown: false,
      drawnArray: [],
      context: null,
      currentColor: "#3b3b3b",
      currentSize: 10,
    };
  },
  computed: {
    /**
     * Formats the brush size for display.
     * @returns {string} Formatted brush size.
     */
    formattedBrushSize() {
      return this.brushSize < 10 ? `0${this.brushSize}` : this.brushSize;
    },
  },
  watch: {
    /**
     * Watches for changes in brushColor and updates currentColor.
     * @param {string} newColor - The new brush color.
     */
    brushColor(newColor) {
      if (!this.isEraser) {
        this.currentColor = newColor;
      }
    },
  },
  methods: {
    /**
     * Switches the active tool to the brush.
     */
    switchToBrush() {
      this.isEraser = false;
      this.activeTool = "Brush";
      this.currentColor = this.brushColor;
      this.currentSize = this.brushSize;
    },
    /**
     * Switches the active tool to the eraser.
     */
    useEraser() {
      this.isEraser = true;
      this.activeTool = "Eraser";
      this.currentColor = this.bucketColor;
      this.currentSize = 50;
    },
    /**
     * Clears the canvas.
     */
    clearCanvas() {
      this.context.fillStyle = this.bucketColor;
      this.context.fillRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
      this.drawnArray = [];
      this.activeTool = "Canvas Cleared";
      setTimeout(this.switchToBrush, 1500);
    },
    /**
     * Saves the current canvas to local storage.
     */
    saveToLocalStorage() {
      localStorage.setItem("savedCanvas", JSON.stringify(this.drawnArray));
      this.activeTool = "Canvas Saved";
      setTimeout(this.switchToBrush, 1500);
    },
    /**
     * Loads the saved canvas from local storage.
     */
    loadFromLocalStorage() {
      if (localStorage.getItem("savedCanvas")) {
        this.drawnArray = JSON.parse(localStorage.getItem("savedCanvas"));
        this.restoreCanvas();
        this.activeTool = "Canvas Loaded";
        setTimeout(this.switchToBrush, 1500);
      } else {
        this.activeTool = "No Canvas Found";
        setTimeout(this.switchToBrush, 1500);
      }
    },
    /**
     * Clears the saved canvas from local storage.
     */
    clearLocalStorage() {
      localStorage.removeItem("savedCanvas");
      this.activeTool = "Local Storage Cleared";
      setTimeout(this.switchToBrush, 1500);
    },
    /**
     * Downloads the current canvas as an image file.
     */
    downloadImage() {
      const link = document.createElement("a");
      link.href = this.$refs.canvas.toDataURL("image/jpeg", 1.0);
      link.download = "paint.jpeg";
      link.click();
      this.activeTool = "Image File Saved";
      setTimeout(this.switchToBrush, 1500);
    },
    /**
     * Updates the bucket color.
     */
    updateBucketColor() {
      this.bucketColor = this.bucketColor;
      this.createCanvas();
      this.restoreCanvas();
    },
    /**
     * Starts drawing on the canvas.
     * @param {MouseEvent} event - The mouse event.
     */
    startDrawing(event) {
      this.isMouseDown = true;
      const currentPosition = this.getMousePosition(event);
      this.context.moveTo(currentPosition.x, currentPosition.y);
      this.context.beginPath();
      this.context.lineWidth = this.currentSize;
      this.context.lineCap = "round";
      this.context.strokeStyle = this.currentColor;
    },
    /**
     * Draws on the canvas.
     * @param {MouseEvent} event - The mouse event.
     */
    draw(event) {
      if (!this.isMouseDown) return;
      const currentPosition = this.getMousePosition(event);
      this.context.lineTo(currentPosition.x, currentPosition.y);
      this.context.stroke();
      this.storeDrawn(currentPosition.x, currentPosition.y, this.currentSize, this.currentColor, this.isEraser);
    },
    /**
     * Stops drawing on the canvas.
     */
    stopDrawing() {
      this.isMouseDown = false;
    },
    /**
     * Stores the drawn line data.
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @param {number} size - The size of the line.
     * @param {string} color - The color of the line.
     * @param {boolean} erase - Whether the line is an eraser stroke.
     */
    storeDrawn(x, y, size, color, erase) {
      this.drawnArray.push({ x, y, size, color, erase });
    },
    /**
     * Gets the mouse position relative to the canvas.
     * @param {MouseEvent} event - The mouse event.
     * @returns {Object} The mouse position.
     */
    getMousePosition(event) {
      const boundaries = this.$refs.canvas.getBoundingClientRect();
      return {
        x: event.clientX - boundaries.left,
        y: event.clientY - boundaries.top,
      };
    },
    /**
     * Creates the canvas and sets up initial properties.
     */
    createCanvas() {
      const canvas = this.$refs.canvas;
      canvas.width = this.$el.clientWidth;
      canvas.height = this.$el.clientHeight - 50;
      this.context = canvas.getContext("2d");
      this.context.fillStyle = this.bucketColor;
      this.context.fillRect(0, 0, canvas.width, canvas.height);
      this.switchToBrush();
    },
    /**
     * Restores the canvas from stored data.
     */
    restoreCanvas() {
      for (let i = 1; i < this.drawnArray.length; i++) {
        this.context.beginPath();
        this.context.moveTo(this.drawnArray[i - 1].x, this.drawnArray[i - 1].y);
        this.context.lineWidth = this.drawnArray[i].size;
        this.context.lineCap = "round";
        this.context.strokeStyle = this.drawnArray[i].erase ? this.bucketColor : this.drawnArray[i].color;
        this.context.lineTo(this.drawnArray[i].x, this.drawnArray[i].y);
        this.context.stroke();
      }
    },
  },
  mounted() {
    this.createCanvas();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Oswald&display=swap");

/* Container for the paint application */
.paint-app {
  width: 100%;
  height: 70vh;
  margin: auto;
  position: relative;
}

/* Top bar containing tool options */
.top-bar {
  height: 50px;
  width: 100%;
  position: absolute;
  top: 0;
  background-color: #346660;
  display: flex;
  justify-content: center;
  font-size: small;
}

/* Icons for the tools */
.fas,
.far {
  font-size: 15px;
  background-color: rgb(82, 82, 82);
  color: white;
  padding: 5px;
  border-radius: 5px;
  width: 15px;
  text-align: center;
  cursor: pointer;
}

/* Hover effect for tool icons */
.fas:hover,
.far:hover {
  filter: brightness(90%);
}

/* Container for brush-related tools */
.brush-tool {
display: flex;
}

/* Individual tool icon container */
.tool {
  position: relative;
  top: 8px;
  padding: 1px;
}

/* Display of the active tool */
.active-tool {
  position: absolute;
  top: 9px;
  left: 5px;
}
.active-tool > span {
  background-color: rgb(82, 82, 82);
  border-radius: 5px;
  padding: 2.5px 16px;
  color: #bbc1bb;
  font-size: 20px;
  user-select: none;
}

/* Spacing between tools */
.tool:not(:first-child) {
  margin-left: 18px;
}

/* Brush container */
.brush {
  background-color: rgb(114, 114, 114);
  height: 44px;
  width: 345px;
}

/* Elements inside the brush container */
.brush > * {
  margin-left: 10px;
}

/* Display of brush size */
.size {
  min-width: 40px;
  height: 35px;
  position: relative;
  top: 4px;
  left: -5px;
  background-color: rgb(82, 82, 82);
  border-radius: 5px;
  padding: 2.5px 8px;
  color: white;
  font-size: 20px;
  user-select: none;
}

/* Slider for brush size */
.slider {
  -webkit-appearance: none;
  position: relative;
  left: -8px;
  width: 100px;
  height: 10px;
  background: rgb(177, 177, 177);
  outline: none;
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
  background: rgb(47, 47, 47);
}

.slider::-moz-range-thumb {
  width: 10px;
  height: 10px;
  background: rgb(47, 47, 47);
}

canvas#canvas {
  position: absolute;
  top: 50px;
  cursor: crosshair;
  z-index: 10;
}

@media screen and (max-width: 500px) {

  .top-bar {
height: fit-content;
    width: 100%;
    position: absolute;
    top: 0;
    background-color: #346660;
    display: flex;
    justify-content: center;
    font-size: small;
  }

  .fas,
  .far {
    font-size: 5px; /* Further reduce size for very small screens */
    padding: 1px; /* Adjust padding */
    width: 10px; /* Adjust width */
  }

  .active-tool > span {
    padding: 2px 10px; /* Adjust padding */
    font-size: 10px; /* Reduce font size */
  }

  .size {
    min-width: 20px; /* Adjust minimum width */
    height: 20px; /* Reduce height */

    font-size: 10px; /* Reduce font size */
  }

  .slider {
    width: 20px; /* Adjust width */
    height: 6px; /* Reduce height */
  }

  canvas#canvas {
    top: 30px; /* Further adjust canvas position */
  }

  #brush-color {
    width: 2rem;
    height: 1.5rem;
  }

  #bucket-color {
    width: 2rem;
    height: 1.5rem;
  }
}
</style>
