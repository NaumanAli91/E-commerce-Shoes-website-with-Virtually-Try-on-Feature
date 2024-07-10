import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import styles from './Collections.module.css'; // Import your CSS module
import 'react-multi-carousel/lib/styles.css';
import Product from './Product';
import product_0 from '../../assets/images/collection1.png';
import product_1 from '../../assets/images/collection2.png';
import product_2 from '../../assets/images/collection3.png';
import product_3 from '../../assets/images/collection5.png';

const Collections = () => {
    const [animationClass, setAnimationClass] = useState('');
    useEffect(() => {
        setAnimationClass(styles['blink']); 
        return () => {
            setAnimationClass('');
        };
    }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const productData = [
      { id: 1, url: product_0, buttonText: "Buy Now", overlayText: "Mens thrifted shoes", route: "/Menshoes" },
      { id: 2, url: product_1, buttonText: "Buy Now", overlayText: "Womens thrifted shoes", route: "/Womenshoes" },
      { id: 3, url: product_2, buttonText: "Buy Now", overlayText: "Unisex thrifted caps", route: "/Caps" },
      { id: 4, url: product_3, buttonText: "Buy Now", overlayText: "Mens thrifted shirt", route: "/Shirts" }
  ];
  
  const products = productData.map((item) => (
      <Product
          key={item.id}
          url={item.url}
          buttonText={item.buttonText}
          overlayText={item.overlayText}
          route={item.route}
      />
  ));
  

    return (
        <div className={styles.collection}>
            <h1 className={`${styles.collectionTitle} ${animationClass}`}>Our Collection</h1>
            <Carousel
                responsive={responsive}
                containerClass={styles['carousel-container']}
                itemClass={styles['carousel-item']}
            >
                {products}
            </Carousel>
        </div>
    );
}

export default Collections;
