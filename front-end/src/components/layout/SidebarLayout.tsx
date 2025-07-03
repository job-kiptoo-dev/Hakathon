import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { Navigation } from './Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: SidebarItem[];
}

interface SidebarLayoutProps {
  children: React.ReactNode;
  userType: 'applicant' | 'employer' | 'admin';
  sidebarItems: SidebarItem[];
  title?: string;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  children,
  userType,
  sidebarItems,
  title
}) => {
  const { user } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!user) {
    return null;
  }

  const isActiveRoute = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={cn("flex flex-col h-full", mobile ? "w-full" : "")}>
      {title && (
        <div className="p-4 border-b">
          <h2 className={cn(
            "font-semibold text-lg text-gray-900",
            !mobile && sidebarCollapsed && "hidden"
          )}>
            {title}
          </h2>
        </div>
      )}
      
      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.href);
            
            return (
              <div key={item.href}>
                <Link
                  to={item.href}
                  onClick={() => mobile && setSidebarOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                    !mobile && sidebarCollapsed && "justify-center px-2"
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {(!sidebarCollapsed || mobile) && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
                
                {item.children && (!sidebarCollapsed || mobile) && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      const isChildActive = isActiveRoute(child.href);
                      
                      return (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => mobile && setSidebarOpen(false)}
                          className={cn(
                            "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
                            isChildActive
                              ? "bg-blue-50 text-blue-600"
                              : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                          )}
                        >
                          <ChildIcon className="w-4 h-4 flex-shrink-0" />
                          <span className="flex-1">{child.label}</span>
                          {child.badge && (
                            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                              {child.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType={userType} />
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className={cn(
          "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:top-16 lg:z-40 bg-white border-r border-gray-200 transition-all duration-300",
          sidebarCollapsed ? "lg:w-16" : "lg:w-64"
        )}>
          <div className="flex items-center justify-between p-2 border-b">
            {!sidebarCollapsed && (
              <span className="text-sm font-medium text-gray-500">Navigation</span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="h-8 w-8 p-0"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
          <SidebarContent />
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden fixed top-20 left-4 z-40 bg-white shadow-md"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent mobile />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className={cn(
          "flex-1 transition-all duration-300",
          "lg:ml-64",
          sidebarCollapsed && "lg:ml-16"
        )}>
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
