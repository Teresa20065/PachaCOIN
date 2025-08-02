// FourImageAnimation.jsx
import React, { useState, useEffect } from 'react';
import './animation.css';
import img1 from '../img/animacion/camin5.png';
import img2 from '../img/animacion/caminando1.png';
import img3 from '../img/animacion/caminando2.png';
import img4 from '../img/animacion/caminando3.png';

// Este componente solo devuelve el contenedor de la animación
function FourImageAnimation() {
  const images = [img1, img2, img3, img4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(idx => (idx + 1) % images.length);
    }, 600); // cambia cada 600ms
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