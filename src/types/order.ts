

interface Address {
  village: string;
  district: string;
  subDistrict: string;
  post: string;
  postCode: string;
}

interface MealTime {
  menu: string;
  price: number;
  _id?: string;
}

interface DayMenu {
  day: 'Saturday' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  morning: MealTime;
  evening: MealTime;
  night: MealTime;
  _id?: string;
}

interface OperatingHours {
  open: string;
  close: string;
  daysOpen: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday')[];
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
  gender: 'male' | 'female' | 'other';
  isBlock: boolean;
  isDelete: boolean;
  isShop: boolean;
  password: string;
  phoneNumber: string;
  role: 'mealProvider' | string; // Add other possible roles
  secondaryPhone: string;
  updatedAt: string | Date;
  _id: string | string;
}

interface TOrderMenu {
  author_id: User | string | string;
  createdAt: string | Date;
  meals: DayMenu[];
  shopId: ShopInfo | string | string;
  updatedAt: string | Date;
  _id: string | string;
}

// For arrays of your data
export type TOrderMenuList = TOrderMenu[];