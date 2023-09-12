import React from 'react'
import './testimonialcard.css'
export default function Testimonialcard() {
  return (
    <div className='testimonial-card'>
       <img className='testimonial-card-image' src={require('../assets/person.jpg')} />
       <div className='testimonial-card-text-frame'>
        <div className='testimonial-card-name' >John</div>
        <div className='testimonial-card-text' >this coffee shop is very convenient</div>

       </div>
    </div>
  )
}
