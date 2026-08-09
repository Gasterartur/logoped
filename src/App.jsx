import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import PricingPage from './pages/PricingPage';
import ServiceDetail from './pages/ServiceDetail';
import Credentials from './pages/Credentials';
import VideoGallery from './pages/VideoGallery';
import Admin from './pages/Admin';

function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uslugi-i-ceny" element={<PricingPage />} />
          <Route path="/diagnostika-rechi" element={<ServiceDetail id="diagnostika-rechi" />} />
          <Route path="/postanovka-zvukov" element={<ServiceDetail id="postanovka-zvukov" />} />
          <Route path="/diplomy-i-sertifikaty" element={<Credentials />} />
          <Route path="/afaziolog" element={<ServiceDetail id="afaziolog" />} />
          <Route path="/logoped-dlya-vzroslyh" element={<ServiceDetail id="logoped-dlya-vzroslyh" />} />
          <Route path="/zaikolog" element={<ServiceDetail id="zaikolog" />} />
          <Route path="/aba-terapiya" element={<ServiceDetail id="aba-terapiya" />} />
          <Route path="/video" element={<VideoGallery />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </>
  );
}

export default App;
