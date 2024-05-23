import { useEffect, useState } from 'react';

const StarRating = (props) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(props.score);
  }, [props.score]);

  const handleStarClick = (e) => {
    // console.log(e.target.dataset.rating);
    setRating(e.target.dataset.rating);
    // props.handleStarRating(rating);
  };

  // console.log(rating);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={handleStarClick}
          data-rating={star}
          style={{
            cursor: 'pointer',
            color: star <= rating ? 'var(--main-puple)' : 'var(--main-pink)',
            fontSize: '20px',
          }}
        >
          &#9733;
        </span>
      ))}
      <p style={{ fontSize: '16px', marginLeft: '10px' }}>{rating}</p>
    </div>
  );
};

export default StarRating;
