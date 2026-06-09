let name: string = "Samuel victor";
let age: number = 25;
let isStudent: boolean = true;
let hobbies: string[] = ["coding", "vlogging", "indoor movies"];

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
  createdAt: Date;
}
const user1: User = {
  id: 10,
  name: "Samuel",
  email: "ed@gmail.com",
  age: 25,
  isActive: true,
  createdAt: new Date(),
};

type UserRole = "admin" | " editor" | "viewer";
// const users: UserRole = "superuser" ❌
// const users: UserRole = "admin" ✅
