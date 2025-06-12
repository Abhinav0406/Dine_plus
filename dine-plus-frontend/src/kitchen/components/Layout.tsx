import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { ChefHat, BarChart } from 'lucide-react';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

export const KitchenLayout: React.FC = () => {
  const location = useLocation();
  
  const sidebarItems: SidebarItem[] = [
    {
      icon: <ChefHat size={20} />,
      label: 'Orders',
      path: '/kitchen/orders',
    },
    {
      icon: <BarChart size={20} />,
      label: 'Analytics',
      path: '/kitchen/analytics',
    },
  ];

  return (
    <div className="flex h-screen bg-[#121212]">
      {/* Sidebar */}
      <div className="w-64 bg-[#1E1E1E] border-r border-[#333333]">
        <div className="p-4">
          <h1 className="text-xl font-bold text-white">Kitchen Dashboard</h1>
        </div>
        <nav className="mt-8">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium ${
                location.pathname === item.path
                  ? 'text-green-500 bg-[#2A2A2A]'
                  : 'text-gray-400 hover:text-white hover:bg-[#2A2A2A]'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};
