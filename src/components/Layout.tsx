// src/components/Layout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className='flex'>
      <Sidebar />
      <main className='flex-1 p-6 bg-gray-100 dark:bg-zinc-950 text-black dark:text-white'>
        <Outlet />
      </main>
    </div>
  );
}
