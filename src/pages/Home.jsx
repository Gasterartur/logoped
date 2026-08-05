import Seo from '../components/Seo';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Advantages from '../components/Advantages';
import Prices from '../components/Prices';
import Reviews from '../components/Reviews';
import Contacts from '../components/Contacts';

function Home() {
  return (
    <>
      <Seo
        title="Светлана Каримова — логопед-дефектолог в Самаре и онлайн"
        description="Логопед-дефектолог с 2005 года: постановка звуков, запуск речи у детей, работа с афазией и заиканием у взрослых. Занятия онлайн."
        path="/"
      />
      <Hero />
      <About />
      <Services />
      <Advantages />
      <Prices />
      <Reviews />
      <Contacts />
    </>
  );
}

export default Home;
