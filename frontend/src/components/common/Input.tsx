import { forwardRef, useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import Icon from './Icon';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, error, helperText, type = 'text', className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const shellClass = error
      ? 'bg-[rgba(218,92,78,0.08)] shadow-[inset_0_0_0_1px_rgba(218,92,78,0.3)]'
      : 'bg-[var(--civic-surface-strong)] shadow-[inset_0_0_0_1px_var(--civic-ghost-border)] focus-within:shadow-[inset_0_0_0_1px_rgba(10,106,59,0.32),0_0_0_2px_rgba(10,106,59,0.08)]';

    return (
      <div className="w-full">
        {label && (
          <label className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--civic-muted)]">
            {label}
          </label>
        )}

        <div className={`relative rounded-md transition ${shellClass}`}>
          {icon && (
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--civic-muted)]">
              <Icon name={icon} className="text-[1.15rem]" />
            </div>
          )}

          <input
            ref={ref}
            type={inputType}
            className={`
              w-full bg-transparent py-4 text-[15px] text-[var(--civic-text)] placeholder:text-[var(--civic-muted)]
              focus:outline-none
              ${icon ? 'pl-12' : 'pl-4'}
              ${isPassword ? 'pr-12' : 'pr-4'}
              ${className}
            `}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--civic-muted)] transition-colors hover:text-[var(--civic-text)]"
              tabIndex={-1}
            >
              <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="text-[1.15rem]" />
            </button>
          )}
        </div>

        {error && (
          <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#c53a2f]">
            <Icon name="error" className="text-sm" />
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="mt-2 text-xs text-[var(--civic-muted)]">{helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
