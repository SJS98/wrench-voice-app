
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserAuthProvider } from '@/contexts/UserAuthContext';
import { TutorialProvider } from '@/contexts/TutorialContext';
import { TutorialOverlay } from '@/components/tutorial/TutorialOverlay';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Services from '@/pages/Services';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import Search from '@/pages/Search';
import UsedVehicles from '@/pages/UsedVehicles';
import SpareParts from '@/pages/SpareParts';
import SOS from '@/pages/SOS';

function App() {
  return (
    <UserAuthProvider>
      <TutorialProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/register" element={<Register />} />
              <Route path="/services" element={<Services />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/search" element={<Search />} />
              <Route path="/used-vehicles" element={<UsedVehicles />} />
              <Route path="/spare-parts" element={<SpareParts />} />
              <Route path="/sos" element={<SOS />} />
            </Routes>
            <TutorialOverlay />
            <Toaster />
          </div>
        </Router>
      </TutorialProvider>
    </UserAuthProvider>
  );
}

export default App;
