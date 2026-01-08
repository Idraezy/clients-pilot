'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Mail, Phone, Building2, Edit2, Trash2, Users } from 'lucide-react';
import { useApp } from './AppProvider';
import { StatusBadge } from './StatusBadge';
import { ClientModal } from './ClientModal';
import { Client } from '../types';

export const ClientsPage: React.FC = () => {
  const { clients, updateClient, deleteClient, addClient } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Client['status'] | 'All'>('All');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isNewClient, setIsNewClient] = useState(false);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (client.company?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesStatus = statusFilter === 'All' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddClient = () => {
    setIsNewClient(true);
    setSelectedClient(null);
    setShowModal(true);
  };

  const handleEditClient = (client: Client) => {
    setIsNewClient(false);
    setSelectedClient(client);
    setShowModal(true);
  };

  const handleSave = (clientData: Omit<Client, 'id' | 'createdAt'> | Client) => {
    if (isNewClient) {
      addClient(clientData as Omit<Client, 'id' | 'createdAt'>);
    } else {
      updateClient((clientData as Client).id, clientData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Clients</h1>
          <p className="text-gray-600">Manage all your clients in one place</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddClient}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg"
        >
          <Plus size={20} />
          Add Client
        </motion.button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as Client['status'] | 'All')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Lead">Lead</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {filteredClients.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Users size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm || statusFilter !== 'All' ? 'No clients found' : 'No clients yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'All' 
                ? 'Try adjusting your search or filters' 
                : 'Get started by adding your first client'}
            </p>
            {!searchTerm && statusFilter === 'All' && (
              <button
                onClick={handleAddClient}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
              >
                <Plus size={20} />
                Add Your First Client
              </button>
            )}
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filteredClients.map((client, i) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className="p-5 rounded-lg border border-gray-200 hover:border-blue-300 transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                      <StatusBadge status={client.status} />
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail size={16} />
                        <span>{client.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={16} />
                        <span>{client.phone}</span>
                      </div>
                      {client.company && (
                        <div className="flex items-center gap-2">
                          <Building2 size={16} />
                          <span>{client.company}</span>
                        </div>
                      )}
                    </div>
                    {client.notes && (
                      <p className="mt-3 text-sm text-gray-700 line-clamp-2">{client.notes}</p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEditClient(client)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this client?')) {
                          deleteClient(client.id);
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <ClientModal
            client={selectedClient}
            onClose={() => setShowModal(false)}
            onSave={handleSave}
            isNew={isNewClient}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};