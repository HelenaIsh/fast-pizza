import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  onClick,
  disabled,
  to,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  to?: string;
}) {
  const className =
    'bg-yellow-400 uppercase font-semibold text-stone-800 py-3 px-4 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-color duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed md:px-6 sm:py-4';
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button disabled={disabled} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
