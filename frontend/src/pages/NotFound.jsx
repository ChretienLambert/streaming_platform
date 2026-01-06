import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-600">404</h1>
        <p className="text-3xl mt-6 text-gray-300">Page Not Found</p>
        <Link to="/" className="mt-10 inline-block bg-red-600 px-8 py-4 rounded-lg text-xl hover:bg-red-700 transition">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;