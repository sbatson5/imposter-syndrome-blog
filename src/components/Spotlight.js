import React, { useEffect } from 'react';
import setupCursor from '../utils/setup-cursor';

export const Spotlight = () => {
  useEffect(() => {
    setupCursor();
  }, []);

  return (
    <div className="cursor">
      <div className="cursor__ball js-cursor">
        <svg height="30" width="30">
          <circle cx="15" cy="15" r="12" strokeWidth="0"></circle>
        </svg>
      </div>
    </div>
  );
};