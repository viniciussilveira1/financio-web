import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "@features/auth/pages/LoginPage";
import SignInPage from "@features/auth/pages/SignInPage";
import ForgetPasswordPage from "@features/auth/pages/ForgetPasswordPage";
import RequireAuth from "@components/ui/RequireAuth";
import DashboardPage from "@pages/DashboardPage";
import Layout from "@components/Layouts/Layout";
import WalletPage from "@pages/wallets/WalletPage";
import NotFound from "@pages/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/forget-password' element={<ForgetPasswordPage />} />

        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route path='/' element={<DashboardPage />} />
            <Route path='/wallets' element={<WalletPage />} />
          </Route>
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
