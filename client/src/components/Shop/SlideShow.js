import React, { Component } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import imageService from "../../assets/img/service.jpg";
import imageWelcome from "../../assets/img/welcome.jpg";
import imageWhyus from "../../assets/img/whyus.jpg";
import "./SlideShow.css";
const items = [
  {
    id: 1,
    altText: "Slide 1",
    caption: "Welcome To Our Shop",
    header: "Browse our collection of high-quality products",
    src: imageWelcome,
  },
  {
    id: 2,
    altText: "Slide 2",
    caption: "Our Services",
    header: "We provide fast and reliable shipping",
    src: imageService,
  },
  {
    id: 3,
    altText: "Slide 3",
    caption: "Why Us",
    header: "We offer the best prices and quality in the market",
    src: imageWhyus,
  },
];

class SlideShow extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          className="custom-tag"
          tag="div"
          key={item.id}
          onExiting={this.onExiting}
          onExited={this.onExited}
        >
          <img src={item.src} alt={item.altText} className="d-block w-100" />
          <div className="carousel-caption">
            <h2>{item.caption}</h2>
            <h3>{item.header}</h3>
          </div>
        </CarouselItem>
      );
    });

    return (
      <div>
        <style>
          {`.custom-tag {
                max-width: 100%;
                height: 300px;
                background: black;
              }`}
        </style>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
          interval={5000}
          ride="carousel"
        >
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={this.goToIndex}
          />
          {slides}
        </Carousel>
      </div>
    );
  }
}

export default SlideShow;
