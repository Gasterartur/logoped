import Reveal from './Reveal';
import './Advantages.css';

const ADVANTAGES = [
  { icon: '🎯', title: 'Индивидуальный подход', text: 'Программа занятий подбирается под конкретного ребёнка, а не по шаблону.' },
  { icon: '📚', title: 'Современные методики', text: 'Использую проверенные и авторские логопедические методики.' },
  { icon: '🧸', title: 'Игровая форма', text: 'Занятия проходят в увлекательной игровой форме — детям интересно.' },
  { icon: '🗓️', title: 'Удобное расписание', text: 'Гибкий график, занятия очно и онлайн в удобное для вас время.' },
];

function Advantages() {
  return (
    <section className="section advantages">
      <div className="container">
        <Reveal className="section-header">
          <span className="eyebrow">Почему выбирают меня</span>
          <h2>Забота, результат и комфорт для всей семьи</h2>
        </Reveal>

        <div className="advantages__grid">
          {ADVANTAGES.map((item, index) => (
            <Reveal key={item.title} className="advantages__item" delay={(index % 4) * 100}>
              <div className="advantages__icon" aria-hidden="true">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Advantages;
