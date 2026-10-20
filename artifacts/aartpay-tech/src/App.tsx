import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Escrow from './pages/escrow';
import Crypto from './pages/crypto';
import Airtime from './pages/airtime';
import Electricity from './pages/electricity';
import Cable from './pages/cable';
import Betting from './pages/betting';
import DollarCards from './pages/dollar-cards';
import GiftCards from './pages/giftcards';
import FundWallet from './pages/fund-wallet';
import Transactions from './pages/transactions';
import Transfer from './pages/transfer';
import DataPage from './pages/data';
import Login from './pages/Login';
import Register from './pages/Register';
import Utilities from './pages/utilities';
import Service from './pages/service';
import Signin from './pages/signin';
import Signup from './pages/signup';
import NotFound from './pages/not-found';

export default function App() {
  return (
    <Routes>
      {/* Auth - compulsory login */}
      <Route path="/" element={<Navigate to="/Login" replace />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/register" element={<Register />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

      {/* Main Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/* Your real services from morning */}
      <Route path="/escrow" element={<Escrow />} />
      <Route path="/crypto" element={<Crypto />} />
      <Route path="/airtime" element={<Airtime />} />
      <Route path="/data" element={<DataPage />} />
      <Route path="/electricity" element={<Electricity />} />
      <Route path="/tv" element={<Cable />} />
      <Route path="/cable" element={<Cable />} />
      <Route path="/betting" element={<Betting />} />
      <Route path="/dollar-cards" element={<DollarCards />} />
      <Route path="/gift-cards" element={<GiftCards />} />
      <Route path="/giftcards" element={<GiftCards />} />
      <Route path="/fund-wallet" element={<FundWallet />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/transfer" element={<Transfer />} />
      <Route path="/utilities" element={<Utilities />} />
      <Route path="/service" element={<Service />} />

      {/* Catch all */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/Login" replace />} />
    </Routes>
  );
}
