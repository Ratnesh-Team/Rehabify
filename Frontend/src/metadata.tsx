import React from 'react';
import { Helmet } from 'react-helmet';

const Metadata = () => {
  return (
    <Helmet>
      <title>Rehabify - Management Platform for Rehabilitation Centers and Nasha Mukti Kendras</title>
      
      <meta 
        name="description" 
        content="Rehabify is an all-in-one management platform for rehabilitation centers and Nasha Mukti Kendras, connecting administrators, doctors, and users efficiently. Find the nearest rehab facilities and streamline operations with ease." 
      />
      
      <meta 
        name="keywords" 
        content="Rehabilitation, Nasha Mukti Kendra, rehab management, addiction recovery, rehab centers, doctors, platform for rehab centers" 
      />
      
      <meta name="author" content="Rehabify Team" />
      
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      <meta property="og:title" content="Rehabify - All-in-One Management Platform for Rehabilitation Centers" />
      <meta 
        property="og:description" 
        content="Streamline rehabilitation center management with Rehabify. Connect administrators, doctors, and users, and find the nearest rehab facilities with ease." 
      />
      <meta property="og:image" content="URL_to_image_for_sharing" /> 
      <meta property="og:url" content="https://rehabify.ratn.tech/" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Rehabify" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Rehabify - Platform for Rehabilitation Centers" />
      <meta 
        name="twitter:description" 
        content="Rehabify helps rehabilitation centers and Nasha Mukti Kendras manage operations smoothly. Find nearby facilities, and connect with doctors and administrators." 
      />
      <meta name="twitter:image" content="URL_to_image_for_sharing" /> 
      <meta name="twitter:site" content="@YourTwitterHandle" /> 
      
      <link rel="canonical" href="https://rehabify.ratn.tech/" />
      
      <meta name="robots" content="index, follow" />
      
      <meta name="theme-color" content="#0047AB" /> 
      <meta name="rating" content="General" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    </Helmet>
  );
};

export default Metadata;
