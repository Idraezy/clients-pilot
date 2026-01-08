import { Client } from "../types";

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Industries',
    status: 'Active',
    notes: 'Working on website redesign project. Deadline: End of month.',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'mchen@startupco.io',
    phone: '+1 (555) 234-5678',
    company: 'StartupCo',
    status: 'Lead',
    notes: 'Interested in branding package. Follow up next week.',
    createdAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '3',
    name: 'Emma Williams',
    email: 'emma@designs.com',
    phone: '+1 (555) 345-6789',
    company: 'Creative Designs',
    status: 'Completed',
    notes: 'Logo design completed successfully. Great feedback received!',
    createdAt: '2023-12-01T09:00:00Z'
  },
  {
    id: '4',
    name: 'David Martinez',
    email: 'david.m@consulting.com',
    phone: '+1 (555) 456-7890',
    status: 'Active',
    notes: 'Monthly retainer client. Next meeting scheduled for Friday.',
    createdAt: '2024-01-10T11:00:00Z'
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    email: 'lisa@shoplocal.com',
    phone: '+1 (555) 567-8901',
    company: 'ShopLocal',
    status: 'Lead',
    notes: 'Requested quote for e-commerce platform. Awaiting budget approval.',
    createdAt: '2024-01-25T16:00:00Z'
  }
];