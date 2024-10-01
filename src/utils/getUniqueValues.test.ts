import { getUniqueValues } from "./getUniqueValues";

describe("get unique values", () => {
  it("should return unique values from a field in objects", () => {
    const items = [
      { id: 1, category: "Fruit" },
      { id: 2, category: "Vegetable" },
      { id: 3, category: "Fruit" },
      { id: 4, category: "Dairy" },
      { id: 5, category: "Vegetable" },
    ];

    const result = getUniqueValues(items, "category");
    expect(result).toEqual(["Fruit", "Vegetable", "Dairy"]);
  });

  it("should return an empty array", () => {
    const items: { id: number; category: string }[] = [];

    const result = getUniqueValues(items, "category");
    expect(result).toEqual([]);
  });

  it("should work with different types of fields", () => {
    const items = [
      { id: 1, name: "Apple", quantity: 10 },
      { id: 2, name: "Banana", quantity: 5 },
      { id: 3, name: "Apple", quantity: 10 },
      { id: 4, name: "Carrot", quantity: 7 },
      { id: 5, name: "Banana", quantity: 5 },
    ];

    const resultByName = getUniqueValues(items, "name");
    const resultByQuantity = getUniqueValues(items, "quantity");

    expect(resultByName).toEqual(["Apple", "Banana", "Carrot"]);
    expect(resultByQuantity).toEqual(["10", "5", "7"]);
  });
});
