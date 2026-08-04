import Reveal from './Reveal';
import './Reviews.css';

const REVIEWS = [
  {
    name: 'Надя Зубарева',
    subtitle: 'мама, ребёнку 8 лет',
    vk: 'https://vk.com/id88484366',
    text: 'Занимаемся со Светланой Владимировной около двух месяцев. Звуки поставили буквально за 5 занятий, теперь их закрепляем. Диагноз ффнр, скрытая дизартрия. Все предыдущие логопеды говорили, что нам нужны 1,5–2 года непрерывных ежедневных занятий. Сейчас мы довольны. Результат действительно есть.',
    rating: 5,
  },
  {
    name: 'Ольга Фроловская',
    subtitle: 'мама, сыну 5,5 лет',
    vk: 'https://vk.com/oly111254',
    text: 'Светлана Владимировна занимается с сыном. За короткое время поставила проблемные звуки, сейчас идёт занятие на закрепление. Я очень довольна и благодарна за эффективность занятий с ребёнком.',
    rating: 5,
  },
  {
    name: 'Юлия Маслова',
    subtitle: 'занималась сама, звук «р»',
    vk: 'https://vk.com/julia_maslova',
    text: 'Занималась со Светланой Владимировной год — замечательный педагог и логопед. Не знала, как внедрить уже отработанный звук «р» в речь, но с ней поняла это уже на втором занятии. Теперь произношение почти полностью отшлифовано, спасибо ей за проделанную работу.',
    rating: 5,
  },
  {
    name: 'Алла Стебельцова',
    subtitle: 'мама, дочке 8 лет',
    vk: 'https://vk.com/id13691635',
    text: 'Занимались 3 месяца: автоматизировали «р», ставили «ш» и «ж». За это время звук «р» полностью решён, по остальным — значительные улучшения. Пробовались разные техники — если не подходила одна, сразу применялась другая. Полностью индивидуальный подход, преподаватель нацелен на результат, а не на количество занятий.',
    rating: 5,
  },
  {
    name: 'Николай Забелин',
    subtitle: 'родитель ученика',
    vk: 'https://vk.com/nick_zabelin',
    text: 'Занимались около 6 месяцев — в школе у ребёнка обнаружили нарушение письменной речи. Разбор домашней работы, новая тема, нейрогимнастика. В итоге почерк значительно улучшился. Занятия нам очень помогли, рекомендуем!',
    rating: 5,
  },
];

function Reviews() {
  return (
    <section id="reviews" className="section section-alt reviews">
      <div className="container">
        <Reveal className="section-header">
          <span className="eyebrow">Отзывы</span>
          <h2>Что говорят клиенты</h2>
          <p>Реальные отзывы с обсуждения ВКонтакте — с прямыми ссылками на профили авторов.</p>
        </Reveal>

        <div className="reviews__grid">
          {REVIEWS.map((review, index) => (
            <Reveal
              key={review.name}
              as="blockquote"
              className="reviews__card"
              delay={(index % 3) * 100}
            >
              <div className="reviews__stars" aria-label={`Оценка ${review.rating} из 5`}>
                {'★'.repeat(review.rating)}
              </div>
              <p className="reviews__text">«{review.text}»</p>
              <footer className="reviews__footer">
                <a
                  href={review.vk}
                  target="_blank"
                  rel="noreferrer"
                  className="reviews__author"
                >
                  {review.name}
                </a>
                <span className="reviews__subtitle">{review.subtitle}</span>
              </footer>
            </Reveal>
          ))}
        </div>

        <Reveal className="reviews__more" delay={100}>
          <a
            href="https://vk.com/topic-65485890_29392629"
            target="_blank"
            rel="noreferrer"
            className="reviews__more-link"
          >
            Читать все отзывы ВКонтакте →
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default Reviews;
