const { add, subtract, multiply, divide } = require("../calculator");

describe("addition", () => {
  test("2 + 3 = 5", () => expect(add(2, 3)).toBe(5));
  test("handles negative numbers", () => expect(add(-2, -3)).toBe(-5));
  test("handles decimals", () => expect(add(0.1, 0.2)).toBeCloseTo(0.3));
  test("adding zero returns the same number", () => expect(add(7, 0)).toBe(7));
});

describe("subtraction", () => {
  test("10 - 4 = 6", () => expect(subtract(10, 4)).toBe(6));
  test("can produce a negative result", () => expect(subtract(4, 10)).toBe(-6));
  test("subtracting a negative number", () => expect(subtract(5, -5)).toBe(10));
});

describe("multiplication", () => {
  test("45 * 2 = 90", () => expect(multiply(45, 2)).toBe(90));
  test("multiplying by zero gives zero", () => expect(multiply(123, 0)).toBe(0));
  test("negative times positive is negative", () => expect(multiply(-3, 4)).toBe(-12));
  test("negative times negative is positive", () => expect(multiply(-3, -4)).toBe(12));
});

describe("division", () => {
  test("20 / 5 = 4", () => expect(divide(20, 5)).toBe(4));
  test("returns decimals", () => expect(divide(7, 2)).toBe(3.5));
  test("zero divided by a number is zero", () => expect(divide(0, 5)).toBe(0));
  test("division by zero throws", () => {
    expect(() => divide(10, 0)).toThrow("Division by zero is not allowed");
  });
});
