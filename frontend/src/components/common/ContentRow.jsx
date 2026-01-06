import { Link } from 'react-router-dom';

const ContentRow = ({ title, items }) => {
  return (
    <section className="mb-16 group">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 px-6 md:px-8">{title}</h2>
      <div className="flex overflow-x-auto scrollbar-hide gap-4 px-6 md:px-8 pb-8 scroll-smooth snap-x snap-mandatory">
        {items.map((item) => (
          <Link
            key={item.id}
            to={item.type === 'music' ? `/music/${item.id}` : `/video/${item.id}`}
            className="flex-none w-48 sm:w-64 md:w-72 lg:w-80 snap-start"
          >
            <div className="relative overflow-hidden rounded-xl shadow-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-72 sm:h-80 md:h-96 lg:h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold">{item.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ContentRow;