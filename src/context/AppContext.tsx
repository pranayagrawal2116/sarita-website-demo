import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportTicket, TicketMessage, PartnerLead, DemoRequestPayload } from '../types';
import { INITIAL_TICKETS } from '../data/supportData';
import { INITIAL_LEADS, CURRENT_PARTNER_PROFILE } from '../data/partnerData';

interface AppContextType {
  // Support Tickets
  tickets: SupportTicket[];
  addTicket: (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'timeline' | 'assignedAgent'>) => string;
  addTicketReply: (ticketId: string, message: string, senderType: 'customer' | 'support_agent') => void;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => void;
  updateTicketAgent: (ticketId: string, agent: string) => void;
  getTicketById: (ticketId: string) => SupportTicket | undefined;

  // Partner Portal
  partnerAuthenticated: boolean;
  loginPartner: (email: string, pass: string) => boolean;
  logoutPartner: () => void;
  partnerProfile: typeof CURRENT_PARTNER_PROFILE;
  partnerLeads: PartnerLead[];
  addPartnerLead: (lead: Omit<PartnerLead, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => string;
  updateLeadStatus: (leadId: string, status: PartnerLead['status']) => void;

  // Demo Requests
  demoRequests: DemoRequestPayload[];
  submitDemoRequest: (payload: DemoRequestPayload) => Promise<{ success: boolean; message: string }>;

  // Notification Toast
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  clearToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Support Tickets State
  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('sit_demo_tickets');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_TICKETS;
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

  // Demo requests
  const [demoRequests, setDemoRequests] = useState<DemoRequestPayload[]>(() => {
    const saved = localStorage.getItem('sit_demo_requests');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('sit_demo_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('sit_demo_partner_leads', JSON.stringify(partnerLeads));
  }, [partnerLeads]);

  useEffect(() => {
    localStorage.setItem('sit_demo_requests', JSON.stringify(demoRequests));
  }, [demoRequests]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4500);
  };

  const clearToast = () => setToast(null);

  // Ticket Operations
  const addTicket = (ticketData: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'timeline' | 'assignedAgent'>): string => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `SIT-${randomNum}`;
    const now = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

    const newTicket: SupportTicket = {
      ...ticketData,
      id: newId,
      createdAt: now,
      updatedAt: now,
      assignedAgent: 'Unassigned (Auto-Triage)',
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
    showToast(`Support Ticket #${newId} created successfully.`, 'success');
    return newId;
  };

  const addTicketReply = (ticketId: string, message: string, senderType: 'customer' | 'support_agent') => {
    const now = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const senderName = senderType === 'customer' ? t.customerName : t.assignedAgent.split('(')[0].trim() || 'Sarita Support Desk';
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
    showToast('Reply added to ticket conversation.', 'success');
  };

  const updateTicketStatus = (ticketId: string, status: SupportTicket['status']) => {
    const now = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status, updatedAt: now } : t))
    );
    showToast(`Ticket #${ticketId} status updated to ${status}.`, 'info');
  };

  const updateTicketAgent = (ticketId: string, agent: string) => {
    const now = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, assignedAgent: agent, updatedAt: now } : t))
    );
    showToast(`Ticket #${ticketId} assigned to ${agent}.`, 'info');
  };

  const getTicketById = (ticketId: string) => {
    return tickets.find((t) => t.id.toLowerCase() === ticketId.trim().toLowerCase());
  };

  // Partner Operations
  const loginPartner = (email: string, pass: string): boolean => {
    // Demonstration login: accepts demo partner or any non-empty credentials in mock mode
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

  // Demo Request Submission
  const submitDemoRequest = async (payload: DemoRequestPayload): Promise<{ success: boolean; message: string }> => {
    // Simulate brief network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check duplicate in current mock session
    const isDuplicate = demoRequests.some(
      (req) => req.businessEmail.toLowerCase() === payload.businessEmail.toLowerCase() && req.productInterest === payload.productInterest
    );

    if (isDuplicate) {
      return {
        success: false,
        message: 'A demo request for this email and product is already recorded. Our team will contact you shortly.'
      };
    }

    setDemoRequests((prev) => [payload, ...prev]);
    showToast(`Thank you ${payload.name}! Demo request submitted successfully.`, 'success');
    return {
      success: true,
      message: 'Your software demonstration request has been recorded. (Simulated Prototype Action)'
    };
  };

  return (
    <AppContext.Provider
      value={{
        tickets,
        addTicket,
        addTicketReply,
        updateTicketStatus,
        updateTicketAgent,
        getTicketById,
        partnerAuthenticated,
        loginPartner,
        logoutPartner,
        partnerProfile: CURRENT_PARTNER_PROFILE,
        partnerLeads,
        addPartnerLead,
        updateLeadStatus,
        demoRequests,
        submitDemoRequest,
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
