export interface FormItem {
  _id: string; // MongoDB ObjectId as a string
  label: string;
  type: string;
  value: string | File | undefined;
  __v: number;
  category: string;
  placeholder: string;
  arkey: string;
  required?: boolean;
  options?: any[]; // Optional field
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  companyName: string;
  companyWebsite: string;
  businessName: string;
  businessDescription: string;
  businessLogo: string;
}
