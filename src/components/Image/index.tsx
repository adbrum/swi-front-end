import React from 'react';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

interface Props {
  img: any;
}

const Image = ({ img }: Props) => {
  const images = img.map(item => ({
    src: item.url,
  }));

  return <Carousel images={images} style={{ height: 500, width: 800 }} />;
};

export default Image;
