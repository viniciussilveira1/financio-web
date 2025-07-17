import { type JSX } from "react";
import { FiLogOut, FiSearch, FiGrid, FiSettings } from "react-icons/fi";
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
    <div className='h-screen w-64 bg-sidebar text-sidebar border-r border-sidebar p-4 flex flex-col justify-between'>
      <div>
        <div className='text-2xl font-bold mb-6 text-primary'>Financio</div>
        <div className='mb-4 relative'>
          <input
            type='text'
            placeholder='Search'
            className='w-full py-2 px-3 bg-secondary-100 rounded outline-none border border-secondary-200 focus:border-primary focus:ring-1 focus:ring-primary'
          />
          <FiSearch className='absolute top-2.5 right-3 w-4 h-4 text-secondary-400' />
        </div>
        {Object.entries(grouped).map(([section, items]) => (
          <div key={section}>
            {section !== "Home" && (
              <p className='uppercase text-xs text-secondary-400 mt-4 mb-2'>
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
                    className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer transition-colors
                      ${
                        isActive
                          ? "bg-primary-50 text-primary font-semibold"
                          : "hover:bg-primary-50 hover:text-primary"
                      }
                    `}
                  >
                    <div className='flex items-center gap-2'>
                      {icon}
                      <span>{label}</span>
                    </div>
                    {badge && (
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

      <div className='space-y-3'>
        <div className='flex items-center gap-2 justify-between px-3'></div>
        <div className='flex items-center justify-between bg-secondary-100 p-2 rounded border border-secondary-200'>
          <div className='flex items-center gap-2'>
            <PiUserFocus className='w-8 h-8 text-primary' />
            <span className='text-sm font-medium'>USUARIO</span>
          </div>
          <FiLogOut
            className='w-4 h-4 text-secondary-400 cursor-pointer hover:text-primary transition-colors'
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
