import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import karimova2 from '../assets/images/karimova2.png';
import './About.css';

const FACTS = [
  'Высшее дефектологическое образование — Самарский государственный педагогический (социально-педагогический) университет',
  'Практикует с 2005 года — более 20 лет опыта',
  'Работает с ОНР, алалией, дизартрией, дислалией, заиканием, афазией и другими нарушениями речи',
  'Регулярно проходит курсы повышения квалификации и сертификации',
];

function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about__inner">
          <Reveal className="about__media">
            <img className="about__photo" src={karimova2} alt="Светлана Каримова" />
          </Reveal>

          <Reveal className="about__content" delay={150}>
            <span className="eyebrow">Обо мне</span>
            <h2>Логопед, которому доверяют родители</h2>
            <p className="about__text">
              Меня зовут Светлана, я специальный психолог и учитель-логопед. Практикую с 2005 года —
              помогаю детям и взрослым справляться с речевыми трудностями в комфортной и бережной
              атмосфере, без слёз и давления. За время практики сотни людей начали говорить чище,
              увереннее и с удовольствием.
            </p>

            <ul className="about__facts">
              {FACTS.map((fact) => (
                <li key={fact}>
                  <span className="about__check" aria-hidden="true">✓</span>
                  {fact}
                </li>
              ))}
            </ul>

            <Link to="/diplomy-i-sertifikaty" className="about__more-link">
              Смотреть дипломы и сертификаты →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default About;
