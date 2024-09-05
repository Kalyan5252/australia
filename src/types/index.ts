export interface FormItem {
  label: string;
  type: string;
  value: string | File | undefined;
  placeholder: string;
  arkey: string;
  required?: boolean;
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

export interface dataProps {
  businessDescription: string;
  businessLogo: string;
  businessName: string;
  companyName: string;
  companyWebsite: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
}

export interface userProps {
  data: dataProps;
  _id: string;
  __v: number;
  email: string;
  password: string;
  createdAt: string;
}
