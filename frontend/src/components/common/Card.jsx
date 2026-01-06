import { Link } from 'react-router-dom';

const Card = ({
  id,
  title,
  subtitle = '', // e.g., artist name, year, duration
  image,
  type = 'video', // 'video' or 'music' — determines route
  aspect = 'portrait', // 'portrait' (2:3 for videos), 'square' (1:1 for music)
  overlay = true, // show title/subtitle on hover
  className = '',
}) => {
  const aspectClasses = aspect === 'square' 
    ? 'aspect-square' 
    : 'aspect-[2/3]';

  return (
    <Link
      to={type === 'music' ? `/music/${id}` : `/video/${id}`}
      className={`group block ${className}`}
    >
      <div className="relative overflow-hidden rounded-lg shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:z-10">
        <img
          src={image}
          alt={title}
          className={`w-full ${aspectClasses} object-cover`}
        />

        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            {subtitle && (
              <p className="text-sm text-gray-300 mt-1">{subtitle}</p>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default Card;