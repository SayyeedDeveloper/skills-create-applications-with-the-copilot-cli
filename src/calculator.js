#!/usr/bin/env node
/**
 * Node.js CLI calculator.
 *
 * Supported operations:
 *   - addition       (add)       e.g. 2 + 3  = 5
 *   - subtraction    (subtract)  e.g. 10 - 4 = 6
 *   - multiplication (multiply)  e.g. 45 * 2 = 90
 *   - division       (divide)    e.g. 20 / 5 = 4
 *
 * Usage: node src/calculator.js <operation> <a> <b>
 *   node src/calculator.js add 2 3
 */

// addition: returns the sum of a and b
function add(a, b) {
  return a + b;
}

// subtraction: returns a minus b
function subtract(a, b) {
  return a - b;
}

// multiplication: returns the product of a and b
function multiply(a, b) {
  return a * b;
}

// division: returns a divided by b, throws on division by zero
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}

const operations = { add, subtract, multiply, divide };

// CLI entry point: parse the operation and numbers from the command line
function main(argv) {
  const [operation, ...rawArgs] = argv;
  const fn = operations[operation];
  if (!fn) {
    console.error(`Usage: node src/calculator.js <${Object.keys(operations).join("|")}> <a> <b>`);
    return 1;
  }
  const args = rawArgs.map(Number);
  if (args.length !== fn.length || args.some(Number.isNaN)) {
    console.error(`"${operation}" expects ${fn.length} numeric argument(s)`);
    return 1;
  }
  try {
    console.log(fn(...args));
    return 0;
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return 1;
  }
}

if (require.main === module) {
  process.exitCode = main(process.argv.slice(2));
}

module.exports = { ...operations, main };
