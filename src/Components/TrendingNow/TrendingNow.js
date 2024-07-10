import React from 'react';
import image1 from '../../assets/images/finalbanner.png';
import image2 from '../../assets/images/finalbanner2.png';
import image3 from '../../assets/images/finalbanner4.png'; // Add import for the third image
import styles from './TrendingNow.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDataStart, filterusers } from '../../features/getproductslice';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link, useParams } from 'react-router-dom';
import 'rc-slider/assets/index.css';
const TrendingNow = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.allproducts);
  const dispatch = useDispatch();
  const pictureData = [
    {
      id: 1,
      src: image1,
      category: 'Sneakers', // Change category for image 1
    },
    {
      id: 2,
      src: image2,
      category: 'Jordans', // Change category for image 2
    },
    {
      id: 3,
      src: image3,
      category: 'Chelsea', // Change category for image 3
    },
  ];

  const handlebuynow = (category) => {
    dispatch(fetchDataStart({ subcategory: category }));
    navigate(`/Category/${category}`);
  };
  

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <Grid container spacing={2} justifyContent="center">
          {pictureData.map((picture) => (
            <Grid item xs={12} sm={6} md={4} key={picture.id} sx={{ mb: 2 }}>
              <div className={styles.imageItem}>
                <img src={picture.src} alt={picture.text} className={styles.image} />
                <div>
                  <Button
                    variant="contained"
                    endIcon={<span style={{ fontSize: '1.2em' }}>&rarr;</span>}
                    sx={{
                      p: "5px 15px",
                      color: "#101820 !important",
                      backgroundColor: "#FEE715 !important",
                      marginTop: '2px',
                    }}
                    onClick={() => handlebuynow(picture.category)} // Pass category to handleClick
                  >
                    {picture.category}
                  </Button>
                  <p className={styles.description}>{picture.description}</p>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default TrendingNow;
