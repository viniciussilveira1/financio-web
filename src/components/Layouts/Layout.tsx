import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";

export default function Layout() {
  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar />
      <main className='flex-1 overflow-y-auto p-6 text-app'>
        <div className='bg-white p-4 rounded-md mx-auto shadow-md'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
