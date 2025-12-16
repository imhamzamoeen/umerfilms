import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#450E93] to-[#D5007F]">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-400 mb-8 max-w-md mx-auto">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#450E93] to-[#D5007F] text-white rounded-lg hover:from-[#5a1bb8] hover:to-[#e6009a] transition-colors font-medium"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
