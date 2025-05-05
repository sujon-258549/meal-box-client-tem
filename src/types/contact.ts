export interface TContact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  sendId: string; // Reference to the selected author
  message: string;
  createdAt: string;
}
