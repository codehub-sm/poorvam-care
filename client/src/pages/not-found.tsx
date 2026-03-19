import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-heading font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">Page Not Found</h2>
        <p className="text-gray-600 font-body mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-heading font-semibold hover:bg-blue-700 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
