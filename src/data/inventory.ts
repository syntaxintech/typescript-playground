import { OrderItem, StockEntry } from "../types";
// for a single StockEntry, [] this won't be there
// Line 4 means an array of StockEntry objects
const inventory: StockEntry[] = [
  {
    id: "product1",
    name: "Apple Iphone 12",
    description: "A good phone",
    price: 499,
    unit: 1,
    category: "electronics",
    stockLevel: 3,
    lastRestocked: new Date(),
  },
  {
    id: "product2",
    name: "Samsung S24 Ultra",
    description: "Android Flagship",
    price: 650,
    unit: 2,
    category: "electronics",
    stockLevel: 8,
    lastRestocked: new Date(),
  },
  {
    id: "product3",
    name: "Google Pixel 7a",
    description: "Google Flaghip",
    price: 399,
    unit: 1,
    category: "electronics",
    stockLevel: 10,
    lastRestocked: new Date(),
  },
];

function getProductById(
  id: string,
  stock: readonly StockEntry[],
): StockEntry | undefined {
  return stock.find((item) => item.id === id);
}
const product = getProductById("product1", inventory);

if (product) {
  console.log(product.name);
  console.log(product.price);
}

function addInventory(product: StockEntry, stock: StockEntry[]): StockEntry[] {
  const newProduct = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    unit: product.unit,
    category: product.category,
    stockLevel: product.stockLevel,
    lastRestocked: new Date(),
  };
  const updatedInventory = [...stock, newProduct];
  return updatedInventory;
}

addInventory(
  {
    id: "product4",
    name: "OnePlus 11",
    description: "Android Flagship",
    price: 599,
    unit: 5,
    category: "electronics",
    stockLevel: 5,
    lastRestocked: new Date(),
  },
  inventory,
);

function getLowStockItems(
  stock: readonly StockEntry[],
  threshold: number,
): StockEntry[] {
  return stock.filter((item) => item.stockLevel < threshold);
}

getLowStockItems(inventory, 10);

function calculateOrderTotal(items: readonly OrderItem[]): [number, number] {
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.productPrice,
    0,
  );
  const tax = subtotal * 0.075;

  return [subtotal, tax];
}

function sortInventory(
  stock: readonly StockEntry[],
  by: "price" | "stock" | "name",
): StockEntry[] {
  switch (by) {
    case "price":
      return [...stock].sort((a, b) => a.price - b.price);
    case "stock":
      return [...stock].sort((a, b) => a.stockLevel - b.stockLevel);
    case "name":
      return [...stock].sort((a, b) => a.name.localeCompare(b.name));
  }
}

const raw = localStorage.getItem("cart");

function loadCart(): OrderItem[] {
  if (raw === null) {
    return [];
  }
  return JSON.parse(raw) as OrderItem[];
}
