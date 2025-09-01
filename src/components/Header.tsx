import { Menu, Sparkles } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";
import AISidebar from "./AISidebar";
import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          {/* We need to wrap Sidebar in a div to control its height inside the sheet */}
          <div className="h-full">
            <Sidebar />
          </div>
        </SheetContent>
      </Sheet>

      <h1 className="text-xl font-bold text-sidebar-primary">LOGIC LEAP</h1>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0">
            <Sparkles className="h-5 w-5" />
            <span className="sr-only">Toggle AI Insight Panel</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-0">
           {/* We need to wrap AISidebar in a div to control its height inside the sheet */}
          <div className="h-full">
            <AISidebar />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;