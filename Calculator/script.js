document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const number = this.getAttribute('data-number');
            const operatorClicked = this.getAttribute('data-operator');

            if (number !== null) {
                currentInput += number;
                display.textContent = currentInput;
            } else if (operatorClicked !== null) {
                if (currentInput === '') return;

                if (previousInput !== '') {
                    calculate();
                } else {
                    previousInput = currentInput;
                    currentInput = '';
                }

                operator = operatorClicked;
                display.textContent = previousInput + ' ' + operator;
            } else if (this.id === 'equals') {
                if (currentInput === '' || previousInput === '') return;
                calculate();
                display.textContent = previousInput;
                currentInput = '';
            } else if (this.id === 'clear') {
                currentInput = '';
                previousInput = '';
                operator = '';
                display.textContent = '';
            } else if (this.id === 'backspace') {
                currentInput = currentInput.slice(0, -1);
                display.textContent = currentInput;
            }
        });
    });

    function calculate() {
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(curr)) return;

        let result = 0;

        switch (operator) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '×':
                result = prev * curr;
                break;
            case '÷':
                result = prev / curr;
                break;
            default:
                return;
        }

        previousInput = result.toString();
        operator = '';
        currentInput = '';
    }
});
