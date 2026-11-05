import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SchoolTenant, UserRole, StudentRecord, PaymentReceipt } from '../types';

export const SAMPLE_SCHOOLS: SchoolTenant[] = [
  {
    id: 'sch_liberty',
    name: 'Liberty Driving Academy',
    slug: 'liberty-academy',
    licenseNumber: 'NY-SCH-902',
    location: 'Metro Downtown Operations',
    address: '142 Metro Ave, Downtown Hub, NY',
    phone: '+1 (555) 234-5678',
    email: 'contact@libertyacademy.com',
    primaryColor: '#006194',
    primaryHover: '#004d77',
    primaryContainer: '#007bb9',
    secondaryContainer: '#dae2fd',
    logoIcon: 'directions_car',
  },
  {
    id: 'sch_patil',
    name: 'Patil Driving School',
    slug: 'patil-ds',
    licenseNumber: 'MH-12-DS-2024',
    location: 'Shivajinagar Central Yard',
    address: 'Shop 4, Commercial Plaza, Pune, MH',
    phone: '+91 98220 12345',
    email: 'info@patildrivingschool.in',
    primaryColor: '#047857', // Emerald green theme
    primaryHover: '#065f46',
    primaryContainer: '#059669',
    secondaryContainer: '#d1fae5',
    logoIcon: 'electric_car',
  },
  {
    id: 'sch_shreesai',
    name: 'Shree Sai Driving School',
    slug: 'shreesai-ds',
    licenseNumber: 'MH-14-DS-8819',
    location: 'Kothrud Highway Branch',
    address: 'Plot 18, Paud Road, Pune, MH',
    phone: '+91 99700 88990',
    email: 'admin@shreesaimotors.com',
    primaryColor: '#b45309', // Warm Amber/Orange theme
    primaryHover: '#92400e',
    primaryContainer: '#d97706',
    secondaryContainer: '#fef3c7',
    logoIcon: 'speed',
  },
];

interface TenantContextType {
  activeSchool: SchoolTenant;
  setActiveSchool: (school: SchoolTenant) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  pendingApprovals: StudentRecord[];
  approveStudent: (id: string) => void;
  recentPayments: PaymentReceipt[];
  addPayment: (payment: PaymentReceipt) => void;
  selectedReceipt: PaymentReceipt | null;
  setSelectedReceipt: (receipt: PaymentReceipt | null) => void;
  isWalkInModalOpen: boolean;
  setIsWalkInModalOpen: (open: boolean) => void;
  isTenantModalOpen: boolean;
  setIsTenantModalOpen: (open: boolean) => void;
  notificationsCount: number;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSchool, setActiveSchool] = useState<SchoolTenant>(SAMPLE_SCHOOLS[0]);
  const [activeRole, setActiveRole] = useState<UserRole>('SCHOOL_OWNER');
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentReceipt | null>(null);
  const [isWalkInModalOpen, setIsWalkInModalOpen] = useState(false);
  const [isTenantModalOpen, setIsTenantModalOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(3);

  // Dynamic CSS variables injection for white-label theming
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--school-primary', activeSchool.primaryColor);
    root.style.setProperty('--school-primary-hover', activeSchool.primaryHover);
    root.style.setProperty('--school-primary-container', activeSchool.primaryContainer);
    root.style.setProperty('--school-secondary-container', activeSchool.secondaryContainer);
  }, [activeSchool]);

  const [pendingApprovals, setPendingApprovals] = useState<StudentRecord[]>([
    {
      id: 'stu_marcus',
      name: 'Marcus Alvarez',
      initials: 'MA',
      phone: '+1 (555) 349-2019',
      email: 'm.alvarez@outlook.com',
      permitType: 'Class D Permit',
      cohort: 'Cohort #24-C',
      assignedCourse: 'Full Licensing Program (20h)',
      totalHours: 20,
      completedHours: 0,
      totalFee: 650,
      paidAmount: 200,
      status: 'PENDING',
    },
    {
      id: 'stu_priya',
      name: 'Priya Sharma',
      initials: 'PS',
      phone: '+91 98811 55432',
      email: 'priya.sharma@gmail.com',
      permitType: 'Learner License LMV',
      cohort: 'Cohort #24-D',
      assignedCourse: 'Four-Wheeler Basic + Reverse',
      totalHours: 15,
      completedHours: 0,
      totalFee: 500,
      paidAmount: 150,
      status: 'PENDING',
    },
  ]);

  const [recentPayments, setRecentPayments] = useState<PaymentReceipt[]>([
    {
      receiptNumber: 'RCP-2026-0891',
      date: 'Today, 10:15 AM',
      studentName: 'Sophia Wright',
      courseName: '10-Hr Highway Package',
      amount: 450,
      paymentMode: 'CASH',
      referenceNo: 'CSH-0982-REC',
      totalFee: 450,
      remainingBalance: 0,
      notes: 'Final installment cleared. Ready for DMV Road Test endorsement.',
    },
    {
      receiptNumber: 'RCP-2026-0890',
      date: 'Yesterday, 04:30 PM',
      studentName: 'Sophia Martinez',
      courseName: 'Ontario G2 Preparation (20h)',
      amount: 300,
      paymentMode: 'UPI',
      referenceNo: 'UPI-98218938210@okaxis',
      totalFee: 650,
      remainingBalance: 150,
      notes: 'Second installment paid via UPI QR.',
    },
  ]);

  const approveStudent = (id: string) => {
    setPendingApprovals((prev) => prev.filter((s) => s.id !== id));
    setNotificationsCount((prev) => Math.max(0, prev - 1));
  };

  const addPayment = (payment: PaymentReceipt) => {
    setRecentPayments((prev) => [payment, ...prev]);
  };

  return (
    <TenantContext.Provider
      value={{
        activeSchool,
        setActiveSchool,
        activeRole,
        setActiveRole,
        pendingApprovals,
        approveStudent,
        recentPayments,
        addPayment,
        selectedReceipt,
        setSelectedReceipt,
        isWalkInModalOpen,
        setIsWalkInModalOpen,
        isTenantModalOpen,
        setIsTenantModalOpen,
        notificationsCount,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};
