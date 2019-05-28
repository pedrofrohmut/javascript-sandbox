/*
 *  This is my sandbox for deepcopy of reference type variables
 */

// The Function that tells if an variables is of a primitive type of a 
// reference type.
const isPrimitive = (val) => val !== Object(val);

// Returns a real copy (also called deep copy) of the values passed
// The reason for doing this is beacuse javascript copying with spread operator
// copies only primitive data, other than this it copy the reference an not the
// object. Like arrays and objects you will hava the same reference so that you
// will at end not having a real copy.
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
  const objectCopy = Object.assign({}, obj);
  return newObjectFromEntries(Object.entries(objectCopy));
}

// There is no Object.fromEntries() for node
// this function is just for compatibility with backend javascript
const newObjectFromEntries = (entries) => (
  // entries pattern: [ [key, value], [key, value], ... ]
  entries.reduce(
    (acc, curr) =>  {
      const key = curr[0];
      const value = curr[1];
      // Accumulate the new key/value to the final object
      acc[key] = deepCopy(value);
      return acc;
    }, 
    {}
  )
);

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

const objObjs = { 
  obj1: { foo: "bar" }, 
  obj2: { name: "John", age: 30 }, 
  obj3: { name: "Sarah", address: { street: "3rd Street", state: "Sao Paulo" } } 
}
const objObjsCopy = deepCopy(objObjs)
if (objObjs === objObjsCopy) {
  throw new Error("Not copy simple objects the right way.");
}

if (objObjs.obj1 === objObjsCopy.obj1) {
  throw new Error("Not copy objects inside objects the right way.");
}

if (objObjs.obj2 === objObjsCopy.obj2) {
  throw new Error("Not copy objects inside objects the right way.");
}

if (objObjs.obj3 === objObjsCopy.obj3) {
  throw new Error("Not copy objects inside objects the right way.");
}

if (objObjs.obj3.address === objObjsCopy.obj3.address) {
  throw new Error("Not copy objects inside objects inside objects the right way.");
}

// TODOISH: make more complicated tests
//##############################################################################

console.log("Every thing is all right Sir.");
