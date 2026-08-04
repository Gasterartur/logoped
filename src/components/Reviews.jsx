import Reveal from './Reveal';
import './Reviews.css';

const REVIEWS = [
  {
    name: 'Марина, мама Тимофея (4 года)',
    text: 'За полгода занятий сын перестал бояться разговаривать с чужими людьми, речь стала гораздо чище. Светлана находит подход к любому ребёнку!',
    rating: 5,
  },
  {
    name: 'Ольга, мама Софии (6 лет)',
    text: 'Готовились к школе, подтянули все звуки за три месяца. Занятия всегда проходят весело, дочка ждёт их с нетерпением.',
    rating: 5,
  },
  {
    name: 'Дмитрий, папа Артёма (5 лет)',
    text: 'Занимались онлайн из другого города — очень удобно и результативно. Видно, что специалист действительно любит своё дело.',
    rating: 5,
  },
];

function Reviews() {
  return (
    <section id="reviews" className="section section-alt reviews">
      <div className="container">
        <Reveal className="section-header">
          <span className="eyebrow">Отзывы</span>
          <h2>Что говорят родители</h2>
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
              <footer className="reviews__author">{review.name}</footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;
