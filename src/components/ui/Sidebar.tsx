import { useState, type JSX } from "react";
import {
  FiLogOut,
  FiSearch,
  FiGrid,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { IoWalletSharp } from "react-icons/io5";
import { PiUserFocus } from "react-icons/pi";
import { useNavigate, useLocation } from "react-router-dom";

type NavItem = {
  label: string;
  icon: JSX.Element;
  path: string;
  section?: string;
  badge?: number;
};

enum NavItemSection {
  APPLICATIONS = "Aplicações",
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <FiGrid />, path: "/" },
  {
    label: "Carteiras",
    icon: <IoWalletSharp />,
    path: "/wallets",
    section: NavItemSection.APPLICATIONS,
  },
  { label: "Configurações", icon: <FiSettings />, path: "/settings" },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const grouped = navItems.reduce<Record<string, NavItem[]>>((acc, item) => {
    const section = item.section || "Home";
    if (!acc[section]) acc[section] = [];
    acc[section].push(item);
    return acc;
  }, {});

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className={`h-screen bg-sidebar text-sidebar border-r border-sidebar p-4 flex flex-col justify-between transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top */}
      <div>
        {/* Logo / Title */}
        <div className='flex items-center justify-between mb-6'>
          {!collapsed && (
            <div className='text-2xl font-bold text-primary'>Financio</div>
          )}
          <button
            className='p-1 rounded hover:bg-primary/5 transition-colors'
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        </div>

        {/* Search */}
        {!collapsed && (
          <div className='mb-4 relative'>
            <input
              type='text'
              placeholder='Search'
              className='w-full py-2 px-3 bg-secondary-100 rounded outline-none border border-secondary-200 focus:border-primary focus:ring-1 focus:ring-primary'
            />
            <FiSearch className='absolute top-2.5 right-3 w-4 h-4 text-secondary-400' />
          </div>
        )}

        {Object.entries(grouped).map(([section, items]) => (
          <div key={section}>
            {section !== "Home" && !collapsed && (
              <p className='uppercase text-xs text-secondary-400 mt-4 mb-2 px-3 py-1 bg-secondary-50 rounded'>
                {section}
              </p>
            )}
            <ul>
              {items.map(({ label, icon, badge, path }) => {
                const isActive = location.pathname === path;
                return (
                  <li
                    key={label}
                    onClick={() => navigate(path)}
                    className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer transition-all duration-150 h-10 sidebar-item ${
                      isActive ? "active" : ""
                    } ${collapsed ? "collapsed" : ""}`}
                  >
                    <div className='flex items-center gap-3'>
                      {icon}
                      {!collapsed && <span>{label}</span>}
                    </div>
                    {!collapsed && badge && (
                      <span className='text-xs bg-primary text-white rounded-full px-2 py-0.5'>
                        {badge}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom - User */}
      <div className='space-y-3'>
        <div
          className='flex items-center justify-between bg-secondary-100 p-2 rounded border border-secondary-200 cursor-pointer'
          onClick={handleLogout}
        >
          <div className='flex items-center gap-2'>
            <PiUserFocus className='w-8 h-8 text-primary' />
            {!collapsed && (
              <div className='flex flex-col'>
                <span className='text-sm font-medium'>USUARIO</span>
                <span className='text-xs text-secondary-400'>Admin</span>
              </div>
            )}
          </div>
          {!collapsed && (
            <FiLogOut className='w-4 h-4 text-secondary-400 hover:text-primary transition-colors' />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
