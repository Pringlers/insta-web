import React, { useState, useRef } from "react";
import styled from "@emotion/styled";

interface CarouselProps {
  images: string[];
}

const CarouselContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  position: relative;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const ImageContainer = styled.div`
  flex-shrink: 0;
  width: 100%;
  scroll-snap-align: start;
  position: relative;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Image = styled.img`
  display: block;
  width: 100%;
  backface-visibility: hidden;
`;

const ButtonContainer = styled.div<{ isFirstImage: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: ${(props) => (props.isFirstImage ? "flex-end" : "space-between")};
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;
  border-radius: 25%;

  &:hover {
    box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.35);
  }
`;

const PrevButton = styled(Button)`
  margin-left: 1rem;
`;

const NextButton = styled(Button)`
  margin-right: 1rem;
`;

function Carousel({ images }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleScroll() {
    if (!containerRef.current) {
      return;
    }

    const { scrollLeft, offsetWidth } = containerRef.current;
    const index = Math.round(scrollLeft / offsetWidth);

    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      containerRef.current?.scrollTo({
        left: (currentIndex - 1) * containerRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }

  function handleNext() {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
      containerRef.current?.scrollTo({
        left: (currentIndex + 1) * containerRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }

  return (
    <>
      <CarouselContainer onScroll={handleScroll} ref={containerRef}>
        {images.map((src, index) => (
          <ImageContainer key={index}>
            <Image src={src} />
            {index === currentIndex && (
              <ButtonContainer isFirstImage={currentIndex === 0}>
                {currentIndex !== 0 && <PrevButton onClick={handlePrev}>&larr;</PrevButton>}
                {currentIndex !== images.length - 1 && <NextButton onClick={handleNext}>&rarr;</NextButton>}
              </ButtonContainer>
            )}
          </ImageContainer>
        ))}
      </CarouselContainer>
    </>
  );
}

export default Carousel;
