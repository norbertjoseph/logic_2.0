import React, { createContext, useState, useContext, ReactNode } from 'react';

export type DateFilter = 'today' | 'yesterday' | '2daysAgo';

interface DateContextType {
  selectedDate: DateFilter;
  setSelectedDate: (date: DateFilter) => void;
}

const DateContext = createContext<DateContextType | undefined>(undefined);

export const DateProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState<DateFilter>('today');

  return (
    <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDate = () => {
  const context = useContext(DateContext);
  if (context === undefined) {
    throw new Error('useDate must be used within a DateProvider');
  }
  return context;
};