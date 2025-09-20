import React from 'react';
import { 
  FaRegFileAlt, 
  FaHeartbeat, 
  FaBrain, 
  FaLink, 
  FaDownload, 
  FaComments, 
  FaUsers, 
  FaShieldAlt 
} from 'react-icons/fa';

const NotesSection: React.FC = () => {
  return (
    <div className="bg-white p-6 border border-border-color rounded-lg shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <FaRegFileAlt className="text-xl text-text-light" />
        <div>
          <h3 className="text-xl font-bold text-navy">Notes</h3>
          <p className="text-sm text-text-light">Logistics Overview</p>
        </div>
      </div>

      {/* Top row of buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {/* Text updated below */}
        <button className="flex items-center justify-center gap-2 p-3 bg-gray-100 hover:bg-gray-200 rounded-md font-medium text-text-dark transition-colors text-sm">
          <FaHeartbeat className="text-primary-blue" />
          One-glance health
        </button>
        {/* Text updated below */}
        <button className="flex items-center justify-center gap-2 p-3 bg-gray-100 hover:bg-gray-200 rounded-md font-medium text-text-dark transition-colors text-sm">
          <FaBrain className="text-primary-blue" />
          AI brief
        </button>
        {/* Text updated below */}
        <button className="flex items-center justify-center gap-2 p-3 bg-gray-100 hover:bg-gray-200 rounded-md font-medium text-text-dark transition-colors text-sm">
          <FaLink className="text-primary-blue" />
          Links to details via cards
        </button>
        {/* Text updated below */}
        <button className="flex items-center justify-center gap-2 p-3 bg-gray-100 hover:bg-gray-200 rounded-md font-medium text-text-dark transition-colors text-sm">
          <FaDownload className="text-primary-blue" />
          Exports
        </button>
      </div>

      {/* Middle row of buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Text updated below */}
        <button className="flex items-center justify-center gap-2 p-3 bg-summary-blue hover:bg-blue-200 rounded-md font-semibold text-blue-800 transition-colors text-sm">
          <FaComments />
          Comments
        </button>
        {/* Text updated below */}
        <button className="flex items-center justify-center gap-2 p-3 bg-metrics-green hover:bg-green-200 rounded-md font-semibold text-green-800 transition-colors text-sm">
          <FaUsers />
          Owners
        </button>
      </div>

      {/* Bottom row button */}
      <div>
        {/* Text updated below */}
        <button className="w-full flex items-center justify-center gap-2 p-3 bg-package-purple hover:bg-purple-200 rounded-md font-semibold text-purple-800 transition-colors text-sm">
          <FaShieldAlt />
          Confidence badges
        </button>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-border-color">
        <p className="text-xs text-text-light">Dashboard notes and quick actions</p>
        <p className="text-xs text-text-light">Last updated: 18:28:09</p>
      </div>
    </div>
  );
};

export default NotesSection;