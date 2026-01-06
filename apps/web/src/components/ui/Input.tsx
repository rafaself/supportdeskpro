import { InputHTMLAttributes, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode; // Left icon
  rightElement?: ReactNode; // Button or icon on the right (e.g., eye toggle)
}

export function Input({ 
  label, 
  error, 
  icon, 
  rightElement, 
  id, 
  className = '', 
  ...props 
}: InputProps) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-2">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-20">
            <span className="text-slate-500 group-focus-within:text-indigo-600 transition-colors">
              {icon}
            </span>
          </div>
        )}
        
        <input
          id={id}
          className={`
            block w-full rounded-lg border bg-white py-2.5 text-slate-900 placeholder-slate-400 text-sm transition-all
            focus:outline-none focus:ring-4 
            ${icon ? 'pl-10' : 'px-3'}
            ${rightElement ? 'pr-10' : 'px-3'}
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' 
              : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/10'
            }
          `}
          {...props}
        />

        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 z-20">
            {rightElement}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1.5 text-sm text-red-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1.5" />
          {error}
        </p>
      )}
    </div>
  );
}
