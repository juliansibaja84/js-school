/**
 * Order a Numeric Array and prints it to the console
 */
const orderNumbers = function (array) {
    console.log(`Unordered Array: [${array}]`);
    console.log(`Ordered Array: [${array.sort((a, b) => a-b)}]`);
};

/**
 * Callback function, it gets the array parameter from the html
 */
const arrayFunctionCaller = function () {
    let array = document.getElementById('array').value.split(';');
    if (array == '') {
        array = [1, 7, 0, 34, 23, 5, 2];
    } else {
        array.forEach((item, i, A) => A[i] = Number(item));
    }
    orderNumbers(array);
}


// orderNumbers([1, 7, 0, 34, 23, 5, 2]);







