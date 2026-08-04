import { useReveal } from '../hooks/useReveal';

function Reveal({ children, className = '', as: Tag = 'div', delay = 0, ...rest }) {
  const [ref, isVisible] = useReveal(0.3);

  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? 'reveal--visible' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
