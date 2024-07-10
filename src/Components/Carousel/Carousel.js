import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './Carousel.module.css';
import image1 from '../../assets/images/1.png';
import image2 from '../../assets/images/2.png';


export function CarouselWithContent() {
  const images = [image1, image2];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const handleCarouselChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Carousel
      showThumbs={false}
      autoPlay={false}
      selectedItem={currentIndex}
      onChange={handleCarouselChange}
    >
      {images.map((image, index) => (
        <div key={index}>
          
          <img src={image} alt={`image ${index + 1}`} className={styles['carousel-image']} />
          <div className={styles['carousel-content']}>
            <Typography
              variant="h1"
              color="white"
            
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              <span>F</span>a<span>ll</span> / Winter <span>2</span>0
              <span>2</span>3 <span>C</span>ollection
            </Typography>
{/* 
            <div className="flex justify-center">
              <Button variant="contained" color="primary" size="large"  className={styles.shop}>
                Shop Now
              </Button>
            </div> */}
          </div>
        </div>
      ))}
    </Carousel>
  );
}

export default CarouselWithContent;
