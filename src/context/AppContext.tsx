import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SupportTicket,
  TicketMessage,
  TicketPriority,
  TicketInternalNote,
  CustomerAccount,
  CustomerAccountStatus,
  AdminUser,
  DemoAppointment,
  DemoBookingStatus,
  DemoInternalNote,
  PartnerLead,
  DemoRequestPayload
} from '../types';
import { INITIAL_TICKETS } from '../data/supportData';
import { INITIAL_CUSTOMERS, DEFAULT_ADMIN } from '../data/customerData';
import { INITIAL_DEMO_APPOINTMENTS } from '../data/demoData';
import { INITIAL_LEADS, CURRENT_PARTNER_PROFILE } from '../data/partnerData';

interface AppContextType {
  // Support Tickets
  tickets: SupportTicket[];
  addTicket: (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'timeline' | 'assignedAgent' | 'internalNotes'>) => string;
  addTicketReply: (ticketId: string, message: string, senderType: 'customer' | 'support_agent') => void;
  addTicketInternalNote: (ticketId: string, note: string) => void;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => void;
  updateTicketPriority: (ticketId: string, priority: TicketPriority) => void;
  updateTicketAgent: (ticketId: string, agent: string) => void;
  recordResolutionNotes: (ticketId: string, notes: string) => void;
  getTicketById: (ticketId: string) => SupportTicket | undefined;
  getCustomerTickets: () => SupportTicket[];

  // Customer Authentication & Management
  customerAccounts: CustomerAccount[];
  currentCustomer: CustomerAccount | null;
  customerAuthenticated: boolean;
  loginCustomer: (email: string, pass: string) => { success: boolean; status?: CustomerAccountStatus; message: string };
  registerCustomer: (data: Omit<CustomerAccount, 'id' | 'status' | 'createdAt' | 'lastLogin'>) => string;
  logoutCustomer: () => void;
  updateCustomerAccountStatus: (customerId: string, status: CustomerAccountStatus) => void;

  // Admin Authentication & Operations
  adminUser: AdminUser | null;
  adminAuthenticated: boolean;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;

  // Demo Appointment Scheduling
  demoAppointments: DemoAppointment[];
  submitDemoRequest: (payload: DemoRequestPayload) => Promise<{ success: boolean; id: string; message: string }>;
  confirmDemoAppointment: (demoId: string, meetingLink?: string) => { success: boolean; message: string };
  rescheduleDemoAppointment: (demoId: string, newDate: string, newTimeSlot: string) => { success: boolean; message: string };
  cancelDemoAppointment: (demoId: string, reason?: string) => void;
  completeDemoAppointment: (demoId: string, outcomeNotes: string) => void;
  addDemoInternalNote: (demoId: string, note: string) => void;
  assignDemoSalesRep: (demoId: string, salesRep: string) => void;
  checkDemoConflict: (date: string, timeSlot: string, excludeDemoId?: string) => boolean;

  // Partner Portal
  partnerAuthenticated: boolean;
  loginPartner: (email: string, pass: string) => boolean;
  logoutPartner: () => void;
  partnerProfile: typeof CURRENT_PARTNER_PROFILE;
  partnerLeads: PartnerLead[];
  addPartnerLead: (lead: Omit<PartnerLead, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => string;
  updateLeadStatus: (leadId: string, status: PartnerLead['status']) => void;

  // Notification Toast
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  clearToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Support Tickets State
  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('sit_demo_tickets_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_TICKETS;
  });

