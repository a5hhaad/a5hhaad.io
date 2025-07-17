import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Star appears, jumps, and then shows the message
const jumpAnimation = keyframes`
  0% {
    transform: scale(0) translateY(40px);
    opacity: 0;
  }
  30% {
    transform: scale(1) translateY(0px);
    opacity: 1;
  }
  60% {
    transform: scale(1.2) translateY(-20px);
    opacity: 1;
  }
  70% {
    transform: scale(1) translateY(0px);
    opacity: 1;
  }
  90% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0;
  }
`;

// Message animation
const messageAnimation = keyframes`
  0% {
    transform: translateY(10px);
    opacity: 0;
  }
  30% {
    transform: translateY(10px);
    opacity: 0;
  }
  60% {
    transform: translateY(-5px);
    opacity: 0;
  }
  70% {
    transform: translateY(-5px);
    opacity: 1;
  }
  90% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 0;
  }
`;

// Glow effect for the star
const glowAnimation = keyframes`
  0% {
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.8);
  }
  100% {
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.5);
  }
`;

// Sparkle animation for particles
const sparkleAnimation = keyframes`
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(180deg);
    opacity: 0;
  }
`;

const AnimationContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 100;
`;

const Star = styled.div`
  position: absolute;
  bottom: 80px; /* Position near the send button */
  width: 40px;
  height: 40px;
  animation: ${jumpAnimation} 2s ease-out forwards;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: white;
    clip-path: polygon(
      50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%,
      50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%
    );
    animation: ${glowAnimation} 0.8s ease-in-out infinite;
    box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.8);
  }
`;

const MessageText = styled.div`
  position: absolute;
  bottom: 120px; /* Position above the star */
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  animation: ${messageAnimation} 2s ease-out forwards;
  opacity: 0;
`;

const Sparkle = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: white;
  transform: rotate(45deg);
  animation: ${sparkleAnimation} ${props => props.duration}s linear forwards;
  animation-delay: ${props => props.delay}s;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  opacity: 0;
  box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.7);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    transform: rotate(45deg);
    box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.5);
  }
`;

const StarAnimation = ({ show, onAnimationComplete }) => {
  const [sparkles, setSparkles] = useState([]);
  
  useEffect(() => {
    if (show) {
      // Generate sparkles that appear when the animation is near completion
      const newSparkles = [];
      for (let i = 0; i < 15; i++) {
        newSparkles.push({
          id: i,
          size: Math.random() * 6 + 2, // Between 2-8px
          top: Math.random() * 60 - 30, // Position around the star
          left: Math.random() * 60 - 30,
          duration: Math.random() * 0.6 + 0.5, // Between 0.5-1.1s
          delay: Math.random() * 0.3 + 0.7, // Start mid-animation
        });
      }
      setSparkles(newSparkles);
      
      // Call onAnimationComplete after the animation finishes
      const timer = setTimeout(() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 2000); // Same duration as the animations
      
      return () => clearTimeout(timer);
    }  }, [show, onAnimationComplete]);
  
  if (!show) return null;
  
  return (
    <AnimationContainer>
      <Star>
        {sparkles.map(sparkle => (
          <Sparkle 
            key={sparkle.id}
            size={sparkle.size}
            top={sparkle.top}
            left={sparkle.left}
            duration={sparkle.duration}
            delay={sparkle.delay}
          />
        ))}
      </Star>
      <MessageText>Message sent!</MessageText>
    </AnimationContainer>
  );
};

export default StarAnimation;
