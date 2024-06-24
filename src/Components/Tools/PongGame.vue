<template>
  <div>
    <div>
    <p>Use <-- Arrows --> !</p>
    </div>
    <div class="game-container">
  <div class="game1">
    <canvas ref="gameCanvas"></canvas>
    <div v-if="isGameOver" class="game-over-container">
      <h1>{{ winner }} Wins!</h1>
      <button @click="startGame">Play Again</button>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: 500,
      height: 500,
      paddleHeight: 10,
      paddleWidth: 50,
      paddleDiff: 25,
      paddleBottomX: 225,
      paddleTopX: 225,
      playerMoved: false,
      paddleContact: false,
      ballX: 250,
      ballY: 350,
      ballRadius: 5,
      speedY: -1,
      speedX: -1,
      trajectoryX: 0,
      computerSpeed: 3,
      playerScore: 0,
      computerScore: 0,
      winningScore: 7,
      isGameOver: true,
      isNewGame: true,
      canvasPosition: 0,
      screenWidth: window.screen.width,
      isMobile: window.matchMedia("(max-width: 600px)").matches,
      winner: '',
      keysPressed: {},
      animationFrameId: null
    };
  },
  methods: {
    /**
     * Create and initialize the canvas.
     */
    createCanvas() {
      const canvas = this.$refs.gameCanvas;
      canvas.width = this.width;
      canvas.height = this.height;
      this.canvasPosition = this.screenWidth / 2 - this.width / 2;
      this.renderCanvas();
    },
    /**
     * Render the game canvas.
     */
    renderCanvas() {
      const canvas = this.$refs.gameCanvas;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      // Canvas Background
      context.fillStyle = "gray";
      context.fillRect(0, 0, this.width, this.height);
      // Paddle Color
      context.fillStyle = "white";
      // Player Paddle (Bottom)
      context.fillRect(this.paddleBottomX, this.height - 20, this.paddleWidth, this.paddleHeight);
      // Computer Paddle (Top)
      context.fillRect(this.paddleTopX, 10, this.paddleWidth, this.paddleHeight);
      // Dashed Center Line
      context.beginPath();
      context.setLineDash([4]);
      context.moveTo(0, 350);
      context.lineTo(500, 350);
      context.strokeStyle = "grey";
      context.stroke();
      // Ball
      context.beginPath();
      context.arc(this.ballX, this.ballY, this.ballRadius, 2 * Math.PI, false);
      context.fillStyle = "white";
      context.fill();
      // Score
      context.font = "32px Courier New";
      context.fillText(this.playerScore, 20, canvas.height / 2 + 50);
      context.fillText(this.computerScore, 20, canvas.height / 2 - 30);
    },
    /**
     * Reset the ball position and speed.
     */
    ballReset() {
      this.ballX = this.width / 2;
      this.ballY = this.height / 2;
      this.speedY = -3;
      this.paddleContact = false;
    },
    /**
     * Move the ball based on its speed.
     */
    ballMove() {
      // Vertical Speed
      this.ballY += -this.speedY;
      // Horizontal Speed
      if (this.playerMoved && this.paddleContact) {
        this.ballX += this.speedX;
      }
    },
    /**
     * Handle the ball's interactions with the boundaries.
     */
    ballBoundaries() {
      // Bounce off Left Wall
      if (this.ballX < 0 && this.speedX < 0) {
        this.speedX = -this.speedX;
      }
      // Bounce off Right Wall
      if (this.ballX > this.width && this.speedX > 0) {
        this.speedX = -this.speedX;
      }
      // Bounce off player paddle (bottom)
      if (this.ballY > this.height - this.paddleDiff) {
        if (this.ballX > this.paddleBottomX && this.ballX < this.paddleBottomX + this.paddleWidth) {
          this.paddleContact = true;
          // Add Speed on Hit
          if (this.playerMoved) {
            this.speedY -= 1;
            // Max Speed
            if (this.speedY < -5) {
              this.speedY = -5;
              this.computerSpeed = 6;
            }
          }
          this.speedY = -this.speedY;
          this.trajectoryX = this.ballX - (this.paddleBottomX + this.paddleDiff);
          this.speedX = this.trajectoryX * 0.3;
        } else if (this.ballY > this.height) {
          // Reset Ball, add to Computer Score
          this.ballReset();
          this.computerScore++;
        }
      }
      // Bounce off computer paddle (top)
      if (this.ballY < this.paddleDiff) {
        if (this.ballX > this.paddleTopX && this.ballX < this.paddleTopX + this.paddleWidth) {
          // Add Speed on Hit
          if (this.playerMoved) {
            this.speedY += 1;
            // Max Speed
            if (this.speedY > 5) {
              this.speedY = 5;
            }
          }
          this.speedY = -this.speedY;
        } else if (this.ballY < 0) {
          // Reset Ball, add to Player Score
          this.ballReset();
          this.playerScore++;
        }
      }
    },
    /**
     * Control the computer's paddle movement.
     */
    computerAI() {
      if (this.playerMoved) {
        if (this.paddleTopX + this.paddleDiff < this.ballX) {
          this.paddleTopX += this.computerSpeed;
        } else {
          this.paddleTopX -= this.computerSpeed;
        }
      }
    },
    /**
     * Display the game over screen.
     * @param {string} winner - The winner of the game.
     */
    showGameOverEl(winner) {
      this.winner = winner;
      this.isGameOver = true;
    },
    /**
     * Check if the game is over and display the result.
     */
    gameOver() {
      if (this.playerScore === this.winningScore || this.computerScore === this.winningScore) {
        this.isGameOver = true;
        const winner = this.playerScore === this.winningScore ? "Player 1" : "Computer";
        this.showGameOverEl(winner);
      }
    },
    /**
     * Animate the game.
     */
    animate() {
      this.renderCanvas();
      this.ballMove();
      this.ballBoundaries();
      this.computerAI();
      this.gameOver();
      this.movePaddle();
      if (!this.isGameOver) {
        this.animationFrameId = window.requestAnimationFrame(this.animate);
      }
    },
    /**
     * Move the player's paddle based on key presses.
     */
    movePaddle() {
      if (this.keysPressed.ArrowLeft) {
        this.paddleBottomX -= 5;
        if (this.paddleBottomX < 0) {
          this.paddleBottomX = 0;
        }
      }
      if (this.keysPressed.ArrowRight) {
        this.paddleBottomX += 5;
        if (this.paddleBottomX > this.width - this.paddleWidth) {
          this.paddleBottomX = this.width - this.paddleWidth;
        }
      }
    },
    /**
     * Start a new game.
     */
    startGame() {
      if (this.isGameOver && !this.isNewGame) {
        this.$refs.gameCanvas.hidden = false;
      }
      this.isGameOver = false;
      this.isNewGame = false;
      this.playerScore = 0;
      this.computerScore = 0;
      this.ballReset();
      this.createCanvas();
      this.animate();
      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('keyup', this.handleKeyUp);
    },
    /**
     * Handle keydown events.
     * @param {KeyboardEvent} e - The keyboard event.
     */
    handleKeyDown(e) {
      this.playerMoved = true;
      this.keysPressed[e.key] = true;
    },
    /**
     * Handle keyup events.
     * @param {KeyboardEvent} e - The keyboard event.
     */
    handleKeyUp(e) {
      this.keysPressed[e.key] = false;
    }
  },
  mounted() {
    if (this.isMobile) {
      this.speedY = -2;
      this.speedX = this.speedY;
      this.computerSpeed = 4;
    }
    this.startGame();
  },
  beforeDestroy() {
    window.cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }
};
</script>

