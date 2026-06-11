interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  address: string;
}

const user1: User = {
  id: "u1",
  name: "sam",
  email: "sam@gmail.com",
  age: 13,
  address: "lagos",
};

function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>; // Initialize an empty object to hold the picked properties
  return keys.reduce((acc, key) => {
    // Use reduce to iterate over the keys array
    acc[key] = obj[key]; // Assign the value of the current key from the original object to the result object
    return acc; // Return the accumulator for the next iteration
  }, result); // Start the reduce with the empty result object
}
console.log(pick(user1, ["name", "email"]));

function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj } as T; // Create a shallow copy of the original object
  for (const key of keys) {
    // why not for in loop? because keys is an array,
    // and for-in loops are meant for iterating over object properties,
    // not array elements. Using a for-in loop on an array will iterate over the array indices as strings,
    //  which can lead to unexpected behavior.
    // Instead, we should use a for-of loop or a standard for loop to iterate over the array elements directly.
    // Iterate over the keys to remove
    delete result[key]; // Remove the specified key from the result object
  }
  return result as Omit<T, K>; // Return the modified object, ensuring it matches the Omit type
}

console.log(omit(user1, ["name", "email"]));

function groupBy<T, K extends keyof T>(arr: T[], key: K): Record<string, T[]> {
  // Define a function that takes an array of objects
  //  and a key to group by, returning a record where the keys are the unique values of the specified key and the values are
  //  arrays of objects that share that key value
  return arr.reduce(
    (acc, item) => {
      // Use reduce to iterate over the array and build the grouped result
      const groupKey = String(item[key]); // Convert the grouping key to a string
      if (!acc[groupKey]) {
        // If the group key doesn't exist in the accumulator, initialize it with an empty array
        acc[groupKey] = []; // Create a new array for this group key
      }
      acc[groupKey].push(item); // Add the current item to the appropriate group in the accumulator
      return acc; // Return the accumulator for the next iteration
    },
    {} as Record<string, T[]>,
  ); // Start the reduce with an empty object, ensuring it matches the Record type
}

const products = [
  { id: "1", name: "Laptop", price: 999, category: "electronics" },
  { id: "2", name: "Phone", price: 599, category: "electronics" },
  { id: "3", name: "T-shirt", price: 29, category: "clothing" },
  { id: "4", name: "Jeans", price: 79, category: "clothing" },
  { id: "5", name: "Headphones", price: 199, category: "electronics" },
];
console.log(groupBy(products, "category"));
