const { add, subtract, multiply, divide, modulo, power, squareRoot, main } = require("../calculator");

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

describe("modulo", () => {
  test("5 % 2 = 1", () => expect(modulo(5, 2)).toBe(1));
  test("evenly divisible numbers give 0", () => expect(modulo(10, 5)).toBe(0));
  test("keeps the sign of the dividend", () => expect(modulo(-7, 3)).toBe(-1));
  test("modulo by zero throws", () => {
    expect(() => modulo(5, 0)).toThrow("Modulo by zero is not allowed");
  });
});

describe("power", () => {
  test("2 ^ 3 = 8", () => expect(power(2, 3)).toBe(8));
  test("anything to the power of 0 is 1", () => expect(power(9, 0)).toBe(1));
  test("negative exponents give fractions", () => expect(power(2, -2)).toBe(0.25));
  test("fractional exponents give roots", () => expect(power(27, 1 / 3)).toBeCloseTo(3));
});

describe("squareRoot", () => {
  test("√16 = 4", () => expect(squareRoot(16)).toBe(4));
  test("√0 = 0", () => expect(squareRoot(0)).toBe(0));
  test("non-perfect squares", () => expect(squareRoot(2)).toBeCloseTo(1.41421356));
  test("square root of a negative number throws", () => {
    expect(() => squareRoot(-4)).toThrow("Cannot calculate the square root of a negative number");
  });
});

describe("CLI", () => {
  let log, error;
  beforeEach(() => {
    log = jest.spyOn(console, "log").mockImplementation(() => {});
    error = jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => jest.restoreAllMocks());

  test("prints the result of an operation", () => {
    expect(main(["power", "2", "3"])).toBe(0);
    expect(log).toHaveBeenCalledWith(8);
  });
  test("supports single-argument operations", () => {
    expect(main(["squareRoot", "16"])).toBe(0);
    expect(log).toHaveBeenCalledWith(4);
  });
  test("rejects unknown operations", () => {
    expect(main(["unknown", "1", "2"])).toBe(1);
    expect(error).toHaveBeenCalled();
  });
  test("rejects non-numeric arguments", () => expect(main(["add", "x", "2"])).toBe(1));
  test("reports errors such as division by zero", () => {
    expect(main(["divide", "1", "0"])).toBe(1);
    expect(error).toHaveBeenCalledWith("Error: Division by zero is not allowed");
  });
});
