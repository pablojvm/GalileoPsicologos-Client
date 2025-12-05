import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import ContactSection from "./components/Contact";
import SobreNosotros from "./pages/SobreNosotros";
import { Route, Routes } from "react-router-dom";
import Booking from "./pages/Booking";
import PsychologistDashboard from "./pages/PsychologistDashboard";
import AuthCallback from "./components/AuthCallBack";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Services />
              <ContactSection />
            </>
          }
        />
        <Route path="/sobreNosotros" element={<SobreNosotros />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/dashboard" element={<PsychologistDashboard />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
