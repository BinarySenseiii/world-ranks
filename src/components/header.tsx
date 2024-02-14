import Image from 'next/image';
import React from 'react';

import bgCover from '@/images/hero-image-wr.jpg';
import Logo from './logo';

const Header = () => {
  return (
    <header className="h-52 md:h-header relative flex items-center justify-center">
      <Image src={bgCover} fill placeholder="blur" alt="WorldRanks cover not found" priority className="object-cover" />
      <div className="relative z-10 cursor-pointer transition-transform ease-in-out hover:scale-105">
        <Logo />
      </div>
    </header>
  );
};

export default Header;
