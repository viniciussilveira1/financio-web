import { type JSX } from "react";
import {
  FiLogOut,
  FiSearch,
  FiMail,
  FiCalendar,
  FiBell,
  FiMessageSquare,
  FiGrid,
  FiLayout,
  FiActivity,
  FiFileText,
  FiMessageCircle,
  FiSettings,
} from "react-icons/fi";
import { PiUserFocus } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

type NavItem = {
  label: string;
  icon: JSX.Element;
  path: string;
  section?: string;
  badge?: number;
};

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <FiGrid />, path: "/" },
  { label: "Mail", icon: <FiMail />, path: "/mail", section: "Applications" },
  {
    label: "Calendar",
    icon: <FiCalendar />,
    path: "/calendar",
    section: "Applications",
  },
  {
    label: "Notifications",
    icon: <FiBell />,
    path: "/notifications",
    section: "Applications",
    badge: 7,
  },
  {
    label: "Messages",
    icon: <FiMessageSquare />,
    path: "/messages",
    section: "Applications",
    badge: 3,
  },
  {
    label: "Kanban Board",
    icon: <FiLayout />,
    path: "/kanban",
    section: "Tools",
  },
  {
    label: "Timeline",
    icon: <FiActivity />,
    path: "/timeline",
    section: "Tools",
  },
  {
    label: "Documentation",
    icon: <FiFileText />,
    path: "/docs",
    section: "Tools",
  },
  {
    label: "Forum",
    icon: <FiMessageCircle />,
    path: "/forum",
    section: "Tools",
    badge: 4,
  },
  { label: "Settings", icon: <FiSettings />, path: "/settings" },
];

const Sidebar: React.FC = () => {
  const grouped = navItems.reduce<Record<string, NavItem[]>>((acc, item) => {
    const section = item.section || "Home";
    if (!acc[section]) acc[section] = [];
    acc[section].push(item);
    return acc;
  }, {});
  const navigate = useNavigate();

  return (
    <div className='h-screen w-64 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border-r dark:border-zinc-800 p-4 flex flex-col justify-between'>
      <div>
        <div className='text-2xl font-bold mb-6'>Financio</div>
        <div className='mb-4 relative'>
          <input
            type='text'
            placeholder='Search'
            className='w-full py-2 px-3 bg-zinc-100 dark:bg-zinc-800 rounded outline-none'
          />
          <FiSearch className='absolute top-2.5 right-3 w-4 h-4 text-zinc-400' />
        </div>
        {Object.entries(grouped).map(([section, items]) => (
          <div key={section}>
            {section !== "Home" && (
              <p className='uppercase text-xs text-zinc-400 mt-4 mb-2'>
                {section}
              </p>
            )}
            <ul>
              {items.map(({ label, icon, badge, path }) => (
                <li
                  key={label}
                  onClick={() => navigate(path)}
                  className='flex items-center justify-between px-3 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded cursor-pointer'
                >
                  <div className='flex items-center gap-2'>
                    {icon}
                    <span>{label}</span>
                  </div>
                  {badge && (
                    <span className='text-xs bg-blue-600 text-white rounded-full px-2 py-0.5'>
                      {badge}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className='space-y-3'>
        <div className='flex items-center gap-2 justify-between px-3'></div>
        <div className='flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 p-2 rounded'>
          <div className='flex items-center gap-2'>
            <PiUserFocus className='w-8 h-8' />
            <span className='text-sm'>USUARIO</span>
          </div>
          <FiLogOut className='w-4 h-4 text-zinc-400 cursor-pointer' />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
