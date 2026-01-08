'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useApp } from './AppProvider';
import { StatusBadge } from './StatusBadge';

export const Dashboard: React.FC = () => {
  const { clients } = useApp();
  
  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'Active').length,
    leads: clients.filter(c => c.status === 'Lead').length,
    completed: clients.filter(c => c.status === 'Completed').length
  };

  const recentClients = clients.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your client overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Clients', value: stats.total, color: 'blue', icon: Users },
          { label: 'Active', value: stats.active, color: 'green', icon: Users },
          { label: 'Leads', value: stats.leads, color: 'blue', icon: Users },
          { label: 'Completed', value: stats.completed, color: 'gray', icon: Users }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-lg bg-blue-100">
                <stat.icon className="text-blue-600" size={24} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Clients</h2>
        </div>
        <div className="p-6">
          {recentClients.length === 0 ? (
            <div className="text-center py-12">
              <Users size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No clients yet. Add your first client to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentClients.map((client, i) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{client.name}</h3>
                    <p className="text-sm text-gray-600">{client.company || client.email}</p>
                  </div>
                  <StatusBadge status={client.status} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};