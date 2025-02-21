


function main() {
    let num1 = parseFloat(prompt('Enter the 1st number:'));
    let operator = prompt('Enter an operator (+ - * /):');
    let num2 = parseFloat(prompt('Enter the 2nd number:'));

    let result;

    if (operator === '+') {
        result = num1 + num2;
        console.log(result.toFixed(3));
    } else if (operator === '-') {
        result = num1 - num2;
        console.log(result.toFixed(3));
    } else if (operator === '*') {
        result = num1 * num2;
        console.log(result.toFixed(3));
    } else if (operator === '/') {
        result = num1 / num2;
        console.log(result.toFixed(3));
    } else {
        console.log(`${operator} is not a valid operator`);
    }
    

    if (confirm('Do you want to perform another calculation?')) {
        main();
    }
}

main();
