interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
}

export default function Icon({ name, className = '', filled = false }: IconProps) {
  const fillClass = filled ? 'fill-current' : '';

  return (
    <span
      className={`material-symbols-outlined ${fillClass} ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {name}
    </span>
  );
}
