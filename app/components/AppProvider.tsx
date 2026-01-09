// App.tsx
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeContext } from './ThemeContext';
import { Client, View } from './types';
import { MOCK_CLIENTS } from './mockData';
import { LoadingScreen } from './components/LoadingScreen';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ClientsView } from './components/ClientsView';
import { SettingsView } from './components/SettingsView';
import { ClientModal } from './components/ClientModal';
import { AddClientModal } from './components/AddClientModal';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | Client['status']>('All');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage or use mock data
  useEffect(() => {
    const stored = localStorage.getItem('clientpilot_clients');
    const storedTheme = localStorage.getItem('clientpilot_theme');
    
    if (storedTheme === 'dark') {
      setDarkMode(true);
    }
    
    setTimeout(() => {
      if (stored) {
        setClients(JSON.parse(stored));
      } else {
        setClients(MOCK_CLIENTS);
        localStorage.setItem('clientpilot_clients', JSON.stringify(MOCK_CLIENTS));
      }
      setIsLoading(false);
    }, 800);
  }, []);

  // Save to localStorage whenever clients change
  useEffect(() => {
    if (clients.length > 0) {
      localStorage.setItem('clientpilot_clients', JSON.stringify(clients));
    }
  }, [clients]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('clientpilot_theme', newMode ? 'dark' : 'light');
  };

  const addClient = (client: Omit<Client, 'id' | 'createdAt'>) => {
    const newClient: Client = {
      ...client,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setClients([newClient, ...clients]);
    setIsAddingClient(false);
  };

  const updateClient = (updatedClient: Client) => {
    setClients(clients.map(c => c.id === updatedClient.id ? updatedClient : c));
    setSelectedClient(updatedClient);
  };

  const deleteClient = (id: string) => {
    setClients(clients.filter(c => c.id !== id));
    setSelectedClient(null);
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.company?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'Active').length,
    leads: clients.filter(c => c.status === 'Lead').length,
    completed: clients.filter(c => c.status === 'Completed').length
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
        {isLoading ? (
          <LoadingScreen darkMode={darkMode} />
        ) : (
          <div className="flex h-screen overflow-hidden">
            <Sidebar currentView={currentView} setCurrentView={setCurrentView} stats={stats} />
            <main className="flex-1 overflow-y-auto">
              <Header 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onAddClient={() => setIsAddingClient(true)}
              />
              <AnimatePresence mode="wait">
                {currentView === 'dashboard' && (
                  <Dashboard 
                    key="dashboard"
                    stats={stats}
                    clients={clients}
                    onViewClients={() => setCurrentView('clients')}
                  />
                )}
                {currentView === 'clients' && (
                  <ClientsView
                    key="clients"
                    clients={filteredClients}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    onSelectClient={setSelectedClient}
                  />
                )}
                {currentView === 'settings' && (
                  <SettingsView key="settings" />
                )}
              </AnimatePresence>
            </main>
          </div>
        )}

        {/* Client Details Modal */}
        <AnimatePresence>
          {selectedClient && (
            <ClientModal
              client={selectedClient}
              onClose={() => setSelectedClient(null)}
              onUpdate={updateClient}
              onDelete={deleteClient}
            />
          )}
        </AnimatePresence>

        {/* Add Client Modal */}
        <AnimatePresence>
          {isAddingClient && (
            <AddClientModal
              onClose={() => setIsAddingClient(false)}
              onAdd={addClient}
            />
          )}
        </AnimatePresence>
      </div>
    </ThemeContext.Provider>
  );
}