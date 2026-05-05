export interface Service {
  id: string;
  title: string;
  description: string;
  duration?: string;
  price?: string;
  icon: string;
  href: string;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  service?: string;
  image?: string;
}

export interface WorkshopSession {
  number: number;
  title: string;
  description: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  workshop: string;
  message?: string;
}
