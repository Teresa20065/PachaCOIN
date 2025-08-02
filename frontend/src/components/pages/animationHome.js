// FourImageAnimation.jsx
import React, { useState, useEffect } from 'react';
import './animationHome.css';
import img1 from '../../img/animacion/Frente1.png';
import img2 from '../../img/animacion/Frente2.png';
import img3 from '../../img/animacion/Frente3.png';

// Este componente solo devuelve el contenedor de la animación
function FourImageAnimation() {
  const images = [img1,img1,img1,img1,img1,img1,img1,img1,img2,img3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(idx => (idx + 1) % images.length);
    }, 150); // cambia cada 600ms
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="animation-container">
      <img
        src={images[currentIndex]}
        alt={`frame-${currentIndex}`}
        className="animated-image"
      />
    </div>
  );
}

export default FourImageAnimation;