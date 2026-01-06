const Loader = ({ size = "md", fullScreen = false }) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    : "flex items-center justify-center py-20";

  return (
    <div className={containerClasses}>
      <div className="relative">
        {/* Outer rotating ring */}
        <div
          className={`animate-spin rounded-full border-4 border-gray-700 border-t-red-600 ${sizes[size]}`}
        />

        {/* Inner pulsing circle */}
        <div
          className={`absolute inset-0 animate-ping rounded-full bg-gradient-to-r from-red-600 to-purple-600 opacity-30 ${sizes[size]}`}
        />

        {/* Center glow */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-purple-500 blur-xl opacity-50 ${sizes[size]}`}
        />

        {/* StreamHub logo pulse (optional text) */}
        {size === "lg" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white animate-pulse">
              StreamHub
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loader;