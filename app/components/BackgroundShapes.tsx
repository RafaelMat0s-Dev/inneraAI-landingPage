// components/BackgroundShapes.tsx
"use client";

const BackgroundShapes = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Vibrant Circle 1 */}
      <div className="absolute w-28 h-28 bg-gradient-to-r from-purple-500 via-pink-500 to-pink-400 rounded-full top-10 left-10 animate-float1 opacity-70"></div>
      {/* Vibrant Circle 2 */}
      <div className="absolute w-20 h-20 bg-gradient-to-r from-pink-500 via-purple-400 to-purple-300 rounded-full top-1/4 left-1/2 animate-float2 opacity-70"></div>
      {/* Vibrant Circle 3 */}
      <div className="absolute w-24 h-24 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400 rounded-full top-2/3 left-1/3 animate-float3 opacity-70"></div>
      {/* Vibrant Circle 4 */}
      <div className="absolute w-16 h-16 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500 rounded-full top-1/2 left-3/4 animate-float1 opacity-70"></div>
    </div>
  );
};

export default BackgroundShapes;