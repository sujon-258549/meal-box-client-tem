/* eslint-disable @typescript-eslint/no-explicit-any */
interface Address {
  village: string;
  district: string;
  subDistrict: string;
  post: string;
  postCode: string;
}

interface OperatingHours {
  open: string;
  close: string;
  daysOpen: (
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday"
  )[];
}

interface SocialMediaLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
}

interface ShopInfo {
  authorShopId: string | string;
  customerServiceContact: string;
  establishedYear: number;
  isActive: boolean;
  operatingHours: OperatingHours;
  ownerName: string;
  paymentMethods: string[];
  phoneNumber: string;
  productCategories: string[];
  rating: number;
  shopAddress: string;
  shopLogo: string;
  shopName: string;
  socialMediaLinks: SocialMediaLinks;
  website: string;
  _id?: string;
}

interface User {
  address: Address;
  createdAt: string | Date;
  dateOfBirth: string;
  email: string;
  fullName: string;
  gender: "male" | "female" | "other";
  isBlock: boolean;
  isDelete: boolean;
  isShop: boolean;
  password: string;
  phoneNumber: string;
  role: "mealProvider" | string; // Add other possible roles
  secondaryPhone: string;
  updatedAt: string | Date;
  _id: string | string;
}
interface Meal {
  // Define meal properties based on your actual data structure
  // Example properties (adjust according to your data):
  name: string;
  price: number;
  quantity: number;
  // ... other meal properties
}

interface Order {
  author_id: string;
  createdAt: string;
  meals: Meal[];
  shopId: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

interface OrderItem {
  meals: Meal[];
  _id: string;
}

interface Transaction {
  [x: string]: any;
  createdAt: string;
  customerId: User;
  orderId: Order;
  orders: OrderItem[];
  paymentStatus: string;
  shopId: ShopInfo;
  total_price: number;
  transactionId: string;
  updatedAt: string;
  _id: string;
}

export interface Meta {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
}

export interface TOrderGetInfo {
  data: Transaction;
  meta: Meta;
}
