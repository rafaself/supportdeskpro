import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  isLoading?: boolean;
  children: ReactNode;
}

export function Button({ 
  className = '', 
  variant = 'primary', 
  isLoading = false, 
  children, 
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  
  const variants = {
    primary: "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus:ring-indigo-500/30",
    outline: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-500/10",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-500/10",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/30",
  };

  const sizes = "px-4 py-2.5"; // Standard size

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
