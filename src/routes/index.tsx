import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "@features/auth/pages/LoginPage";
import SignInPage from "@features/auth/pages/SignInPage";
import ForgetPasswordPage from "@features/auth/pages/ForgetPasswordPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/forget-password' element={<ForgetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}
