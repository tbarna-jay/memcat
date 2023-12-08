import shuffleArray from "../helpers/shuffleArray";

// Test the shuffleArray function
describe("shuffleArray", () => {
  it("should shuffle an array", () => {
    // Arrange
    const originalArray = [1, 2, 3, 4, 5, 6, 7, 8];

    // Act
    const shuffledArray = shuffleArray([...originalArray]);

    // Assert
    expect(shuffledArray).not.toEqual(originalArray); // Check that the array is shuffled
    expect(shuffledArray.sort()).toEqual(originalArray.sort()); // Check that all elements are still present
  });

  it("should handle an empty array", () => {
    // Arrange
    const originalArray: number[] = [];

    // Act
    const shuffledArray = shuffleArray([...originalArray]);

    // Assert
    expect(shuffledArray).toEqual(originalArray); // Shuffling an empty array should result in an empty array
  });

  it("should handle an array with a single element", () => {
    // Arrange
    const originalArray = [42];

    // Act
    const shuffledArray = shuffleArray([...originalArray]);

    // Assert
    expect(shuffledArray).toEqual(originalArray); // Shuffling an array with a single element should result in the same array
  });
});
