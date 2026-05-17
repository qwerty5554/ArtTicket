import { Routes, Route } from "react-router-dom";

import { AdminLayout } from "./components/AdminLayout";

import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";

import TopMuseumsPage from "./pages/TopMuseumsPage";
import MustSeePage from "./pages/MustSeePage";
import HermitagePage from "./pages/HermitagePage";
import MuseumsPage from "./pages/MuseumsPage";
import ExhibitionsPage from "./pages/ExhibitionsPage";

import TicketBookingPage from "./pages/TicketBookingPage";

import MuseumDetailsPage from "./pages/MuseumDetailsPage";

import SupportPage from "./pages/SupportPage";

import DashboardPage from "./pages/DashboardPage";
import BookingPage from "./pages/BookingPage";
import ChatPage from "./pages/ChatPage";

import FaqPage from "./pages/FaqPage";
import RefundPage from "./pages/RefundPage";
import RulesPage from "./pages/RulesPage";

export default function App() {
  return (
    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/profile" element={<ProfilePage />} />

      <Route path="/must-see" element={<MustSeePage />} />
      <Route path="/top-museums" element={<TopMuseumsPage />} />
      <Route path="/hermitage-day" element={<HermitagePage />} />

      <Route path="/museums" element={<MuseumsPage />} />
      <Route path="/exhibitions" element={<ExhibitionsPage />} />

      <Route path="/booking" element={<TicketBookingPage />} />

      <Route path="/museum" element={<MuseumDetailsPage />} />

      <Route path="/support" element={<SupportPage />} />

      <Route path="/faq" element={<FaqPage />} />
      <Route path="/refund" element={<RefundPage />} />
      <Route path="/rules" element={<RulesPage />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="bookings" element={<BookingPage />} />
        <Route path="chat" element={<ChatPage />} />
      </Route>

    </Routes>
  );
}