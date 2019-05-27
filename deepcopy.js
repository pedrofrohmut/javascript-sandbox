/*
 *  This is my sandbox for deepcopy of reference type variables
 */

// The Function that tells if an variables is of a primitive type of a 
// reference type.
const isPrimitive = (val) => val !== Object(val);

const deepCopy = (obj) => {
  // Primitive data doesnt pass through reference so you can just return the value
  if (isPrimitive(obj)) {
    return obj;
  } 

  // RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }

  // Arrays
  if (Array.isArray(obj)) {
    return obj.map( value => deepCopy(value) );
  }

  // Objects
  const copy = Object.assign({}, obj);
  const entries = Object.entries(copy);

  // TODO: change this 4 lines to use Array.reduce() 
  // Object.fromEntries() doesnt work on nodejs
  const mappedEntries = entries.map( ([key, value]) => [key, deepCopy(value)] );
  const map = new Map(mappedEntries);
  const result = Object.fromEntries(map);
  return result;
}

//### TESTS ###

// Number
if (isPrimitive(123) !== true) {
  throw new Error("Number isPrimitive should return true");
}
// String
if (isPrimitive("foo") !== true) {
  throw new Error("String isPrimitive should return true");
}
// Undefined
if (isPrimitive(undefined) !== true) {
  throw new Error("Undefined isPrimitive should return true");
}
// Null
if (isPrimitive(null) !== true) {
  throw new Error("Null isPrimitive should return true");
}
// Boolean
if (isPrimitive(true) !== true) {
  throw new Error("Boolean isPrimitive should return true");
}
// Symbol
if (isPrimitive(Symbol('foo')) !== true) {
  throw new Error("Symbol isPrimitive should return true");
}

//##############################################################################

// Array
if (isPrimitive([1,2,3]) === true) {
  throw new Error("Array should return false.");
}

// Object
if (isPrimitive({ val: 'foo' }) === true) {
  throw new Error("Object should return false.");
}

// Date
if (isPrimitive(new Date()) === true) {
  throw new Error("Date should return false.");
}

// Regular Expression
if (isPrimitive(/hello/) === true) {
  throw new Error("RegExp should return false.");
}

//##############################################################################

// Number
if (1 !== deepCopy(1)) {
  throw new Error("Not coping primitive number the right way.");
}

// String
if ("foo" !== deepCopy("foo")) {
  throw new Error("Not coping strings the right way.");
}

// Undefined
if (undefined !== deepCopy(undefined)) {
  throw new Error("Not coping undefined the right way.");
}

// Null
if (null !== deepCopy(null)) {
  throw new Error("Not coping null the right way.");
}

// Boolean
if (false !== deepCopy(false)) {
  throw new Error("Not coping Boolean the right way.");
}

// Symbol
const symbol1 = Symbol('foo');
if (symbol1 !== deepCopy(symbol1)) {
  throw new Error("Not coping Symbol the right way.");
}

//##############################################################################

const arr1 = [1, 2, 3];
if (arr1 === deepCopy(arr1)) {
  throw new Error("Not cloning simples Arrays the right way.");
}

const foo = { name: "John", age: 30 };
if (foo === deepCopy(foo)) {
  throw new Error("Not cloning simples Objects the right way.");
}

const regex1 = /hello/gi;
if (regex1 === deepCopy(regex1)) {
  throw new Error("Not cloning RegExp the right way.");
}

const objArrs = {
  arr1: [1, 2, 3],
  arr2: ['a', 'b', 'c']
};
const objArrsCopy = deepCopy(objArrs);
if (objArrs.arr1 === objArrsCopy.arr1) {
  throw new Error("Not copying arrays inside objects the right way.");
}

// TODOISH: make more complicated tests

//##############################################################################

console.log("Every thing is all right Sir.");
