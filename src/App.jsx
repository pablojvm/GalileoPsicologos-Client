import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import ContactSection from "./components/Contact";
import SobreNosotros from "./pages/SobreNosotros";
import { Route, Routes } from "react-router-dom";
import Booking from "./pages/Reserva";

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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
