import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar />
      <main className='flex-1 overflow-y-auto p-6 bg-app-secondary text-app'>
        <Outlet />
      </main>
    </div>
  );
}
