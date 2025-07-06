export interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}

export interface ReusableFormProps {
  fields: FormField[];
  onSubmit: (data: any) => void;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  buttonText?: string;
  showSocialButtons?: boolean;
  footerLinks?: JSX.Element;
}