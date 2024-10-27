import React from 'react';

import image from "./image.png"
import testimonal from './testimonal.jpg';
import imageorz from"./image (1).png";
import { Card } from '@/components/ui';

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
    <h2 className="text-2xl font-semibold text-center mb-8">Testimonials</h2>
    <div className="flex flex-wrap justify-around gap-6">
        {testimonials.map((testimonial, index) => (
            <div key={index} className="max-w-xs mb-6">
                <Card
                    clickable
                    className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                    header={
                        <div className="rounded-tl-lg rounded-tr-lg overflow-hidden" style={{ height: '150px' }}>
                            <img
                                src={testimonial.imgSrc}
                                alt={`${testimonial.username} profile`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                    }
                    footer={
                        <div className="flex flex-col items-center text-center">
                            <h6 className="text-sm font-bold mt-2">{testimonial.username}</h6>
                        </div>
                    }
                    headerClass="p-0"
                    footerBorder={false}
                    headerBorder={true}
                >
                    <p className="text-sm h-20 overflow-hidden">
                        {testimonial.text.length > 100
                            ? `${testimonial.text.slice(0, 100)}...`
                            : testimonial.text}
                    </p>
                </Card>
            </div>
        ))}
    </div>
</div>


   
  );
};

export default Testimonials;
