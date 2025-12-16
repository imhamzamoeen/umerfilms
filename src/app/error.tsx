'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-center p-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-400 mb-6 max-w-md">
          We encountered an unexpected error. Please try again or refresh the page.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-gradient-to-r from-[#450E93] to-[#D5007F] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
