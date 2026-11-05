export type UserRole = 'SCHOOL_OWNER' | 'STUDENT' | 'TRAINER' | 'SUPER_ADMIN';

export interface SchoolTenant {
  id: string;
  name: string;
  slug: string;
  licenseNumber: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  primaryColor: string;
  primaryHover: string;
  primaryContainer: string;
  secondaryContainer: string;
  logoIcon: string;
}

export interface StudentRecord {
  id: string;
  name: string;
  initials: string;
  avatarUrl?: string;
  phone: string;
  email: string;
  permitType: string;
  cohort: string;
  assignedCourse: string;
  totalHours: number;
  completedHours: number;
  totalFee: number;
  paidAmount: number;
  status: 'PENDING' | 'APPROVED' | 'ENROLLED' | 'COMPLETED';
  licenseGoalDate?: string;
}

export interface TriadSession {
  id: string;
  vehicleName: string;
  vehicleType: string;
  vehiclePlate: string;
  learnerName: string;
  learnerInitials: string;
  learnerHours: string;
  trainerName: string;
  trainerRole: string;
  trainerInitials: string;
  statusTag: string;
  remainingMinutes: number;
  isEmergencyAlert?: boolean;
}

export interface PaymentReceipt {
  receiptNumber: string;
  date: string;
  studentName: string;
  courseName: string;
  amount: number;
  paymentMode: 'CASH' | 'UPI' | 'BANK_TRANSFER' | 'CARD';
  referenceNo: string;
  totalFee: number;
  remainingBalance: number;
  notes?: string;
}
