import React, { useState } from "react"
import Carousel from "react-bootstrap/Carousel";
import CarouselItem from "react-bootstrap/CarouselItem";
import graphSnippet from "../../images/fin-graph.jpg";
import tabSnippet from "../../images/fin-tabs.jpg";
import { CarouselImg } from "../styles/NewUserStyles"
export default function ControlledCarousel(props) {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
      setDirection(e.direction);
    };

    return (
      <Carousel activeIndex={index} direction={direction} onSelect={handleSelect} interval={false} indicators={false} className='carousel'>
        <CarouselItem>
            <CarouselImg
                className="d-block w-100"
                src={graphSnippet}
                alt="graph"
            />
        </CarouselItem>
        <CarouselItem >
            <CarouselImg
                className="d-block w-100"
                src={tabSnippet}
                alt="tabs"
            />
            <button onClick={props.handleClick}>Start Sleeping</button>
        </CarouselItem>        
      </Carousel>
    );
  }