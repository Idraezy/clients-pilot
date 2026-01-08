'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client } from '../types';
import { mockClients } from '../data/mockClients';

interface AppContextType {
  clients: Client[];
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('clientpilot-clients');
    
    if (stored) {
      setClients(JSON.parse(stored));
    } else {
      setClients(mockClients);
      localStorage.setItem('clientpilot-clients', JSON.stringify(mockClients));
    }
    
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('clientpilot-clients', JSON.stringify(clients));
    }
  }, [clients, initialized]);

  const addClient = (client: Omit<Client, 'id' | 'createdAt'>) => {
    const newClient: Client = {
      ...client,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setClients(prev => [newClient, ...prev]);
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteClient = (id: string) => {
    setClients(prev => prev.filter(c => c.id !== id));
  };

  return (
    <AppContext.Provider value={{ clients, addClient, updateClient, deleteClient }}>
      {children}
    </AppContext.Provider>
  );
};