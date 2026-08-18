import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";
import Dashboard from "../../features/dashboard/Dashboard";
import Transactions from "../../features/transaction/Transactions";
import Settings from "../../features/settings/Settings";
import Categories from "../../features/categories/Categories";






export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/transactions" element={<Transactions />} />

          <Route path="/categories" element={<Categories />} />

          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}