import React from 'react';
import './TestimonialCard.css';

interface TestimonialCardProps {
  text: string;
  imgSrc: string;
  username: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ text, imgSrc, username }) => {
  return (
    <div className="testimonial-card" >
      <div className="image-placeholder">
        <img src={imgSrc} alt="Testimonial" />
      </div>
      <p className="testimonial-text">{text}</p><br></br>
      <p className="username">{username}</p>
    </div>
  );
};

export default TestimonialCard;
