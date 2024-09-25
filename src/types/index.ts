type optionsProps = {
  label: string;
  value: string;
};

export interface FormItem {
  label: string;
  type: string;
  value: string | File | undefined;
  placeholder: string;
  arkey: string;
  options: optionsProps[];
  required?: boolean;
  pattern?: string;
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
  address?: string;
  state?: string;
  city?: string;
  zipcode?: string;
  street?: string;
}

export interface userProps {
  data: dataProps;
  _id: string;
  __v: number;
  email: string;
  password: string;
  createdAt: string;
  userName: string;
}

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};
