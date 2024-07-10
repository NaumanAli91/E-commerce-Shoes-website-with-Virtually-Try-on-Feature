import React, { useEffect, useState } from 'react';
import Card from "@mui/material/Card";
import { Box, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { fetchreviewStart, addReviewStart } from '../../features/reviewslice';
import { useParams } from 'react-router-dom';
import downArrowImage from '../../assets/images/down-arrow.png';
import { selectLoginStatusexist, selectEmail } from '../../features/authslice';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import { Add } from '@mui/icons-material';
import './ProductReviews.module.css';

const ProductReviews = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const reviews = useSelector(state => state.review.reviews);
  const { product_id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0); // State for rating
  const [orderId, setOrderId] = useState(''); // State for orderId
  const loginStatusExists = useSelector(selectLoginStatusexist);

  useEffect(() => {
    dispatch(fetchreviewStart(product_id));
  }, [dispatch, product_id]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddReview = () => {
    if (!reviewText.trim() || !orderId.trim()) {
      alert('Review text and Order ID must not be empty.');
      return;
    }

    dispatch(
      addReviewStart({
        email,
        product_id,
        text: reviewText,
        customerId: 1, // Assuming customerId is constant
        rating, // Include rating in the review data
        date: '2024-03-15', // Assuming date is constant
        orderId: orderId, // Use the dynamically entered orderId
      })
    );
    handleCloseModal();
  };

  const handleStarClick = starRating => {
    setRating(starRating);
  };

  const maskEmail = email => {
    const [name, domain] = email.split('@');
    const maskedName = name.length > 3 ? name.substring(0, 3) + '****' : name;
    return `${maskedName}@${domain}`;
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.0rem', marginTop: '20px', marginBottom: '20px' }}>Rating & Reviews</h2>
        {loginStatusExists ? (
          <Button
            variant="contained"
            startIcon={<Add sx={{ color: '#101820 !important' }} />}
            sx={{
              marginTop: '20px',
              fontSize: '11px',
              p: '7px 20px',
              color: '#101820 !important',
              backgroundColor: '#FEE715 !important',
              marginBottom: '10px',
            }}
            onClick={handleOpenModal}
          >
            Add a review
          </Button>
        ) : null}
      </div>
      {reviews && reviews.length > 0 ? (
        <div className="reviews-container">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="content">
                <div className="rating">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <i key={i} className="ri-star-fill"></i>
                  ))}
                </div>
                <p>{review.text}</p>
                <img src={downArrowImage} alt="down-arrow" className="down-arrow" />
              </div>
              <div className="info">
                <h4 style={{ color: '#808080', display: 'flex', alignItems: 'center' }}>
                  {maskEmail(review.email)}
                  <div style={{ margin: '0 10px' }}>|</div> {/* Typed divider */}
                  {[1, 2, 3, 4, 5].map(star => (
                    <span
                      key={star}
                      style={{ fontSize: '18px', color: star <= review.rating ? '#FFBC2B' : '#000000' }}
                    >
                      {star <= review.rating ? '★' : '☆'}
                    </span>
                  ))}
                </h4>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews available for this product.</p>
      )}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton={true}>
          <Modal.Title style={{ color: '#101810' }}>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label htmlFor="text">Text:</label>
            <input
              type="text"
              id="text"
              name="text"
              style={{ width: '100%', height: '100px', fontSize: '16px', marginBottom: '15px' }}
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
            />
          </div>
          <div>
            <label>Rating:</label>
            <div style={{ marginTop: '10px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  style={{ cursor: 'pointer', fontSize: '24px', color: star <= rating ? '#FFBC2B' : '#000000' }}
                  onClick={() => handleStarClick(star)}
                >
                  {star <= rating ? '★' : '☆'}
                </span>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="orderId">Your Order#:</label>
            <input
              type="text"
              id="orderId"
              name="orderId"
              style={{ width: '100%', fontSize: '16px', marginBottom: '15px' }}
              value={orderId}
              onChange={e => setOrderId(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            onClick={handleAddReview}
            color="primary"
            style={{ color: '#101810', backgroundColor: '#FEE715', textTransform: 'none' }}
          >
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductReviews;
