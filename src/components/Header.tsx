"use client";

import { Menu, Bell, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";
import React from "react";
import { useDate, DateFilter } from "@/context/DateContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title = "Manufacturing Dashboard", 
  subtitle = "Real-time manufacturing dashboard for comprehensive production oversight" 
}) => {
  const { selectedDate, setSelectedDate } = useDate();

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <div className="h-full">
              <Sidebar />
            </div>
          </SheetContent>
        </Sheet>
        <div className="hidden md:block">
          <h1 className="text-lg font-bold">{title}</h1>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <div className="flex flex-1 items-center gap-4 md:gap-6 justify-end">
        <Select value={selectedDate} onValueChange={(value) => setSelectedDate(value as DateFilter)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="2daysAgo">2 days ago</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;