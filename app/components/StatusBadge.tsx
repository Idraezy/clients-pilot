'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Client } from '../types';

export const StatusBadge: React.FC<{ status: Client['status'] }> = ({ status }) => {
  const colors = {
    Lead: 'bg-blue-100 text-blue-700',
    Active: 'bg-green-100 text-green-700',
    Completed: 'bg-gray-100 text-gray-700'
  };

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status]}`}
    >
      {status}
    </motion.span>
  );
};