  // Customer Accounts
  const [customerAccounts, setCustomerAccounts] = useState<CustomerAccount[]>(() => {
    const saved = localStorage.getItem('sit_demo_customer_accounts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_CUSTOMERS;
  });

  // Customer Session
  const [currentCustomer, setCurrentCustomer] = useState<CustomerAccount | null>(() => {
    const saved = localStorage.getItem('sit_demo_customer_session');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return null;
  });

  // Admin Session
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('sit_demo_admin_session');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return null;
  });

  // Demo Appointments
  const [demoAppointments, setDemoAppointments] = useState<DemoAppointment[]>(() => {
    const saved = localStorage.getItem('sit_demo_appointments_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_DEMO_APPOINTMENTS;
  });

  // Partner Leads State
  const [partnerLeads, setPartnerLeads] = useState<PartnerLead[]>(() => {
    const saved = localStorage.getItem('sit_demo_partner_leads');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_LEADS;
  });

  // Partner Authentication State
  const [partnerAuthenticated, setPartnerAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('sit_demo_partner_auth') === 'true';
  });

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('sit_demo_tickets_v2', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('sit_demo_customer_accounts', JSON.stringify(customerAccounts));
  }, [customerAccounts]);

  useEffect(() => {
    if (currentCustomer) {
      localStorage.setItem('sit_demo_customer_session', JSON.stringify(currentCustomer));
    } else {
      localStorage.removeItem('sit_demo_customer_session');
    }
  }, [currentCustomer]);

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem('sit_demo_admin_session', JSON.stringify(adminUser));
    } else {
      localStorage.removeItem('sit_demo_admin_session');
    }
  }, [adminUser]);

  useEffect(() => {
    localStorage.setItem('sit_demo_appointments_v2', JSON.stringify(demoAppointments));
  }, [demoAppointments]);

  useEffect(() => {
    localStorage.setItem('sit_demo_partner_leads', JSON.stringify(partnerLeads));
  }, [partnerLeads]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4500);
  };

  const clearToast = () => setToast(null);

  /* Customer Authentication Operations */
  const customerAuthenticated = !!currentCustomer && currentCustomer.status === 'Active';

  const loginCustomer = (email: string, pass: string): { success: boolean; status?: CustomerAccountStatus; message: string } => {
    if (!email || !pass) {
      return { success: false, message: 'Please provide both email and password.' };
    }

    const account = customerAccounts.find((c) => c.email.toLowerCase() === email.trim().toLowerCase());
    if (!account) {
      return {
        success: false,
        message: 'No registered customer account found for this email address. Please register your organization account or check credentials.'
      };
    }

    setCurrentCustomer(account);

    if (account.status === 'Pending Approval') {
      setCurrentCustomer(account);
      showToast('Your customer account is currently pending company verification.', 'info');
      return {
        success: true,
        status: 'Pending Approval',
        message: 'Your account is under review by Sarita Infotech client administration.'
      };
    }

    if (account.status === 'Suspended') {
      setCurrentCustomer(account);
      showToast('This customer account has been suspended. Please contact your account manager.', 'error');
      return {
        success: true,
        status: 'Suspended',
        message: 'This account has been suspended by administration.'
      };
    }

    // Active
    const updated = { ...account, lastLogin: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) };
    setCurrentCustomer(updated);
    setCustomerAccounts((prev) => prev.map((c) => (c.id === account.id ? updated : c)));
    showToast(`Welcome back, ${account.name}! (${account.organization})`, 'success');
    return { success: true, status: 'Active', message: 'Authentication successful.' };
  };

  const registerCustomer = (data: Omit<CustomerAccount, 'id' | 'status' | 'createdAt' | 'lastLogin'>): string => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const newId = `CUST-2026-${randomNum}`;
    const today = new Date().toISOString().split('T')[0];

    const newAccount: CustomerAccount = {
      ...data,
      id: newId,
      status: 'Pending Approval',
      createdAt: today
    };

    setCustomerAccounts((prev) => [newAccount, ...prev]);
    setCurrentCustomer(newAccount);
    showToast(`Registration submitted for ${data.organization}. Account is pending verification.`, 'info');
    return newId;
  };

  const logoutCustomer = () => {
    setCurrentCustomer(null);
    localStorage.removeItem('sit_demo_customer_session');
    showToast('You have been securely logged out of Customer Portal.', 'info');
  };

  const updateCustomerAccountStatus = (customerId: string, status: CustomerAccountStatus) => {
    setCustomerAccounts((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, status } : c))
    );
    if (currentCustomer && currentCustomer.id === customerId) {
      setCurrentCustomer((prev) => (prev ? { ...prev, status } : null));
    }
    showToast(`Customer account #${customerId} status updated to ${status}.`, 'info');
  };

  /* Organization Data Isolation for Customer Portal */
  const getCustomerTickets = (): SupportTicket[] => {
    if (!currentCustomer) return [];
    return tickets.filter((t) => t.organizationId === currentCustomer.organizationId);
  };

  /* Admin Authentication Operations */
  const adminAuthenticated = !!adminUser;

  const loginAdmin = (email: string, pass: string): boolean => {
    if (email && pass) {
      setAdminUser(DEFAULT_ADMIN);
      showToast(`Welcome back, Administrator ${DEFAULT_ADMIN.name}!`, 'success');
      return true;
    }
    showToast('Please provide valid administrator credentials.', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    localStorage.removeItem('sit_demo_admin_session');
    showToast('You have been logged out of the Administration Console.', 'info');
  };

  /* Support Ticket Operations */
  const addTicket = (
    ticketData: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'timeline' | 'assignedAgent' | 'internalNotes'>
  ): string => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `SRT-2026-${randomNum}`;
    const now = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

    const newTicket: SupportTicket = {
      ...ticketData,
      id: newId,
      customerId: currentCustomer?.id || ticketData.customerId || 'CUST-GUEST',
      organizationId: currentCustomer?.organizationId || ticketData.organizationId || 'ORG-GENERAL',
      createdAt: now,
      updatedAt: now,
      assignedAgent: 'Unassigned (Auto-Triage)',
      internalNotes: [],
      timeline: [
        {
          id: `msg-${Date.now()}`,
          sender: ticketData.customerName,
          senderType: 'customer',
          message: ticketData.description,
          timestamp: now
        }
      ]
    };

    setTickets((prev) => [newTicket, ...prev]);
    showToast(`Support Ticket #${newId} registered successfully.`, 'success');
    return newId;
  };

  const addTicketReply = (ticketId: string, message: string, senderType: 'customer' | 'support_agent') => {
    const now = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const senderName =
            senderType === 'customer'
              ? t.customerName
              : adminUser?.name || t.assignedAgent.split('(')[0].trim() || 'Sarita Support Desk';
          const newMsg: TicketMessage = {
            id: `msg-${Date.now()}`,
            sender: senderName,
            senderType,
            message,
            timestamp: now
          };
          const newStatus = senderType === 'customer' ? 'In Progress' : 'Waiting for Customer';
          return {
            ...t,
            updatedAt: now,
            status: t.status === 'Resolved' || t.status === 'Closed' ? t.status : newStatus,
            timeline: [...t.timeline, newMsg]
          };
        }
        return t;
      })
    );
    showToast('Reply recorded in ticket conversation.', 'success');
  };

  const addTicketInternalNote = (ticketId: string, note: string) => {
    const now = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    const authorName = adminUser?.name || 'Support Operations Lead';
    const newNote: TicketInternalNote = {
      id: `inote-${Date.now()}`,
      author: authorName,
      note,
      timestamp: now
    };

    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, updatedAt: now, internalNotes: [...(t.internalNotes || []), newNote] }
          : t
      )
    );
    showToast('Confidential internal note added (hidden from customer).', 'info');
  };

  const updateTicketStatus = (ticketId: string, status: SupportTicket['status']) => {
    const now = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status, updatedAt: now } : t))
    );
    showToast(`Ticket #${ticketId} status updated to ${status}.`, 'info');
  };

  const updateTicketPriority = (ticketId: string, priority: TicketPriority) => {
    const now = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, priority, updatedAt: now } : t))
    );
    showToast(`Ticket #${ticketId} priority set to ${priority}.`, 'info');
  };

  const updateTicketAgent = (ticketId: string, agent: string) => {
    const now = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, assignedAgent: agent, status: t.status === 'Open' ? 'Assigned' : t.status, updatedAt: now } : t))
    );
    showToast(`Ticket #${ticketId} assigned to ${agent}.`, 'info');
  };

  const recordResolutionNotes = (ticketId: string, notes: string) => {
    const now = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, resolutionNotes: notes, status: 'Resolved', updatedAt: now } : t))
    );
    showToast(`Resolution documented and ticket #${ticketId} marked Resolved.`, 'success');
  };

  const getTicketById = (ticketId: string) => {
    return tickets.find((t) => t.id.toLowerCase() === ticketId.trim().toLowerCase());
  };

  /* Demo Appointment Scheduling Operations */
  const checkDemoConflict = (date: string, timeSlot: string, excludeDemoId?: string): boolean => {
    return demoAppointments.some(
      (d) =>
        d.id !== excludeDemoId &&
        d.status === 'Confirmed' &&
        d.preferredDate === date &&
        d.preferredTimeSlot === timeSlot
    );
  };

  const submitDemoRequest = async (payload: DemoRequestPayload): Promise<{ success: boolean; id: string; message: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const randomNum = Math.floor(10 + Math.random() * 90);
    const newId = `DMR-2026-00${randomNum}`;
    const today = new Date().toISOString().split('T')[0];
    const preferredDate = payload.preferredDate || today;
    const preferredTimeSlot = payload.preferredTimeSlot || '11:30 AM - 12:30 PM IST';

    const newAppointment: DemoAppointment = {
      id: newId,
      name: payload.name,
      organization: payload.organization,
      businessEmail: payload.businessEmail,
      phone: payload.phone,
      productInterest: payload.productInterest === 'all' ? 'Enterprise Suite / Multiple' : String(payload.productInterest),
      organizationSize: payload.organizationSize || '11-50 users',
      preferredDate,
      preferredTimeSlot,
      timeZone: payload.timeZone || 'Asia/Kolkata (IST)',
      message: payload.message || '',
      status: 'Awaiting Confirmation',
      assignedSalesRep: 'Unassigned (Sales Queue)',
      internalNotes: [],
      createdAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      updatedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    };

    setDemoAppointments((prev) => [newAppointment, ...prev]);
    showToast(`Demo Request #${newId} recorded. Awaiting administrator slot confirmation.`, 'success');
    return {
      success: true,
      id: newId,
      message: `Your demonstration request for ${payload.organization} has been recorded (Ref: ${newId}).`
    };
  };

  const confirmDemoAppointment = (demoId: string, meetingLink?: string): { success: boolean; message: string } => {
    const demo = demoAppointments.find((d) => d.id === demoId);
    if (!demo) return { success: false, message: 'Demo request not found.' };

    const conflict = checkDemoConflict(demo.preferredDate, demo.preferredTimeSlot, demoId);
    if (conflict) {
      showToast(`Scheduling Conflict: Another demonstration is already Confirmed for ${demo.preferredDate} at ${demo.preferredTimeSlot}. Please reschedule.`, 'error');
      return { success: false, message: 'Time slot conflict detected with another confirmed appointment.' };
    }

    const now = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    const link = meetingLink || `https://meet.saritainfotech.com/demo/${demoId.toLowerCase()}`;

    setDemoAppointments((prev) =>
      prev.map((d) =>
        d.id === demoId
          ? { ...d, status: 'Confirmed', meetingLink: link, updatedAt: now }
          : d
      )
    );
    showToast(`Demo Appointment #${demoId} Confirmed. Meeting link generated.`, 'success');
    return { success: true, message: 'Appointment confirmed successfully.' };
  };

  const rescheduleDemoAppointment = (
    demoId: string,
    newDate: string,
    newTimeSlot: string
  ): { success: boolean; message: string } => {
    const conflict = checkDemoConflict(newDate, newTimeSlot, demoId);
    if (conflict) {
      showToast(`Conflict Warning: A confirmed demo exists on ${newDate} at ${newTimeSlot}. Choose another slot.`, 'error');
      return { success: false, message: 'Target time slot has an existing confirmed appointment.' };
    }

    const now = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    setDemoAppointments((prev) =>
      prev.map((d) =>
        d.id === demoId
          ? {
              ...d,
              preferredDate: newDate,
              preferredTimeSlot: newTimeSlot,
              status: 'Rescheduled',
              updatedAt: now
            }
          : d
      )
    );
    showToast(`Demo #${demoId} rescheduled to ${newDate} (${newTimeSlot}).`, 'info');
    return { success: true, message: 'Demo rescheduled.' };
  };

  const cancelDemoAppointment = (demoId: string, reason?: string) => {
    const now = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    setDemoAppointments((prev) =>
      prev.map((d) => {
        if (d.id === demoId) {
          const notes: DemoInternalNote[] = reason
            ? [
                ...d.internalNotes,
                { id: `dnote-${Date.now()}`, author: adminUser?.name || 'Administrator', note: `Cancellation Reason: ${reason}`, timestamp: now }
              ]
            : d.internalNotes;
          return { ...d, status: 'Cancelled', internalNotes: notes, updatedAt: now };
        }
        return d;
      })
    );
    showToast(`Demo Request #${demoId} marked Cancelled.`, 'info');
  };

  const completeDemoAppointment = (demoId: string, outcomeNotes: string) => {
    const now = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    setDemoAppointments((prev) =>
      prev.map((d) =>
        d.id === demoId
          ? { ...d, status: 'Completed', outcomeNotes, updatedAt: now }
          : d
      )
    );
    showToast(`Demo #${demoId} completed and outcome recorded.`, 'success');
  };

  const addDemoInternalNote = (demoId: string, note: string) => {
    const now = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    const author = adminUser?.name || 'Sales Solutions Lead';
    const newNote: DemoInternalNote = {
      id: `dnote-${Date.now()}`,
      author,
      note,
      timestamp: now
    };

    setDemoAppointments((prev) =>
      prev.map((d) =>
        d.id === demoId
          ? { ...d, internalNotes: [...d.internalNotes, newNote], updatedAt: now }
          : d
      )
    );
    showToast('Internal sales note saved.', 'info');
  };

  const assignDemoSalesRep = (demoId: string, salesRep: string) => {
    const now = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    setDemoAppointments((prev) =>
      prev.map((d) =>
        d.id === demoId ? { ...d, assignedSalesRep: salesRep, updatedAt: now } : d
      )
    );
    showToast(`Demo #${demoId} assigned to ${salesRep}.`, 'info');
  };

  /* Partner Operations */
  const loginPartner = (email: string, pass: string): boolean => {
    if (email && pass) {
      setPartnerAuthenticated(true);
      localStorage.setItem('sit_demo_partner_auth', 'true');
      showToast(`Welcome back, ${CURRENT_PARTNER_PROFILE.contactPerson}!`, 'success');
      return true;
    }
    showToast('Please enter partner credentials.', 'error');
    return false;
  };

  const logoutPartner = () => {
    setPartnerAuthenticated(false);
    localStorage.removeItem('sit_demo_partner_auth');
    showToast('You have been logged out of Partner Portal.', 'info');
  };

  const addPartnerLead = (leadData: Omit<PartnerLead, 'id' | 'createdAt' | 'updatedAt' | 'status'>): string => {
    const randomId = `PL-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toISOString().split('T')[0];

    const newLead: PartnerLead = {
      ...leadData,
      id: randomId,
      status: 'New',
      createdAt: today,
      updatedAt: today
    };

    setPartnerLeads((prev) => [newLead, ...prev]);
    showToast(`Lead #${randomId} registered successfully for review.`, 'success');
    return randomId;
  };

  const updateLeadStatus = (leadId: string, status: PartnerLead['status']) => {
    const today = new Date().toISOString().split('T')[0];
    setPartnerLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status, updatedAt: today } : l))
    );
    showToast(`Lead #${leadId} updated to ${status}.`, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        tickets,
        addTicket,
        addTicketReply,
        addTicketInternalNote,
        updateTicketStatus,
        updateTicketPriority,
        updateTicketAgent,
        recordResolutionNotes,
        getTicketById,
        getCustomerTickets,
        customerAccounts,
        currentCustomer,
        customerAuthenticated,
        loginCustomer,
        registerCustomer,
        logoutCustomer,
        updateCustomerAccountStatus,
        adminUser,
        adminAuthenticated,
        loginAdmin,
        logoutAdmin,
        demoAppointments,
        submitDemoRequest,
        confirmDemoAppointment,
        rescheduleDemoAppointment,
        cancelDemoAppointment,
        completeDemoAppointment,
        addDemoInternalNote,
        assignDemoSalesRep,
        checkDemoConflict,
        partnerAuthenticated,
        loginPartner,
        logoutPartner,
        partnerProfile: CURRENT_PARTNER_PROFILE,
        partnerLeads,
        addPartnerLead,
        updateLeadStatus,
        toast,
        showToast,
        clearToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
