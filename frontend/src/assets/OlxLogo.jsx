import React from 'react';

export default function OlxLogo({ onClick }) {
  return (
    <svg
      width="48px"
      height="48px"
      viewBox="0 0 1024 1024"
      data-aut-id="icon"
      fillRule="evenodd"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <defs>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3a77ff" />
          <stop offset="50%" stopColor="#0066cc" />
          <stop offset="100%" stopColor="#002f34" />
        </linearGradient>
        
        <filter id="letterGloss" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
          <feSpecularLighting in="blur" surfaceScale="5" specularConstant="0.5" 
                            specularExponent="20" lightingColor="#ffffff" result="specOut">
            <fePointLight x="50" y="50" z="200"/>
          </feSpecularLighting>
          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" 
                      k1="0" k2="1" k3="1" k4="0" result="litPaint"/>
        </filter>
      </defs>
      
      <g filter="url(#letterGloss)">
        <path
          fill="url(#blueGradient)"
          d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"
        />
      </g>
    </svg>
  );
}