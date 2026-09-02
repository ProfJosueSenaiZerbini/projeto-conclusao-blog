import React from 'react';

const Tape = ({ variant = 'yellow', className = '', style = {} }) => {
  const tapeClass = variant === 'blue' ? 'tape-blue' : 'tape';
  
  return (
    <div 
      className={`${tapeClass} absolute rounded-sm z-30 opacity-80 ${className}`} 
      style={style}
    ></div>
  );
};

export default Tape;

