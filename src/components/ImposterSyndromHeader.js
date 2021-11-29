import React from 'react';
import Typewriter from 'typewriter-effect';
import { HeadingXL } from './HeadingXL';

const ImposterSyndromeHeader = () => {
  const initTypeWriter = (typewriter) => {
    typewriter
      .typeString('Imposter-Syndrome.lol')
      .pauseFor(2200)
      .deleteChars(15)
      .typeString('or-Syndrome.lol')
      .pauseFor(1800)
      .deleteAll()
      .typeString('imposterSyndrome[\'lol\']')
      .pauseFor(1800)
      .deleteAll()
      .start();
  }

  const options = {
    loop: true,
    deleteSpeed: 1,
  };

  return (
    <HeadingXL>
      <Typewriter onInit={initTypeWriter} options={options} />
    </HeadingXL>
  )
}

export default ImposterSyndromeHeader;
