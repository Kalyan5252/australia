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
