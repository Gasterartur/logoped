import Reveal from './Reveal';
import './About.css';

const FACTS = [
  'Высшее дефектологическое образование, МГПУ',
  'Стаж логопедической работы — 12 лет',
  'Работа с ОНР, ЗРР, дислалией, дизартрией, заиканием',
  'Регулярное повышение квалификации и участие в конференциях',
];

function About() {
  return (
    <section id="about" className="section about">
      <div className="container about__inner">
        <Reveal className="about__media">
          <img className="about__photo" src="/image/karimova2.png" alt="Светлана Каримова" />
        </Reveal>

        <Reveal className="about__content" delay={150}>
          <span className="eyebrow">Обо мне</span>
          <h2>Логопед, которому доверяют родители</h2>
          <p className="about__text">
            Меня зовут Светлана, я логопед-дефектолог с 12-летним опытом работы с детьми.
            Помогаю детям справляться с речевыми трудностями в комфортной игровой форме —
            без слёз и давления. За время практики более 500 детей начали говорить чище,
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
        </Reveal>
      </div>
    </section>
  );
}

export default About;
