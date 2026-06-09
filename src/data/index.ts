import { Order, User } from "../types";

const user: User = {
  id: 1,
  name: "Samuel",
  email: "edu@gamil.com",
  password: "string",
  role: "admin",
  createdAt: new Date(),
  isVerified: true,
};

const order: Order = {
  id: 2,
  userId: 2,
  items: [
    {
      productId: 2591,
      productName: "Xiaomi curved monitor",
      quantity: 1,
      productPrice: 399,
    },
    {
      productId: 2592,
      productName: "iphone 17 pro",
      quantity: 2,
      productPrice: 899,
    },
    {
      productId: 2593,
      productName: "Sony A7",
      quantity: 1,
      productPrice: 1499,
    },
  ],
  totalAmount: 3797,
  address: {
    street: "lafunke",
    city: "Alimosho",
    state: "Lagos",
    country: "Nigeria",
    postalCode: "100266",
  },
  status: "pending",
  createdAt: new Date(),
  paymentMethod: "bank_transfer",
};
