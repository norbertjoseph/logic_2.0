import React, { useState } from 'react';
import { usersData } from '../../mockData';
import type { User } from '../../types';
import InviteUserModal from './InviteUserModal';
import { FaPlus, FaSearch } from 'react-icons/fa';

const statusStyles: Record<User['status'], string> = {
  Active: 'bg-green-100 text-green-800',
  Invited: 'bg-blue-100 text-blue-800',
};

const UserManagement: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white p-6 rounded-lg border border-border-color shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="relative w-full md:w-auto">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" />
            <input type="text" placeholder="Search users..." className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-md" />
          </div>
          <button onClick={() => setShowModal(true)} className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-primary-blue text-white font-semibold rounded-md hover:bg-blue-700">
            <FaPlus /> Invite User
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-light uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3">User</th>
                <th scope="col" className="px-4 py-3">Role</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3">Last Login</th>
                <th scope="col" className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map(user => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <p className="font-semibold text-text-dark">{user.name}</p>
                    <p className="text-xs text-text-light">{user.email}</p>
                  </td>
                  <td className="px-4 py-4 text-text-dark">{user.role}</td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[user.status]}`}>{user.status}</span>
                  </td>
                  <td className="px-4 py-4 text-text-dark">{user.lastLogin}</td>
                  <td className="px-4 py-4">
                    <button className="font-medium text-primary-blue hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <InviteUserModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default UserManagement;