import { ReactNode } from 'react';

type BadgeVariant = 'success' | 'warning' | 'info' | 'neutral' | 'danger';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
  const variants = {
    success: "bg-green-50 text-green-700 ring-green-600/20",
    warning: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
    info: "bg-indigo-50 text-indigo-700 ring-indigo-700/10",
    neutral: "bg-slate-50 text-slate-600 ring-slate-500/10",
    danger: "bg-red-50 text-red-700 ring-red-600/10",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
