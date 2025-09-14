"use client";

import { Menu, Bell, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";
import React from "react";
import { useDate, DateFilter } from "@/context/DateContext";
import { useRole, Role } from "@/context/RoleContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const roleNames: Record<Role, string> = {
  ceo: "CEO",
  "north-manager": "North Plant Manager",
  "south-manager": "South Plant Manager",
  "east-manager": "East Plant Manager",
  "west-manager": "West Plant Manager",
};

const Header: React.FC<HeaderProps> = ({ 
  title = "Manufacturing Dashboard", 
  subtitle = "Real-time manufacturing dashboard for comprehensive production oversight" 
}) => {
  const { selectedDate, setSelectedDate } = useDate();
  const { currentRole, setCurrentRole } = useRole();

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">{roleNames[currentRole]}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setCurrentRole('ceo')}>CEO</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setCurrentRole('north-manager')}>North Plant Manager</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setCurrentRole('south-manager')}>South Plant Manager</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setCurrentRole('east-manager')}>East Plant Manager</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setCurrentRole('west-manager')}>West Plant Manager</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;