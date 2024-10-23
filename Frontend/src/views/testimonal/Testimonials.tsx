import React from 'react';
import TestimonialCard from './TestimonialCard';
import image from "./image.png"
import testimonal from './testimonal.jpg';
import imageorz from"./image (1).png"

const Testimonials = () => {
  const testimonials = [
    {
      text: "Rehabify has made my recovery more successful as a patient. I can follow a customized and adaptive treatment plan using Rehabify." ,
      username:"-  user1",
      imgSrc: testimonal
    },
    {
      text: "As a doctor, Rehabify's comprehensive database has become an invaluable tool in creating personalized treatment plans for my patients, enhancing their recovery outcomes.",
      username:"-  user1",
      imgSrc: image
    },
    {
      text: "Partnering with Rehabify has enabled our organization to access a vast range of resources, empowering us to better support individuals on their path to addiction recovery.",
      username:"-  user1",
      imgSrc: imageorz
    }
  ];

  return (
    <div className="testimonials-section">
      <h2>Testimonials</h2>
      <div className="testimonials">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} text={testimonial.text}  username={testimonial.username} imgSrc={testimonial.imgSrc} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
