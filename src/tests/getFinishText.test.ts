import getFinishText from "../helpers/getFinishText"; // Update the path accordingly

// Test case for the "Finish!" scenario
test("Finish scenario", () => {
  const result = getFinishText("UserA", "", 5, 8);
  expect(result).toBe("Finish!");
});

// Test case for the "Win!" scenario where UserA wins
test("UserA wins scenario", () => {
  const result = getFinishText("UserA", "UserB", 8, 5);
  expect(result).toBe("UserA Win!");
});

// Test case for the "Win!" scenario where UserB wins
test("UserB wins scenario", () => {
  const result = getFinishText("UserA", "UserB", 5, 8);
  expect(result).toBe("UserB Win!");
});

// Test case for the "Tie!" scenario
test("Tie scenario", () => {
  const result = getFinishText("UserA", "UserB", 5, 5);
  expect(result).toBe("Tie!");
});
