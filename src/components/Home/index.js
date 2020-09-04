import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sliderBarActions from "../../actions/sliderBars";
import "../../sass/home.scss";

const Home = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const sliderBar = useSelector((state) => state.sliderBar.sliderBar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sliderBarActions.sliderBar());
  }, [dispatch]);

  const plusSlides = (n, length) => {
    let count = n;
    n > length ? (count = 1) : n <= 0 ? (count = length) : (count = n);
    setSlideIndex(count);
  };

  const currentSlide = (count) => {
    setSlideIndex(count);
  };

  const showBar = () => {
    let result = [];
    if (sliderBar) {
      sliderBar.forEach((bar, i) => {
        return result.push(
          <div
            key={i}
            className={
              bar.id === slideIndex
                ? "mySlides fade slideBarBlock"
                : "mySlides fade slideBarNone"
            }
          >
            <img className='bar' src={bar.hinhAnh} alt='banner' />
          </div>
        );
      });
    }
    return result;
  };

  const showDot = () => {
    let result = [];
    if (sliderBar) {
      sliderBar.forEach((bar, i) => {
        return result.push(
          <span
            key={i}
            className={bar.id === slideIndex ? "dot active" : "dot"}
            onClick={() => currentSlide(bar.id)}
          ></span>
        );
      });
    }
    return result;
  };

  // const autoSlidebar = () => {
  //   if (sliderBar) {
  //     let time = setInterval(() => {
  //       setSlideIndex(slideIndex + 1);
  //     }, 4000);
  //     setTimeout(() => {
  //       clearInterval(time);
  //       setSlideIndex(1);
  //     }, 24000);
  //   }
  // };

  return (
    <div className='home'>
      <div className='slideshow-container'>
        {showBar(sliderBar, slideIndex)}

        <span
          className='prev'
          onClick={() => plusSlides(slideIndex - 1, sliderBar.length)}
        >
          &#10094;
        </span>
        <span
          className='next'
          onClick={() => plusSlides(slideIndex + 1, sliderBar.length)}
        >
          &#10095;
        </span>
      </div>
      <br />

      <div className="wrapperDot">{showDot()}</div>
      {/* {autoSlidebar(sliderBar)} */}
    </div>
  );
};

export default Home;
