import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  characterCount?: number;
  maxCharacters?: number;
}

export function Textarea({ 
  label, 
  helperText, 
  characterCount, 
  maxCharacters, 
  id, 
  className = '', 
  ...props 
}: TextareaProps) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-2">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <textarea
          id={id}
          className="block w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 sm:text-sm transition-all disabled:opacity-60"
          {...props}
        />
        {(helperText || (characterCount !== undefined && maxCharacters)) && (
          <div className="mt-2 flex justify-between text-xs text-slate-400">
            <span>{helperText}</span>
            {characterCount !== undefined && maxCharacters && (
              <span>{characterCount}/{maxCharacters}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
