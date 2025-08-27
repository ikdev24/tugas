import React from 'react';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef(function Button(
  { className, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
});
