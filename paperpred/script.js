function myConcat(separator) {
    var result = ''; // initialize list
    // iterate through arguments
    for (let i = 1; i < arguments.length; i++)
        result += arguments[i] + separator;
    return result;
}
// returns "red, orange, blue, "
var result = myConcat(', ', 'red', 'orange', 'blue');
console.log(result);
// returns "elephant; giraffe; lion; cheetah; "
var result = myConcat('; ', 'elephant', 'giraffe', 'lion', 'cheetah');
console.log(result);
// returns "sage. basil. oregano. pepper. parsley. "
var result = myConcat('. ', 'sage', 'basil', 'oregano', 'pepper', 'parsley');
console.log(result);

myconcat = (separator, ...rest) => {
    console.log(rest.length);
    return rest.join(separator);
}

var res = myconcat(', ', 'red', 'orange', 'blue');

// console.log(myconcat(', ', 'red', 'orange', 'blue'));
console.log(typeof (res));


arr = [1, 2, 3, 4, 5];

arr.reduce((acc, item) => {
    return acc + item;
})

console.log(arr.reduce((acc, item) => {
    return acc + item;
}
, 0))

newArr = arr.map((item) => {
    return item * 4;
})

console.log(newArr);

const letters = new Set([
    "a", "b", "c", "d"
])

console.log(letters.has("d"))

letters.delete("a")

console.log(letters)

letters.forEach((item) => {
    console.log(item)
})

const restttt = new Promise((res) => {
    setTimeout(() => {
        console.log("Promise");
        res("Data");
    }, 1000);
});

restttt.then((res) => {
    console.log("Success:", res);
}).catch((err) => {
    console.log(err);
});

// import { name } from "./vars";

// console.log(name);