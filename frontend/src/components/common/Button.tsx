import type { ButtonHTMLAttributes } from 'react';
import Icon from './Icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  loading = false,
  fullWidth = false,
  iconOnly = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-[0.14em] transition-all duration-200 disabled:cursor-not-allowed';

  const variantStyles = {
    primary:
      'rounded-full bg-[linear-gradient(135deg,var(--civic-primary)_0%,var(--civic-primary-deep)_100%)] text-[var(--civic-primary-contrast)] hover:brightness-105 shadow-[0_18px_38px_rgba(10,106,59,0.16)]',
    secondary:
      'rounded-full bg-[var(--civic-surface-strong)] text-[var(--civic-text)] shadow-[inset_0_0_0_1px_var(--civic-ghost-border)] hover:bg-[var(--civic-surface)]',
    outline:
      'rounded-full bg-transparent text-[var(--civic-text)] shadow-[inset_0_0_0_1px_var(--civic-ghost-border)] hover:bg-[var(--civic-primary-glow)] hover:text-[var(--civic-primary)]',
    ghost: 'rounded-full bg-transparent text-[var(--civic-muted)] hover:bg-[var(--civic-primary-glow)] hover:text-[var(--civic-primary)]',
  } as const;

  const sizeStyles = {
    sm: iconOnly ? 'size-10 text-[11px]' : 'min-h-10 px-4 text-[11px]',
    md: iconOnly ? 'size-12 text-[11px]' : 'min-h-12 px-5 text-[11px]',
    lg: iconOnly ? 'size-14 text-xs' : 'min-h-14 px-6 text-xs',
  } as const;

  return (
    <button
      className={[
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? 'w-full' : '',
        disabled || loading ? 'opacity-55' : '',
        className,
      ]
        .join(' ')
        .trim()}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Icon name="progress_activity" className="animate-spin text-lg" />
          {!iconOnly && <span>Processing</span>}
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <Icon name={icon} className="shrink-0 text-lg" />}
          {!iconOnly && <span>{children}</span>}
          {icon && iconPosition === 'right' && <Icon name={icon} className="shrink-0 text-lg" />}
        </>
      )}
    </button>
  );
}
