import { useReveal } from '../hooks/useReveal';

function Reveal({ children, className = '', as: Tag = 'div', delay = 0, direction, threshold = 0.45, animate = true, ...rest }) {
  const [ref, isVisible] = useReveal(threshold);
  const directionClass = direction ? `reveal--from-${direction}` : '';

  if (!animate) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

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
