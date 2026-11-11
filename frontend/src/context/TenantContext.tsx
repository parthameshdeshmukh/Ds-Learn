import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SchoolTenant, UserRole, Student, DrivingLesson, PaymentRecord } from '../types';

export const DEFAULT_SCHOOLS: SchoolTenant[] = [
  {
    id: 'sch_liberty',
    name: 'Liberty Driving Academy',
    slug: 'liberty-academy',
    licenseNumber: 'DL-SCH-2024-01',
    address: '142 Metro Ave, Downtown Hub',
    phone: '+1 (555) 234-5678',
    email: 'info@libertyacademy.com',
    primaryColor: '#2563eb', // Clean Blue
    primaryHover: '#1d4ed8',
    primaryLight: '#eff6ff',
    logoIcon: 'directions_car',
  },
  {
    id: 'sch_patil',
    name: 'Patil Driving School',
    slug: 'patil-ds',
    licenseNumber: 'MH-12-DS-2024',
    address: 'Shop 4, Commercial Complex, Pune',
    phone: '+91 98220 12345',
    email: 'contact@patildrivingschool.in',
    primaryColor: '#059669', // Clean Emerald Green
    primaryHover: '#047857',
    primaryLight: '#ecfdf5',
    logoIcon: 'local_taxi',
  },
  {
    id: 'sch_shreesai',
    name: 'Shree Sai Driving School',
    slug: 'shreesai-ds',
    licenseNumber: 'MH-14-DS-8819',
    address: 'Plot 18, Paud Road, Kothrud, Pune',
    phone: '+91 99700 88990',
    email: 'admin@shreesaimotors.com',
    primaryColor: '#d97706', // Clean Warm Amber
    primaryHover: '#b45309',
    primaryLight: '#fffbeb',
    logoIcon: 'traffic',
  },
];

interface ToastInfo {
  message: string;
  type: 'success' | 'info' | 'error';
}

