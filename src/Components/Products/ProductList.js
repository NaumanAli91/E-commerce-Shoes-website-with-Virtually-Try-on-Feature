import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Pagination,
  Stack,
  Card
} from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './ProductList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { fetchDataStart, filterusers } from '../../features/getproductslice';
import { fetchProductDetailsStart, sendProductIDStart } from '../../features/productDetailslice';
import { fetchDiscountStart } from '../../features/DiscountSlice';

const renderSelectableBoxes = (values, onClickHandler, selectedValues, label, showDivider) => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {values.map((value, index) => (
      <div
        key={value}
        onClick={() => onClickHandler(value)}
        style={{
          border: selectedValues.includes(value) ? '0px solid #808080' : '1px solid #808080',
          padding: '3px',
          fontSize: '13px',
          margin: '3px',
          cursor: 'pointer',
          borderRadius: '2px',
          textAlign: 'center',
          backgroundColor: selectedValues.includes(value) ? '#101820' : 'transparent',
          color: selectedValues.includes(value) ? 'white' : '#3C4142',
          flex: '0 0 calc(33.33% - 10px)', // Adjust the width here (33.33% for three items in a row)
        }}
      >
        {label && <span style={{ marginRight: '2px', textAlign: 'center' }}>{label}</span>}
        {value}
      </div>
    ))}
    {showDivider && <hr style={{ width: '95%', borderTop: '1px solid #808080', margin: '10px 0' }} />}
  </div>
);

