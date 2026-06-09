export interface UserProfile {
  id: ID;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  isVerified: boolean;
  avatarUrl?: string;
}

export interface Product {
  id: ID;
  name: string;
  description: string;
  price: number;
  getDisplayPrice?(): string;
  isInStock?(): boolean;
  unit: number;
  category: ProductCategory;
  imageUrl?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface OrderItem {
  productId: ID;
  productName: string;
  quantity: number;
  productPrice: number;
}

export interface Order {
  id: ID;
  userId: ID;
  items: OrderItem[];
  totalAmount: number;
  address: Address;
  status: OrderStatus;
  createdAt: Date;
  deliveredAt?: Date;
  paymentMethod: PaymentMethod;
}

export interface BlogPost {
  id: ID;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  authorId: ID;
  tags: string[];
  publishedAt?: Date;
  status: PostStatus;
}

type ID = string | number;
const USER_ROLE = ["admin", "editor", "viewer"] as const;
export type UserRole = (typeof USER_ROLE)[number];
const ORDER_STATUS = [
  "pending",
  "processing",
  "shipping",
  "delivered",
  "cancelled",
] as const;
export type OrderStatus = (typeof ORDER_STATUS)[number];
const POST_STATUS = ["draft", "published", "archived"] as const;
type PostStatus = (typeof POST_STATUS)[number];
const PAYMENT_METHODS = ["card", "bank_transfer", "wallet"] as const;
type PaymentMethod = (typeof PAYMENT_METHODS)[number];
const PRODUCT_CATEGORIES = [
  "electronics",
  "clothing",
  "books",
  "food",
  "other",
] as const;
type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export type StockEntry = Product & {
  stockLevel: number;
  lastRestocked: Date;
};

interface ProductRepository {
  getProductById(id: ID): Product | undefined;
  getAllProducts(): Product[];
  getProductByCategory(category: ProductCategory): Product[];
  createNewProduct(data: Omit<Product, "id">): Product;
  updateProduct(
    id: ID,
    data: Partial<Omit<Product, "id">>,
  ): Product | undefined;
  deleteProduct(id: ID): boolean;
}

const CATEGORY_LABELS = {
  electronics: "Electronics",
  clothing: "Clothing",
  books: "Books",
  food: "Food & Drink",
  other: "Other",
} as const;

function getCategoryLabel(category: ProductCategory): string {
  return CATEGORY_LABELS[category];
}

const DEFAULT_CONFIG = {
  port: 3000,
  host: "localhost",
  debug: false,
  maxConnection: 100,
  timeout: 5000,
  environment: "development",
};

type AppConfig = typeof DEFAULT_CONFIG;

function getConfigValue<K extends keyof AppConfig>(
  config: AppConfig,
  key: K,
): AppConfig[K] {
  return config[key];
}

function updateConfig(
  base: AppConfig,
  overrides: Partial<AppConfig>,
): AppConfig {
  return { ...base, ...overrides };
}

// console.log(updateConfig(DEFAULT_CONFIG, { port: 4000 }));

interface UserSettings {
  userId: string;
  [key: string]: string | number | boolean;
}

const setting1: UserSettings = {
  userId: "suid1",
  theme: "dark",
};
const setting2: UserSettings = {
  userId: "suid2",
  notification: "mute",
  batteryPercent: false,
};

const setting3: UserSettings = {
  userId: "suid3",
  languae: "en",
  timezone: "Lagos",
};

function setSetting(
  settings: UserSettings,
  key: string,
  value: string | number | boolean,
): UserSettings {
  return { ...settings, [key]: value };
}

// console.log(setSetting(setting1, "fontSize", 14));

function getSetting(
  settings: UserSettings,
  key: string,
): string | number | boolean | undefined {
  return settings[key];
}

// console.log(getSetting(setting2, "notification"));

const FEATURE_FLAGS = {
  darkMode: false,
  betaFeatures: false,
  newDashboard: true,
  experimentalSearch: false,
} as const;

type FeatureFlag = keyof typeof FEATURE_FLAGS;

// te purpose of the function is to "Tell me whether this feature is enabled."
// To get the enabled/disabled value, you must look up the property in the object:
// FEATURE_FLAGS["darkMode"] ==> false
function isFeatureEnabled(flag: FeatureFlag): boolean {
  return FEATURE_FLAGS[flag];
}

console.log(isFeatureEnabled("darkMode")); // false

type ConfigValue = string | number | boolean | Date | string[];

function processConfigValue(value: ConfigValue): string {
  if (typeof value === "string") {
    return "string";
  } else if (value instanceof Date) {
    return "Date";
  } else if (typeof value === "boolean") {
    return "boolean";
  } else if (typeof value === "number") {
    return "number";
  } else if (Array.isArray(value)) {
    return "string[]";
  }

  return typeof value;
}

type UserSettingss = {
  theme?: string;
};

function loadUserConfig(userId: string): UserSettingss | null {
  const users: Record<string, UserSettingss> = {
    user11: { theme: "dark" },
    user22: {},
  };

  return users[userId] ?? null;
}

function getDisplayTheme(userId: string): string {
  return loadUserConfig(userId)?.theme ?? "light";
}