interface TenantContextType {
  activeSchool: SchoolTenant;
  setActiveSchool: (school: SchoolTenant) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  students: Student[];
  lessons: DrivingLesson[];
  payments: PaymentRecord[];
  addStudent: (student: Omit<Student, 'id' | 'balance' | 'registrationDate' | 'completedLessons' | 'totalLessons'>, initialPayment?: number, paymentMode?: 'CASH' | 'UPI' | 'CARD') => void;
  scheduleLesson: (lesson: Omit<DrivingLesson, 'id' | 'status'>) => void;
  updateLessonStatus: (id: string, status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED') => void;
  recordPayment: (studentId: string, amount: number, paymentMode: 'CASH' | 'UPI' | 'CARD', notes?: string) => void;
  selectedReceipt: PaymentRecord | null;
  setSelectedReceipt: (receipt: PaymentRecord | null) => void;
  isAddStudentModalOpen: boolean;
  setIsAddStudentModalOpen: (open: boolean) => void;
  isRecordPaymentModalOpen: boolean;
  setIsRecordPaymentModalOpen: (open: boolean) => void;
  isScheduleLessonModalOpen: boolean;
  setIsScheduleLessonModalOpen: (open: boolean) => void;
  isTenantModalOpen: boolean;
  setIsTenantModalOpen: (open: boolean) => void;
  toast: ToastInfo | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSchool, setActiveSchool] = useState<SchoolTenant>(DEFAULT_SCHOOLS[0]);
  const [activeRole, setActiveRole] = useState<UserRole>('SCHOOL_OWNER');
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentRecord | null>(null);

  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isRecordPaymentModalOpen, setIsRecordPaymentModalOpen] = useState(false);
  const [isScheduleLessonModalOpen, setIsScheduleLessonModalOpen] = useState(false);
  const [isTenantModalOpen, setIsTenantModalOpen] = useState(false);

  const [toast, setToast] = useState<ToastInfo | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Sync theme colors with CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--school-primary', activeSchool.primaryColor);
    root.style.setProperty('--school-primary-hover', activeSchool.primaryHover);
    root.style.setProperty('--school-primary-light', activeSchool.primaryLight);
  }, [activeSchool]);

  // Initial Students
  const [students, setStudents] = useState<Student[]>([
    {
      id: 'stu_1',
      name: 'Sophia Martinez',
      phone: '+1 (555) 349-2019',
      email: 'sophia.m@example.com',
      course: 'Four Wheeler (Car) Basic + License',
      instructorName: 'Dave Ross',
      totalFee: 650,
      paidAmount: 500,
      balance: 150,
      status: 'ACTIVE',
      registrationDate: '2026-10-15',
      completedLessons: 7,
      totalLessons: 10,
    },
    {
      id: 'stu_2',
      name: 'Rahul Patil',
      phone: '+91 98223 44556',
      email: 'rahul.patil@example.com',
      course: 'Four Wheeler Comprehensive',
      instructorName: 'Dave Ross',
      totalFee: 500,
      paidAmount: 500,
      balance: 0,
      status: 'ACTIVE',
      registrationDate: '2026-10-20',
      completedLessons: 9,
      totalLessons: 10,
    },
    {
      id: 'stu_3',
      name: 'Liam Chen',
      phone: '+1 (555) 778-9900',
      email: 'liam.chen@example.com',
      course: 'Automatic Car Refresher',
      instructorName: 'Sarah Sterling',
      totalFee: 400,
      paidAmount: 200,
      balance: 200,
      status: 'ACTIVE',
      registrationDate: '2026-10-28',
      completedLessons: 3,
      totalLessons: 8,
    },
    {
      id: 'stu_4',
      name: 'Priya Sharma',
      phone: '+91 98811 55432',
      email: 'priya.sharma@example.com',
      course: 'Two Wheeler (Motorcycle) Course',
      instructorName: 'Sarah Sterling',
      totalFee: 300,
      paidAmount: 100,
      balance: 200,
      status: 'PENDING',
      registrationDate: '2026-11-04',
      completedLessons: 0,
      totalLessons: 6,
    },
  ]);

  // Initial Lessons
  const [lessons, setLessons] = useState<DrivingLesson[]>([
    {
      id: 'les_1',
      studentId: 'stu_1',
      studentName: 'Sophia Martinez',
      studentPhone: '+1 (555) 349-2019',
      instructorName: 'Dave Ross',
      date: 'Today',
      timeSlot: '09:00 AM - 10:00 AM',
      vehicle: 'Swift Dzire #04 (Manual)',
      topic: 'Highway Merging & Roundabouts',
      status: 'SCHEDULED',
    },
    {
      id: 'les_2',
      studentId: 'stu_2',
      studentName: 'Rahul Patil',
      studentPhone: '+91 98223 44556',
      instructorName: 'Dave Ross',
      date: 'Today',
      timeSlot: '11:00 AM - 12:00 PM',
      vehicle: 'Swift Dzire #04 (Manual)',
      topic: 'Parallel Parking & Hill Start',
      status: 'SCHEDULED',
    },
    {
      id: 'les_3',
      studentId: 'stu_3',
      studentName: 'Liam Chen',
      studentPhone: '+1 (555) 778-9900',
      instructorName: 'Sarah Sterling',
      date: 'Today',
      timeSlot: '02:00 PM - 03:00 PM',
      vehicle: 'Hyundai i10 #02 (Automatic)',
      topic: 'Traffic Signaling & Lane Changing',
      status: 'SCHEDULED',
    },
    {
      id: 'les_4',
      studentId: 'stu_1',
      studentName: 'Sophia Martinez',
      studentPhone: '+1 (555) 349-2019',
      instructorName: 'Dave Ross',
      date: 'Tomorrow',
      timeSlot: '09:00 AM - 10:00 AM',
      vehicle: 'Swift Dzire #04 (Manual)',
      topic: 'Pre-Road Test Mock Evaluation',
      status: 'SCHEDULED',
    },
  ]);

  // Initial Payments
  const [payments, setPayments] = useState<PaymentRecord[]>([
    {
      id: 'pay_1',
      receiptNumber: 'RCP-2026-104',
      date: 'Today, 10:15 AM',
      studentId: 'stu_1',
      studentName: 'Sophia Martinez',
      courseName: 'Four Wheeler (Car) Basic + License',
      amount: 250,
      totalFee: 650,
      balanceAfterPayment: 150,
      paymentMode: 'UPI',
      referenceNo: 'UPI-98218938210',
      notes: 'Second installment paid via UPI QR.',
    },
    {
      id: 'pay_2',
      receiptNumber: 'RCP-2026-103',
      date: 'Yesterday, 04:30 PM',
      studentId: 'stu_2',
      studentName: 'Rahul Patil',
      courseName: 'Four Wheeler Comprehensive',
      amount: 500,
      totalFee: 500,
      balanceAfterPayment: 0,
      paymentMode: 'CASH',
      referenceNo: 'CSH-WALKIN',
      notes: 'Full course fee paid in cash. Balance cleared.',
    },
    {
      id: 'pay_3',
      receiptNumber: 'RCP-2026-102',
      date: '02 Nov 2026',
      studentId: 'stu_3',
      studentName: 'Liam Chen',
      courseName: 'Automatic Car Refresher',
      amount: 200,
      totalFee: 400,
      balanceAfterPayment: 200,
      paymentMode: 'CARD',
      referenceNo: 'CARD-TXN-8812',
      notes: 'Initial registration deposit.',
    },
  ]);

  // Add new student
  const addStudent = (
    data: Omit<Student, 'id' | 'balance' | 'registrationDate' | 'completedLessons' | 'totalLessons'>,
    initialPayment = 0,
    paymentMode: 'CASH' | 'UPI' | 'CARD' = 'CASH'
  ) => {
    const studentId = `stu_${Date.now()}`;
    const balance = Math.max(0, data.totalFee - (data.paidAmount || 0));
    const newStudent: Student = {
      ...data,
      id: studentId,
      paidAmount: data.paidAmount || 0,
      balance,
      status: 'ACTIVE',
      registrationDate: new Date().toISOString().split('T')[0],
      completedLessons: 0,
      totalLessons: 10,
    };

    setStudents((prev) => [newStudent, ...prev]);

    // Record initial payment if provided
    if (initialPayment > 0) {
      const newPayment: PaymentRecord = {
        id: `pay_${Date.now()}`,
        receiptNumber: `RCP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        date: 'Just now',
        studentId,
        studentName: data.name,
        courseName: data.course,
        amount: initialPayment,
        totalFee: data.totalFee,
        balanceAfterPayment: balance,
        paymentMode,
        referenceNo: paymentMode === 'CASH' ? 'CASH-REC' : `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
        notes: 'Initial admission fee deposit.',
      };
      setPayments((prev) => [newPayment, ...prev]);
    }

    showToast(`Student "${data.name}" added successfully!`);
    setIsAddStudentModalOpen(false);
  };

  // Schedule a lesson
  const scheduleLesson = (data: Omit<DrivingLesson, 'id' | 'status'>) => {
    const newLesson: DrivingLesson = {
      ...data,
      id: `les_${Date.now()}`,
      status: 'SCHEDULED',
    };
    setLessons((prev) => [newLesson, ...prev]);
    showToast(`Driving lesson scheduled for ${data.studentName}!`);
    setIsScheduleLessonModalOpen(false);
  };

  // Update lesson status
  const updateLessonStatus = (id: string, status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED') => {
    setLessons((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );

    // If completed, increment student completed lessons
    if (status === 'COMPLETED') {
      const lesson = lessons.find((l) => l.id === id);
      if (lesson) {
        setStudents((prev) =>
          prev.map((s) =>
            s.id === lesson.studentId
              ? { ...s, completedLessons: Math.min(s.totalLessons, s.completedLessons + 1) }
              : s
          )
        );
      }
      showToast('Lesson marked as completed! Good job.');
    } else if (status === 'CANCELLED') {
      showToast('Lesson has been marked as cancelled.', 'info');
    }
  };

  // Record a payment
  const recordPayment = (
    studentId: string,
    amount: number,
    paymentMode: 'CASH' | 'UPI' | 'CARD',
    notes?: string
  ) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    const newPaid = student.paidAmount + amount;
    const newBalance = Math.max(0, student.totalFee - newPaid);

    // Update student
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId ? { ...s, paidAmount: newPaid, balance: newBalance } : s
      )
    );

    // Add payment record
    const newPayment: PaymentRecord = {
      id: `pay_${Date.now()}`,
      receiptNumber: `RCP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      date: 'Just now',
      studentId: student.id,
      studentName: student.name,
      courseName: student.course,
      amount,
      totalFee: student.totalFee,
      balanceAfterPayment: newBalance,
      paymentMode,
      referenceNo: paymentMode === 'CASH' ? 'CASH-REC' : `UPI-${Date.now().toString().slice(-6)}`,
      notes: notes || 'Course fee payment installment.',
    };

    setPayments((prev) => [newPayment, ...prev]);
    showToast(`Payment of $${amount} recorded for ${student.name}!`);
    setIsRecordPaymentModalOpen(false);
  };

  return (
    <TenantContext.Provider
      value={{
        activeSchool,
        setActiveSchool,
        activeRole,
        setActiveRole,
        students,
        lessons,
        payments,
        addStudent,
        scheduleLesson,
        updateLessonStatus,
        recordPayment,
        selectedReceipt,
        setSelectedReceipt,
        isAddStudentModalOpen,
        setIsAddStudentModalOpen,
        isRecordPaymentModalOpen,
        setIsRecordPaymentModalOpen,
        isScheduleLessonModalOpen,
        setIsScheduleLessonModalOpen,
        isTenantModalOpen,
        setIsTenantModalOpen,
        toast,
        showToast,
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
