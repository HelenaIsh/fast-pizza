import type { MouseEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  onClick,
  disabled,
  to,
  type: size = 'primary',
}: {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  to?: string;
  type?: 'small' | 'primary' | 'secondary' | 'round';
}) {
  const baseStyles =
    'text-sm bg-yellow-400 uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-color duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';
  const styles = {
    primary: baseStyles + ' px-4 py-3 md:px-6 md:py-4',
    small: baseStyles + ' text-xs px-4 py-2 md:px-5 md:py-2.5',
    secondary:
      'text-sm xinline-block rounded-full border-2 border-stone-200 px-4 py-2.5 md:px-6 md:py-3.5 uppercase font-semibold text-stone-400 inline-block tracking-wide rounded-full hover:bg-stone-300 hover:text-stone-800 transition-color duration-300 focus:outline-none focus:ring focus:ring-stone-200 focus:text-stone-800 focus:ring-offset-2 disabled:cursor-not-allowed',
    round: baseStyles + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
  };
  if (to) {
    return (
      <Link to={to} className={styles[size]}>
        {children}
      </Link>
    );
  }
  return (
    <button disabled={disabled} onClick={onClick} className={styles[size]}>
      {children}
    </button>
  );
}
