import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  margin: 20px 0;
`;

const Slider = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const Card = styled.div`
  display: flex;
  min-width: 23%;
  padding: 20px;
  border: 1px solid #ddd;
  margin: 0 1%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    min-width: 96%;
    margin: 10px 2%;
  }

  img {
    width: 150px;
    height: auto;
    margin-right: 20px;
  }
`;

const ArrowContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: black;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1;

  &.left {
    left: 0;
  }

  &.right {
    right: 0;
  }
`;

const ArrowIcon = styled.div`
  font-size: 1.2rem;
  color: white;

  &.left::before {
    content: "<";
  }

  &.right::before {
    content: ">";
  }
`;

const dataset = [
  {
    name: "Test2",
    logo: "https://example.com/bajaj-logo.png", // Replace with actual image URL
  },
  {
    name: "VARROC",
    logo: "https://example.com/varroc-logo.png", // Replace with actual image URL
  },
  {
    name: "NACHI",
    logo: "https://example.com/nachi-logo.png", // Replace with actual image URL
  },
  {
    name: "NOK",
    logo: "https://example.com/nok-logo.png", // Replace with actual image URL
  },
  {
    name: "Brand 5",
    logo: "https://example.com/brand5-logo.png", // Replace with actual image URL
  },
  {
    name: "Brand 6",
    logo: "https://example.com/brand6-logo.png", // Replace with actual image URL
  },
  {
    name: "Brand 7",
    logo: "https://example.com/brand7-logo.png", // Replace with actual image URL
  },
  {
    name: "Brand 8",
    logo: "https://example.com/brand8-logo.png", // Replace with actual image URL
  },
];

const Test2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const cardsPerSlide = window.innerWidth > 768 ? 4 : 1;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % Math.ceil(dataset.length / cardsPerSlide)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.ceil(dataset.length / cardsPerSlide) - 1
        : prevIndex - 1
    );
  };

  return (
    <Container>
      <Slider
        ref={sliderRef}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {dataset.map((item, index) => (
          <Card key={index}>
            <img src={item.logo} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
            </div>
          </Card>
        ))}
      </Slider>

      <ArrowContainer className="left" onClick={prevSlide}>
        <ArrowIcon className="left" />
      </ArrowContainer>
      <ArrowContainer className="right" onClick={nextSlide}>
        <ArrowIcon className="right" />
      </ArrowContainer>
    </Container>
  );
};

export default Test2;
