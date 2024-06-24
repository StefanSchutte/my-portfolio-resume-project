<template>
  <div class="calc">
  <div class="calculator">
    <!-- Display -->
    <div class="calculator-display">
      <h1>{{ calculatorDisplay }}</h1>
    </div>

    <!-- Buttons -->
    <div class="calculator-buttons">
      <button v-for="button in buttons"
              :key="button.value"
              :class="button.class"
              @click="handleClick(button)">
        {{ button.label }}
      </button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      calculatorDisplay: '0',
      firstValue: null,
      operatorValue: '',
      awaitingNextValue: false,
      buttons: [
        { label: '+', value: '+', class: 'operator' },
        { label: '-', value: '-', class: 'operator' },
        { label: '×', value: '*', class: 'operator' },
        { label: '÷', value: '/', class: 'operator' },
        { label: '7', value: '7', class: '' },
        { label: '8', value: '8', class: '' },
        { label: '9', value: '9', class: '' },
        { label: '4', value: '4', class: '' },
        { label: '5', value: '5', class: '' },
        { label: '6', value: '6', class: '' },
        { label: '1', value: '1', class: '' },
        { label: '2', value: '2', class: '' },
        { label: '3', value: '3', class: '' },
        { label: '.', value: '.', class: 'decimal' },
        { label: '0', value: '0', class: '' },
        { label: 'C', value: 'C', class: 'clear', id: 'clear-btn' },
        { label: '=', value: '=', class: 'equal-sign operator' },
      ],
      calculate: {
        '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
        '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
        '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
        '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
        '=': (firstNumber, secondNumber) => secondNumber,
      },
    };
  },
  methods: {
    handleClick(button) {
      if (button.class.includes('operator')) {
        this.useOperator(button.value);
      } else if (button.class.includes('decimal')) {
        this.addDecimal();
      } else if (button.class.includes('clear')) {
        this.resetAll();
      } else {
        this.sendNumberValue(button.value);
      }
    },
    sendNumberValue(number) {
      if (this.awaitingNextValue) {
        this.calculatorDisplay = number;
        this.awaitingNextValue = false;
      } else {
        this.calculatorDisplay = this.calculatorDisplay === '0' ? number : this.calculatorDisplay + number;
      }
    },
    addDecimal() {
      if (this.awaitingNextValue) return;
      if (!this.calculatorDisplay.includes('.')) {
        this.calculatorDisplay += '.';
      }
    },
    useOperator(operator) {
      const currentValue = parseFloat(this.calculatorDisplay);
      if (this.operatorValue && this.awaitingNextValue) {
        this.operatorValue = operator;
        return;
      }
      if (this.firstValue == null) {
        this.firstValue = currentValue;
      } else {
        const calculation = this.calculate[this.operatorValue](this.firstValue, currentValue);
        this.calculatorDisplay = String(calculation);
        this.firstValue = calculation;
      }
      this.awaitingNextValue = true;
      this.operatorValue = operator;
    },
    resetAll() {
      this.firstValue = null;
      this.operatorValue = '';
      this.awaitingNextValue = false;
      this.calculatorDisplay = '0';
    },
  },
};
</script>

<style scoped>

.calc {
display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
}


.calculator {
  background: white;
  width: 400px;
  border-radius: 12px;
  box-shadow: 0 5px 30px -5px rgba(0, 0, 0, 0.6);
}

.calculator-display {
  background: #1b1a1a;
  color: white;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 10px 10px 0 0;

}

.calculator-display h1 {
  margin: 0;
  padding: 25px;
  font-size: 45px;
  font-family: "Lucida Console", sans-serif;
  font-weight: 100;
  overflow-x: auto;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.calculator-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  padding: 10px;
}

button {
  min-height: 50px;
  font-size: 20px;
  font-weight: 100;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: rgb(115, 109, 109);
}

button:hover {
  filter: brightness(150%);
}

button:active {
  transform: translateY(1px);
}

button:focus {
  outline: none;
}

.operator {
  background: rgb(64, 64, 64);
  color: white;
  font-size: 35px;
}

.clear {
  background: rgb(214, 15, 15);
  color: white;
}

.clear:hover {
  filter: brightness(60%);
}

.equal-sign {
  grid-column: -2;
  grid-row: 2 / span 4;
  background: rgb(21, 153, 21);
}

@media screen and (max-width: 600px) {
  .calculator {
    width: 95%;
  }
}
</style>