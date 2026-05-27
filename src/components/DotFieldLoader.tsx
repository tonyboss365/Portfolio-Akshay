import { motion } from "motion/react";

interface DotFieldLoaderProps {
  dotSize?: number;
  count?: number;
  speed?: number;
  color?: string;
  size?: number;
}

export function DotFieldLoader({
  dotSize = 3,
  count = 54,
  speed = 1.2,
  color = "bg-blue-600 dark:bg-blue-400",
  size = 96
}: DotFieldLoaderProps) {
  // Generate Phyllotaxis (Golden Spiral) coordinates
  const dots = Array.from({ length: count }).map((_, i) => {
    const theta = i * 137.5 * (Math.PI / 180); // Golden angle in radians
    const scaleFactor = (size / 96) * 5.2;
    const r = scaleFactor * Math.sqrt(i); // Radius scaling factor
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);
    
    // Assign a delay based on radius/index for wave expansion effect
    const delay = (i / count) * speed;
    
    return { x, y, delay, index: i };
  });

  return (
    <div 
      style={{ width: `${size}px`, height: `${size}px` }}
      className="relative flex items-center justify-center select-none overflow-hidden bg-transparent"
    >
      {/* Rotator layer */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 12 / speed,
          ease: "linear",
        }}
        className="w-full h-full relative flex items-center justify-center"
      >
        {dots.map((dot) => (
          <motion.div
            key={dot.index}
            style={{
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              left: `calc(50% + ${dot.x}px - ${dotSize / 2}px)`,
              top: `calc(50% + ${dot.y}px - ${dotSize / 2}px)`,
            }}
            animate={{
              scale: [0.3, 1.3, 0.3],
              opacity: [0.2, 0.95, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: speed * 1.5,
              delay: dot.delay,
              ease: "easeInOut",
            }}
            className={`absolute rounded-full shadow-inner ${color}`}
          />
        ))}
      </motion.div>
    </div>
  );
}
