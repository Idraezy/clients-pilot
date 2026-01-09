'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, AlertTriangle } from 'lucide-react';
import { useApp } from './AppProvider';

export const SettingsPage: React.FC = () => {
  const { clients } = useApp();
  
  const handleExport = () => {
    const dataStr = JSON.stringify(clients, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `clientpilot-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      localStorage.removeItem('clientpilot-clients');
      window.location.reload();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your preferences and data</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Data Management</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Export Data</h3>
              <p className="text-sm text-gray-600">Download your client data as JSON</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Download size={18} />
              Export
            </motion.button>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Clear All Data</h3>
              <p className="text-sm text-gray-600">Permanently delete all clients</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearData}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <AlertTriangle size={18} />
              Clear Data
            </motion.button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-2">About ClientPilot</h3>
        <p className="text-sm text-blue-800">
          ClientPilot v1.0 - A professional client management dashboard for freelancers and small teams.
          All data is stored locally in your browser.
        </p>
      </div>
    </motion.div>
  );
};