const ProductList = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.allproducts);
  const discounts = useSelector((state) => state.discount.discounts);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 9;
  const handleProductClick = (productId) => {
    dispatch(fetchProductDetailsStart(productId));
  };

  // Function to toggle the visibility of filters in mobile view
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  useEffect(() => {
    console.log(data); // Verify that data is present here
  }, [data]);
  useEffect(() => {
    dispatch(fetchDataStart());
    dispatch(fetchDiscountStart());
    
  }, [dispatch]);

  const uniqueSizes = Array.from(new Set(data.userscontainer && Array.isArray(data.userscontainer) ? data.userscontainer.map(ele => ele.size) : []));
  const uniqueBrands = Array.from(new Set(data.userscontainer && Array.isArray(data.userscontainer) ? data.userscontainer.map(ele => ele.brand) : []));
  const uniqueConditions = Array.from(new Set(data.userscontainer && Array.isArray(data.userscontainer) ? data.userscontainer.map(ele => ele.shoecondition) : []));

  const handleSizeClick = (size) => {
    const newSelectedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];

    setSelectedSizes(newSelectedSizes);

    applyFilters({ sizes: newSelectedSizes, brands: selectedBrands, conditions: selectedConditions });
  };

  const handleBrandClick = (brand) => {
    const newSelectedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];

    setSelectedBrands(newSelectedBrands);

    applyFilters({ sizes: selectedSizes, brands: newSelectedBrands, conditions: selectedConditions });
  };

  const handleConditionClick = (condition) => {
    const newSelectedConditions = selectedConditions.includes(condition)
      ? selectedConditions.filter((c) => c !== condition)
      : [...selectedConditions, condition];

    setSelectedConditions(newSelectedConditions);

    applyFilters({ sizes: selectedSizes, brands: selectedBrands, conditions: newSelectedConditions });
  };

  const handleResetFilters = () => {
    setSelectedSizes([]);
    setSelectedBrands([]);
    setSelectedConditions([]);

    // Reset filters to show all products
    dispatch(filterusers({ sizes: [], brands: [], conditions: [] }));
  };

  const applyFilters = (filters) => {
    console.log(filters);
    dispatch(filterusers(filters));
  };

  const handlePriceChange = (values) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };

  const applyFilter = (filters) => {
    const priceFilters = {
      minPrice,
      maxPrice,
    };
    dispatch(filterusers({ ...filters, ...priceFilters }));
  };

  // Pagination functions
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.users
    ? data.users.filter(ele => ele.price >= minPrice && ele.price <= maxPrice).slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

  const totalPages = Math.ceil((data.users ? data.users.length : 0) / productsPerPage);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Function to calculate discounted price
  const getDiscountedPrice = (price) => {
    const today = new Date();
    const discount = discounts.find(discount => {
      const startDate = new Date(discount.startDate);
      const endDate = new Date(discount.endDate);
      return discount.isActive === 1 && today >= startDate && today <= endDate;
    });

    if (discount) {
      const discountAmount = discount.amount;
      const discountedPrice = price - (price * (discountAmount / 100));
      return discountedPrice.toFixed(2);
    }

    return price.toFixed(2);
  };

  return (
    <Grid container className={styles.ProductListContainer}>
      <Grid item xs={12} md={3}>
        <Box>
          <div style={{ border: '0px solid #D3D3D3', borderRadius: '10px', marginRight: '40px', padding: '30px', display: showFilters || window.innerWidth >= 840 ? 'block' : 'none' }}>
            <Box style={{ border: '0px solid #D3D3D3', borderRadius: '10px', marginRight: '40px', padding: '0px' }}>
              <Typography style={{ width: '110%', fontSize: '15px', textAlign: 'center', borderRadius: '5px', color: '#fff', fontWeight: 'inherit', backgroundColor: '#101820', marginBottom: '5px', paddingTop: '4px', paddingBottom: '4px' }}>Selected Filters</Typography>
              <div style={{ display: 'flex', flexWrap: 'wrap', color: '#101820 !important' }}>
                {selectedSizes.map((size) => (
                  <div key={`selected-size-${size}`} style={{ marginRight: '5px', marginBottom: '5px' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleSizeClick(size)}
                      color="primary"
                      sx={{
                        borderColor: '#787a7c !important',
                        borderRadius: '2px !important'
                      }}
                      style={{ marginLeft: '5px', backgroundColor: '#f2f2f2', color: '#787a7c' }}
                    >
                      {size}{' '}&#10005;
                    </Button>
                  </div>
                ))}
                {selectedBrands.map((brand) => (
                  <div key={`selected-brand-${brand}`} style={{ marginRight: '5px', marginBottom: '5px' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleBrandClick(brand)}
                      sx={{
                        borderColor: '#787a7c !important',
                        borderRadius: '2px !important'
                      }}
                      style={{ marginLeft: '5px', backgroundColor: '#f2f2f2', color: '#787a7c' }}
                    >
                      {brand}{' '}&#10005;
                    </Button>
                  </div>
                ))}
                {selectedConditions.map((condition) => (
                  <div key={`selected-condition-${condition}`} style={{ marginRight: '5px', marginBottom: '5px' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleConditionClick(condition)}
                      sx={{
                        borderColor: '#787a7c !important',
                        borderRadius: '2px !important'
                      }}
                      style={{ marginLeft: '5px', backgroundColor: '#f2f2f2', color: '#787a7c' }}
                    >
                      {condition}{' '}&#10005;
                    </Button>
                  </div>
                ))}
              </div>
              {selectedSizes.length > 0 || selectedBrands.length > 0 || selectedConditions.length > 0 ? (
                <>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleResetFilters}
                    sx={{
                      borderColor: '#101820 !important',
                      borderRadius: '2px !important',
                      '&:hover': {
                        color: '#fff !important',
                        backgroundColor: '#101820',
                      },
                    }}
                    style={{ marginTop: '10px', marginLeft: '5px', color: '#101820' }}
                  >
                    Reset Filters
                  </Button>
                  <hr style={{ width: '95%', borderTop: '1px solid #808080', margin: '10px 0' }} />
                </>
              ) : null}
            </Box>
            <Typography style={{ paddingBottom: '5px', fontSize: '16px', color: '#101820', fontWeight: 'inherit' }}>Size</Typography>
            {data.users && renderSelectableBoxes(uniqueSizes, handleSizeClick, selectedSizes, 'EUR', true)}
            <Typography style={{ paddingBottom: '5px', fontSize: '16px', color: '#101820', fontWeight: 'inherit' }}>Brand</Typography>
            {data.users && renderSelectableBoxes(uniqueBrands, handleBrandClick, selectedBrands, undefined, true)}
            <Typography style={{ paddingBottom: '5px', fontSize: '16px', color: '#101820', fontWeight: 'inherit' }}>Condition</Typography>
            {data.users && renderSelectableBoxes(uniqueConditions, handleConditionClick, selectedConditions, undefined, false)}
            <div style={{ margin: '20px 0' }}>
              <Typography style={{ paddingBottom: '5px', fontSize: '16px', color: '#101820', fontWeight: 'inherit' }}>
                Price Range
              </Typography>
              <Slider
                range
                min={0}
                max={10000}
                defaultValue={[minPrice, maxPrice]}
                onChange={handlePriceChange}
                style={{ width: '90%', marginLeft: '5px' }}
                trackStyle={{ backgroundColor: '#101820' }}
                handleStyle={{
                  borderColor: '#101820',
                  backgroundColor: '#101820',
                }}
                railStyle={{ backgroundColor: '#D3D3D3' }}
              />
              <Typography style={{ marginTop: '10px' }}>
                USD: Rs.{minPrice} - Rs.{maxPrice}
              </Typography>
            </div>
          </div>
          <Button
            variant="outlined"
            size="small"
            onClick={toggleFilters}
            sx={{
              display: { md: 'none' },
            }}
            style={{
              borderStyle: 'none',
              marginTop: '10px',
              marginBottom: '25px',
              marginLeft: '5px',
              color: '#101820',
              backgroundColor: '#FEE715',
            }}
          >
            {showFilters ? 'Hide Filters' : 'Filter & Sort'}
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12} md={9}>
        <Grid container spacing={2} className={styles.ProductGrid}>
          {currentProducts.map((ele) => {
            const firstImage = ele.image ? ele.image.split(',')[0].trim() : '';
            const image1URL = "https://api.dopes.online/" + firstImage;
            const discountedPrice = getDiscountedPrice(ele.price);
            const isDiscountAvailable = discountedPrice !== ele.price.toFixed(2);

            return (
              <Grid className={styles.ProductCard} item xs={6} sm={6} md={4} key={ele.productid}>
                {firstImage && (
                  <Box
                    className={styles.ProductImage}
                    component="img"
                    src={image1URL}
                    alt={ele.productname}
                  />
                )}
                 <Link
                  to={`/Shoe/${ele.productid}`}
                  className={styles.ProductLink}
                  onClick={() => handleProductClick(ele.productid)}
                >
                  <Typography className={styles.ProductName} variant="h6">
                  {ele.productname}
                  </Typography>
                </Link>
                <Typography variant="body2" className={styles.Product_condition}>
                  <span style={{ fontSize: '15px', color: '#101820' }}>Condition:</span> {ele.shoecondition}
                </Typography>
                <Typography className={styles.ProductPrice} variant="h5">
                  {isDiscountAvailable && (
                    <span style={{ textDecoration: 'line-through', marginRight: '5px', color: '#D3D3D3' }}>
                     Rs.{ele.price.toFixed(2)}
                    </span>
                  )}
                  <span style={{ color: '#ff6d00' }}>
                  Rs.{discountedPrice}
                  </span>
                </Typography>

                <Typography className={styles.ProductShipping} variant="subtitle2">
                  Rs.6 for shipping
                </Typography>
              </Grid>
            );
          })}
        </Grid>
        <Card
          sx={{
            boxShadow: "none",
            borderRadius: "10px",
            p: "25px",
            mb: "15px",
          }}
        >
          <Stack spacing={2} alignItems="center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              shape="rounded"
              variant="outlined"
            />
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProductList;
