import React from 'react'
import Navbar from '../components/Navbar';
import FooterSection from '../components/FooterSection';
import Careers from './Careers';

function index() {
  return (
    <div>
      <Navbar />
      <Careers />
      <FooterSection />
    </div>
  );
}

export default index