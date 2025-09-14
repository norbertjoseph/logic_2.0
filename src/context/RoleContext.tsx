import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Role = 'ceo' | 'north-manager' | 'south-manager' | 'east-manager' | 'west-manager';

interface RoleContextType {
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [currentRole, setCurrentRole] = useState<Role>('ceo');

  return (
    <RoleContext.Provider value={{ currentRole, setCurrentRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};