import { type FormEvent } from 'react';
import { Icon } from '../common';
import type { CivicFeedFilters } from './FilterBar';

interface ViewToolbarProps {
  scope: CivicFeedFilters['scope'];
  contentType: CivicFeedFilters['contentType'];
  searchValue: string;
  onScopeChange: (value: CivicFeedFilters['scope']) => void;
  onContentTypeChange: (value: CivicFeedFilters['contentType']) => void;
  onSearchValueChange: (value: string) => void;
  onSearchSubmit: () => void;
}

const scopeOptions: Array<{ value: CivicFeedFilters['scope']; label: string }> = [
  { value: 'all', label: 'Nationwide' },
  { value: 'state', label: 'State' },
  { value: 'local', label: 'LGA' },
];

const contentOptions: Array<{ value: CivicFeedFilters['contentType']; label: string }> = [
  { value: 'all', label: 'All Posts' },
  { value: 'official', label: 'Official Posts' },
  { value: 'issue', label: 'Reports' },
  { value: 'post', label: 'Updates' },
];

export default function ViewToolbar({
  scope,
  contentType,
  searchValue,
  onScopeChange,
  onContentTypeChange,
  onSearchValueChange,
  onSearchSubmit,
}: ViewToolbarProps) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearchSubmit();
  };

  return (
    <header
      className="sticky top-0 z-20 border-b"
      style={{ borderColor: 'var(--civic-border)', background: 'var(--civic-glass)' }}
    >
      <div className="px-4 py-4 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="mx-auto grid max-w-[760px] gap-3 md:grid-cols-2 xl:grid-cols-[210px_210px_minmax(0,1fr)]"
        >
          <div className="relative md:min-w-0">
            <select
              value={scope}
              onChange={(event) => onScopeChange(event.target.value as CivicFeedFilters['scope'])}
              className="w-full appearance-none rounded-[20px] border px-12 py-3.5 pr-11 text-sm font-semibold outline-none transition hover:border-[var(--civic-border-strong)]"
              style={{
                background: 'var(--civic-surface)',
                borderColor: 'var(--civic-border)',
                color: 'var(--civic-text)',
                boxShadow: '0 6px 18px rgba(22,33,51,0.04)',
              }}
            >
              {scopeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Icon
              name="location_on"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[18px] text-[var(--civic-primary)]"
            />
            <Icon
              name="keyboard_arrow_down"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[18px] text-[var(--civic-muted)]"
            />
          </div>

          <div className="relative md:min-w-0">
            <select
              value={contentType}
              onChange={(event) => onContentTypeChange(event.target.value as CivicFeedFilters['contentType'])}
              className="w-full appearance-none rounded-[20px] border px-12 py-3.5 pr-11 text-sm font-semibold outline-none transition hover:border-[var(--civic-border-strong)]"
              style={{
                background: 'var(--civic-surface)',
                borderColor: 'var(--civic-border)',
                color: 'var(--civic-text)',
                boxShadow: '0 6px 18px rgba(22,33,51,0.04)',
              }}
            >
              {contentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Icon
              name="tune"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[18px] text-[var(--civic-primary)]"
            />
            <Icon
              name="keyboard_arrow_down"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[18px] text-[var(--civic-muted)]"
            />
          </div>

          <div
            className="relative flex min-h-[54px] min-w-0 items-center overflow-hidden rounded-[20px] border bg-[var(--civic-surface)] pl-12 pr-2"
            style={{
              borderColor: 'var(--civic-border)',
              boxShadow: '0 6px 18px rgba(22,33,51,0.04)',
            }}
          >
            <Icon
              name="search"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[18px] text-[var(--civic-muted)]"
            />
            <input
              type="search"
              value={searchValue}
              onChange={(event) => onSearchValueChange(event.target.value)}
              placeholder="Search Civic Pulse"
              className="min-h-12 min-w-0 flex-1 bg-transparent pr-3 text-sm text-[var(--civic-text)] placeholder:text-[var(--civic-muted)] outline-none"
            />
            <button
              type="submit"
              className="inline-flex h-10 min-w-10 shrink-0 items-center justify-center rounded-[14px] px-3 transition hover:brightness-105"
              style={{
                background: 'linear-gradient(135deg, var(--civic-primary) 0%, var(--civic-primary-deep) 100%)',
                color: 'var(--civic-primary-contrast)',
              }}
              aria-label="Search"
            >
              <Icon name="arrow_forward" className="text-[18px]" />
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}
