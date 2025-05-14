import React from 'react';
import { useEffect, useState } from 'react';

export default function BackToTopButton() {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true);
      }
      else {
        setBackToTopButton(false);
      }
    })
  }, [])

  const scrollUp = () => {
    window.scrollTo({
      top:0, 
      behavior:'smooth'
    })
  }

  return (
    <div>
    {backToTopButton && (
      <button style={{
        position:'fixed', 
        bottom:'50px', 
        right:'50px', 
        height:'60px',
        width:'60px',  
        fontSize:'50px', 
        cursor:'pointer', 
        backgroundColor:'#4338CA', 
        borderRadius:'10px', 
        color: 'white', 
      }} onClick={scrollUp}>^</button>
    )}
    </div>
  );
}