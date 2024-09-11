import Float "mo:base/Float";

actor Calculator {
  // Query function to add two numbers
  public query func add(x : Float, y : Float) : async Float {
    x + y
  };

  // Query function to subtract two numbers
  public query func subtract(x : Float, y : Float) : async Float {
    x - y
  };

  // Query function to multiply two numbers
  public query func multiply(x : Float, y : Float) : async Float {
    x * y
  };

  // Query function to divide two numbers
  public query func divide(x : Float, y : Float) : async ?Float {
    if (y == 0) {
      null // Return null for division by zero
    } else {
      ?(x / y)
    }
  };
}