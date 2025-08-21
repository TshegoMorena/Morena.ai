import { useState, useEffect } from 'react';
import { getGreetings } from '@/lib/languages';

export function GreetingCarousel() {
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(4); // Start with "Thobela" (index 4)
  const [opacity, setOpacity] = useState(1);
  const greetings = getGreetings();

  useEffect(() => {
    // Reorder greetings to start with "Thobela"
    const reorderedGreetings = [...greetings.slice(4), ...greetings.slice(0, 4)];
    
    const interval = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setCurrentGreetingIndex((prev) => (prev + 1) % reorderedGreetings.length);
        setOpacity(1);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, [greetings]);

  const reorderedGreetings = [...greetings.slice(4), ...greetings.slice(0, 4)];
  
  return (
    <div 
      className="text-4xl md:text-6xl font-elegant font-bold text-african-gold mb-4 transition-opacity duration-300"
      style={{ opacity }}
    >
      {reorderedGreetings[currentGreetingIndex]}
    </div>
  );
}
