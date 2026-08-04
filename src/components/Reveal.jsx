import { useReveal } from '../hooks/useReveal';

function Reveal({ children, className = '', as: Tag = 'div', delay = 0, direction, ...rest }) {
  const [ref, isVisible] = useReveal(0.45);
  const directionClass = direction ? `reveal--from-${direction}` : '';

  return (
    <Tag
      ref={ref}
      className={`reveal ${directionClass} ${isVisible ? 'reveal--visible' : ''} ${className}`
        .replace(/\s+/g, ' ')
        .trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
