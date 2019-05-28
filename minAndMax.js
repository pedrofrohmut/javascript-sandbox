// Functions to calculate the Minimun value and the Maximun value from an array

// Get Min
const getMin = (arr) => 
  arr.reduce((acc, curr) => acc = curr > acc ? acc : curr, arr[0]);

// Get Max
const getMax = (arr) =>
  arr.reduce((acc, curr) => acc = curr > acc ? curr : acc, arr[0]);

// ### TESTS ###

const arr1 = [1, 354, 234, 23, 1235, 3, 24, 2, 45, 34, 101];

if (getMin(arr1) !== 1) {
  throw new Error("Get Min from", arr1, "not working the right way.");
}

if (getMax(arr1) !== 1235) {
  throw new Error("Get Max from", arr1, "not working the right way.");
}

const arr2 = [
  13, 58, 48, 31, 68, 89,  1, 58, 45, 14, 64, 38, 89,  7, 20,  1, 87, 96, 76,
  50, 97, 32,  3,  3, 55, 55, 65, 18, 99, 66, 55, 55, 75, 30, 95,  4, 11, 33,
  63, 56, 27, 88, 95, 20, 70, 58, 89, 95, 81, 32, 38, 85,  9, 63, 42, 28, 23, 
  87, 45, 21, 93, 91, 57, 51, 80, 89, 37, 77, 10, 49, 52, 68,  5, 52, 95, 85, 
  42, 12, 92, 87, 77, 26, 99, 84, 63, 21, 45, 83, 94, 53, 82, 41, 44, 26, 76, 
  81, 43, 43
]


if (getMin(arr2) !== 1) {
  throw new Error("Get Min from", arr1, "not working the right way.");
}

if (getMax(arr2) !== 99) {
  throw new Error("Get Max from", arr1, "not working the right way.");
}


console.log("Everything is fine here Sir.");
