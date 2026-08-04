import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import PricingPage from './pages/PricingPage';
import DiagnostikaRechi from './pages/DiagnostikaRechi';
import PostanovkaZvukov from './pages/PostanovkaZvukov';

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
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
