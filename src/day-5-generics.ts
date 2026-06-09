// // optional

// const userO1 = {
//   name: "sam",
//   address: {
//     city: "ijegun",
//   },
// };

// console.log(userO1.address?.city);
// // console.log(userO1.contact?.city); if show undefined instead of crashing

// // null collescing(??) -> used to provide a default value and it works only when the value is null or undefined

// let value = null;
// let result = value ?? "default value";
// console.log(result);

// function first<T>(arr: T[]): T | undefined {
//   return arr[0];
// }
// // console.log(first([1, 2, 3]));

// // console.log(first(["sam", "david", "bayo"]));

// interface User {
//   id: number;
//   name: string;
// }

function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    result[key] = obj[key];
  }

  return result;
}

const user = {
  id: 1,
  name: "Samuel",
  email: "sam@gmail.com",
  age: 22,
};

const selected = pick(user, ["name", "email"]);
console.log(selected);

type User = {
  name: string;
  age: number;
};
const user1: User = {
  name: "sam",
  age: 22,
};

const updatedUser: Partial<User> = {
  // so you are saying that the updatedUser object can have some or all of the properties of the User type, but they are all optional. This allows you to create an object that only includes the properties you want to update, without needing to provide values for all properties of the User type.
  ...user1,
  age: 23,
};
// console.log(updatedUser);
// How will you update the user1 object with the updatedUser object without mutating the original user1 object?

const requiredUser: Required<User> = {
  name: user1.name,
  age: user1.age,
};
// console.log(requiredUser);

// const namePicked: Pick<User, "name">;
// why do i have to assign it to an object. I thought it will create its own object of the pick property from another object?
// console.log(namePicked);

type ProfileWithOnlyName = Pick<User, "name">; // so it is the type(User not the value user1) and not ":" but "=" when dealing with type
// so type ProfileWithOnlyName means when assigned to an object name, the object can only accept a property of name
const profileWithOnlyName: ProfileWithOnlyName = {
  name: "dayo",
};

// const profile: Omit<User, "age">;
// same as omit too. I thought naming it like this means it will create another version of object with the ommitted/ remaining property
// console.log(profile);
// I am seeing something here
type ProfileWithoutAge = Omit<User, "age">; // so it is the type(User not the value user1) and not ":" but "=" when dealing with type
const profileWithoutAge: ProfileWithoutAge = {
  name: "dayo",
};

// Record
const scores: Record<string, number> = {
  // this means object scores can only accept property(string) and value(number) because it must correlate with the Record type right?
  ade: 80,
  segun: 78,
  david: 67,
};

import { Product, UserProfile, Order, OrderStatus, UserRole } from "./types";

type CreateUserInput = Omit<UserProfile, "id" | "createdAt">;
type UpdateUserInput = Partial<Omit<UserProfile, "id" | "createdAt">>;
type CreateProduct = Omit<Product, "id">;
type UpdateProductInput = Partial<Omit<Product, "id">>;
type CreateOrderInput = Omit<Order, "id" | "userid" | "status" | "createdAt">;
type UpdateOrderInput = Partial<Pick<Order, "status" | "deliveredAt">>;

type PublicUser = Omit<UserProfile, "password">;
type UserSummary = Pick<UserProfile, "id" | "name" | "avatarUrl" | "role">;
type ProductSummary = Pick<
  Product,
  "id" | "name" | "price" | "category" | "imageUrl"
>;
type OrderSummary = Pick<Order, "id" | "status" | "totalAmount" | "createdAt">;

const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  shipping: "Shipping",
  delivered: "Delivered",
  cancelled: "Cancelled",
  processing: "Processing",
};
const ORDER_STATUS_COLOURS: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  shipping: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  processing: "bg-orange-100 text-orange-800",
};
ORDER_STATUS_COLOURS["cancelled"];

const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: ["manage users", "manage writers"],
  editor: ["manage users", "create blogs"],
  viewer: ["read/view blogs", "comment on blogs", "like and share blogs"],
};
ROLE_PERMISSIONS["admin"];

// ReturnType<T>
// Parameters<T>
// InstanceType<T>
// ConstructorParameters<T>

function ExtractUserInfo(id: string, isExtraInfo = false) {
  return {
    id,
    name: "sam",
    log: isExtraInfo ? "details" : (undefined as string | undefined),
  };
}

type GetUserReturnInfo = ReturnType<typeof ExtractUserInfo>;
type GetUserParamsInfo = Parameters<typeof ExtractUserInfo>;

const argInfo: GetUserParamsInfo = ["u1", true];
const resultInfo: GetUserReturnInfo = ExtractUserInfo(...argInfo);

class PersonN1 {
  constructor(
    public name: string,
    public age: number,
  ) {}

  greet() {
    return `Hi I am this -> ${this.name}`;
  }
}

type PersonInstanceN1 = InstanceType<typeof PersonN1>;
type PersonCtorArgsN1 = ConstructorParameters<typeof PersonN1>;

const resultInfo1: PersonCtorArgsN1 = ["sangan", 29];
const abs: PersonInstanceN1 = new PersonN1(...resultInfo1);

// console.log(abs.greet());

// Awaited<T>

type Promise1 = Awaited<Promise<number>>; // number
type Promise2 = Awaited<Promise<Promise<string>>>;
type Awaited1 = Awaited<string>; // string(not a promise)

type PRomiseUnionExample = Awaited<Promise<string | number>>;

async function fetchCount() {
  return 42 as const;
}
type ResolvedFetchCountValue = Awaited<ReturnType<typeof fetchCount>>;

async function getData() {
  return Promise.all([
    Promise.resolve(1 as const),
    Promise.resolve("x" as const),
  ] as const);
}

type DataTupleWithPromise = Awaited<ReturnType<typeof getData>>;
