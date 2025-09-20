import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteUserModal: React.FC<InviteUserModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'CEO' | 'Plant Manager'>('Plant Manager');

  const handleInvite = () => {
    console.log('Inviting user:', { email, role });
    // Add API call logic here
    onClose(); // Close modal after sending
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-text-dark">Invite New User</h3>
          <button onClick={onClose} className="text-text-light hover:text-text-dark">
            <FaTimes />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-light mb-2" htmlFor="email">Email Address</label>
            <input
              type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-border-color rounded-md"
              placeholder="new.user@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light mb-2" htmlFor="role">Role</label>
            <select
              id="role" value={role} onChange={e => setRole(e.target.value as any)}
              className="w-full px-3 py-2 border border-border-color rounded-md bg-white"
            >
              <option>Plant Manager</option>
              <option>CEO</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-8">
          <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-text-dark bg-gray-100 rounded-md hover:bg-gray-200">
            Cancel
          </button>
          <button onClick={handleInvite} className="px-4 py-2 text-sm font-semibold text-white bg-primary-blue rounded-md hover:bg-blue-700">
            Send Invite
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteUserModal;