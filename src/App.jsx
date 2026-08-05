import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import PricingPage from './pages/PricingPage';
import DiagnostikaRechi from './pages/DiagnostikaRechi';
import PostanovkaZvukov from './pages/PostanovkaZvukov';
import Credentials from './pages/Credentials';
import Afaziolog from './pages/Afaziolog';
import ABATerapiya from './pages/ABATerapiya';
import LogopedVzroslyh from './pages/LogopedVzroslyh';
import Zaikolog from './pages/Zaikolog';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uslugi-i-ceny" element={<PricingPage />} />
          <Route path="/diagnostika-rechi" element={<DiagnostikaRechi />} />
          <Route path="/postanovka-zvukov" element={<PostanovkaZvukov />} />
          <Route path="/diplomy-i-sertifikaty" element={<Credentials />} />
          <Route path="/afaziolog" element={<Afaziolog />} />
          <Route path="/logoped-dlya-vzroslyh" element={<LogopedVzroslyh />} />
          <Route path="/zaikolog" element={<Zaikolog />} />
          <Route path="/aba-terapiya" element={<ABATerapiya />} />
          <Route path="/politika-konfidencialnosti" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
