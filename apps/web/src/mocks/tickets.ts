import { mockRequest } from './utils';

export interface TicketData {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: 'open' | 'closed' | 'in_progress';
  createdAt: string;
}

export interface ActivityData {
  id: string;
  type: 'system' | 'message';
  content: string;
  author?: string;
  createdAt: string;
}

export const createTicketMock = async (
  ticket: Omit<TicketData, 'id' | 'status' | 'createdAt'>
) => {
  const newTicket: TicketData = {
    ...ticket,
    id: Math.random().toString(36).substring(7),
    status: 'open',
    createdAt: new Date().toISOString(),
  };

  return mockRequest(newTicket);
};

export const getTicketsMock = async () => {
  const tickets: TicketData[] = [
    {
      id: '1',
      title: 'Cannot access VPN',
      description: 'I try to connect but it times out.',
      category: 'technical',
      priority: 'high',
      status: 'open',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Request for new monitor',
      description: 'My current monitor is flickering.',
      category: 'hardware',
      priority: 'medium',
      status: 'in_progress',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  return mockRequest(tickets);
};

export const replyTicketMock = async (ticketId: string, message: string) => {
  const newActivity: ActivityData = {
    id: Math.random().toString(36).substring(7),
    type: 'message',
    content: message,
    author: 'JD', // Mocked current user
    createdAt: new Date().toISOString(),
  };
  return mockRequest(newActivity);
};