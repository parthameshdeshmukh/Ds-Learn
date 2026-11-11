export type UserRole = 'SCHOOL_OWNER' | 'INSTRUCTOR' | 'STUDENT';

export interface SchoolTenant {
  id: string;
  name: string;
  slug: string;
  licenseNumber: string;
  address: string;
  phone: string;
  email: string;
  primaryColor: string;
  primaryHover: string;
  primaryLight: string;
  logoIcon: string;
}

export interface Student {
  id: string;
  name: string;
  phone: string;
  email?: string;
  course: string;
  instructorName: string;
  totalFee: number;
  paidAmount: number;
  balance: number;
  status: 'ACTIVE' | 'PENDING' | 'COMPLETED';
  registrationDate: string;
  completedLessons: number;
  totalLessons: number;
}

export interface DrivingLesson {
  id: string;
  studentId: string;
  studentName: string;
  studentPhone: string;
  instructorName: string;
  date: string;
  timeSlot: string;
  vehicle: string;
  topic: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  pickupLocation?: string;
  lessonNumber?: number;
  totalLessons?: number;
  notes?: string;
  skillsAssessed?: string[];
}

export interface PaymentRecord {
  id: string;
  receiptNumber: string;
  date: string;
  studentId: string;
  studentName: string;
  courseName: string;
  amount: number;
  totalFee: number;
  balanceAfterPayment: number;
  paymentMode: 'CASH' | 'UPI' | 'CARD' | 'BANK_TRANSFER';
  referenceNo: string;
  notes?: string;
}
