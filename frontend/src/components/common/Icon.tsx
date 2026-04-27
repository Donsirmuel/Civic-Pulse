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
        justifyContent: 'center',
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
        lineHeight: 1,
      }}
    >
      {name}
    </span>
  );
}
