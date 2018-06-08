/**
 * Reverses an Array and prints it to the console.
 */
const reverseArray = function (array) { 
    console.log(`Inserted items: ${array}`);
    console.log(`Reversed items: ${[...array].reverse()}`);
};

/**
 * Callback function, it gets the array parameter from the html
 */
const reverseFunctionCaller = function(){
    let array = document.getElementById('reverse').value.split(';');
    if (array == '') {
        array = ['school', 'js', 'the', 'is', 'this'];
    }
    reverseArray(array);
}

// reverseArray(['school', 'js', 'the', 'is', 'this']);