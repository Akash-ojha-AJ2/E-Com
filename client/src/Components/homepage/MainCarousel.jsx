// src/components/HomePage/MainCarousel.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MainCarousel({ bannerProducts = [], loading = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  // Auto slide every 3 seconds
  useEffect(() => {
    // Don't start the timer if there's only one or zero slides
    if (bannerProducts.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === bannerProducts.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    // Clear the interval when the component unmounts or dependencies change
    return () => clearInterval(interval);
  }, [bannerProducts.length]);

  // Handler for the 'next' button
  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === bannerProducts.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handler for the 'previous' button
  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? bannerProducts.length - 1 : prevIndex - 1
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="carousel slide mb-5 rounded-3 shadow-sm" style={{ height: '200px' }}>
        <div className="d-flex justify-content-center align-items-center h-100 bg-light">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading banners...</span>
          </div>
          <span className="ms-3">Loading featured products...</span>
        </div>
      </div>
    );
  }

  // If no products with banners, show a default banner
  if (bannerProducts.length === 0) {
    return (
      <div className="carousel slide mb-5 rounded-3 shadow-sm" style={{ height: '200px' }}>
        <img
          src="https://source.unsplash.com/1600x500/?ecommerce,shopping"
          className="d-block w-100 h-100"
          alt="Default Banner"
          style={{ objectFit: 'cover' }}
        />
      </div>
    );
  }

  return (
    <div id="mainCarousel" className="carousel slide mb-5 rounded-3 shadow-sm" data-bs-ride="carousel">
      {/* Carousel Indicators */}
      {bannerProducts.length > 1 && (
        <div className="carousel-indicators">
          {bannerProducts.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#mainCarousel"
              data-bs-slide-to={index}
              className={index === activeIndex ? 'active' : ''}
              aria-current={index === activeIndex ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            ></button>
          ))}
        </div>
      )}

      {/* Carousel Inner Content (Slides) */}
      <div className="carousel-inner" style={{ height: '600px' }}>
        {bannerProducts.map((product, index) => (
          <div
            key={product.id || index} // Use a stable key like product.id
            className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
            onClick={() => navigate(`/product/${product.id}`)} // Navigate on click
            style={{ cursor: 'pointer', height: '100%' }}
          >
            <img
              // Assuming 'product.bannerUrl' holds the image path
              src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fsoundmachine.com.mt%2Fshop%2Fsmart-tech%2Fsmartphones%2Fsamsung-galaxy-s24-ultra-5g-12gb-256gb-black%2F&psig=AOvVaw3g5h1W_R2ogSteb6rz0ko7&ust=1762245918385000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOirvubL1ZADFQAAAAAdAAAAABAE"
              className="d-block w-100 h-200"
              alt={'Banner Image'}
              style={{ objectFit: 'contain' }}
            />
          </div>
        ))}
      </div>

      {/* Carousel Controls (Prev/Next Buttons) */}
      {bannerProducts.length > 1 && (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#mainCarousel"
            data-bs-slide="prev"
            onClick={handlePrev}
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#mainCarousel"
            data-bs-slide="next"
            onClick={handleNext}
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </>
      )}
    </div>
  );
}

export default MainCarousel;