<style scoped>

/* Center paragraphs */
p {
  text-align: center;
  margin: 2rem;
}

/* Center the game container */
.game-container {
  display: flex;
  justify-content: center;
}

/* Style for the game canvas.  Ensure canvas is above other elements */
canvas {
  z-index: 10;
}

/* Style for the game over container. Position in the center of the screen. Fixed width and width. Dark background color.
 Adjust position. Above canvas. Text color.*/
.game-over-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  background-color: rgb(56, 56, 56);
  margin-top: -4px;
  z-index: 11;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: whitesmoke;
}

/* Style for buttons. Button text color. Button background color. Remove button border. Fixed height and width.
Rounded corners. Button text size. Font family. */
button {
  cursor: pointer;
  color: rgb(0, 0, 0);
  background-color: rgb(195, 195, 195);
  border: none;
  height: 50px;
  width: 200px;
  border-radius: 5px;
  font-size: 20px;
  font-family: "Courier New", Courier, monospace;
}

/* Button hover effect. Darken button on hover */
button:hover {
  filter: brightness(80%);
}

/* Button click effect. Scale down on click */
button:active {
  transform: scale(0.95);
}

/* Remove focus outline on buttons */
button:focus {
  outline: none;
}

/* Style for the game1 container. Bottom margin. Relative positioning. Fixed width and height. */
.game1{
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  position: relative;
  width: 500px;
  height: 500px;
}

/* Monitor and Larger. Adjust canvas margin on large screens */
@media screen and (min-width: 1800px) {
  canvas {
    margin-top: 40px;
  }
}

/* Large Smartphone (Vertical). Full width. Reduced height. Adjust canvas margin */
@media screen and (max-width: 500px) {
  canvas {
    width: 100%;
    height: 300px;
    margin-top: 50px;
  }

  /* Full width. Reduced height */
  .game-over-container {
    width: 100%;
    height: 200px;
  }
}
</style>