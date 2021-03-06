import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as ticketActions from "../../actions/admin";
import * as authActions from "../../actions/auth";
import * as movieActions from "../../actions/movies";
import * as pointActions from "../../actions/point";
import * as promotionAction from "../../actions/promotion";
import * as sliderBarActions from "../../actions/sliderBars";
import "../../sass/home.scss";
import BookingForm from "../Menu/Movies/BookingForm";


const Home = (props) => {
  const [slideIndex, setSlideIndex] = useState(1);
  const [tag, setTag] = useState(true);
  const sliderBar = useSelector((state) => state.sliderBar.sliderBar);
  const promotionInfo = useSelector(
    (state) => state.promotionReducer.promotions
  );
  const movies = useSelector((state) => state.movies.movies);
  const [movie, setMovie] = useState(movies);
  const user = useSelector((state) => state.currentUser.currentUser);
  const accounts = useSelector((state) => state.currentUser.accounts);
  const account = useSelector((state) => state.currentUser.account);
  const [ticketMovieName, setTicketMovieName] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(0);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const autoPlayRef = useRef();

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    }
    const interval = setInterval(play, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch(authActions.jsonToken());
  }, [dispatch]);

  useEffect(() => {
    dispatch(sliderBarActions.sliderBar());
  }, [dispatch]);

  useEffect(() => {
    dispatch(movieActions.movies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(ticketActions.ticket());
  }, [dispatch]);

  useEffect(() => {
    dispatch(promotionAction.promotionRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(authActions.account());
  }, [dispatch]);

  useEffect(() => {
    dispatch(pointActions.point());
  }, [dispatch]);

  useEffect(() => {
    if (user && accounts) {
      const result = [...accounts].filter((account) => {
        return account.email === user.email;
      });
      dispatch(authActions.accountInformation(result));
    }
  }, [user, accounts, dispatch]);

  useEffect(() => {
    if (movies) {
      const result = [...movies].filter((movie) => {
        if (tag === true) {
          return movie.status === 1;
        } else {
          return movie.status === 0;
        }
      });
      setMovie([...result]);
    }
  }, [tag, movies]);

  const handleModal = (id, value) => {
    if (!account) {
      props.history.push("/login");
    } else {
      setIsOpenModal(id);
      setTicketMovieName(value);
    }
  };

  const passTicketMovieName = (value) => {
    setTicketMovieName(value);
  };

  const passIsOpen = (value) => {
    setIsOpenModal(value);
  };

  const nextSlide = () => {
    if (sliderBar && slideIndex === sliderBar.length) {
      return setSlideIndex(1);
    }
    setSlideIndex(slideIndex + 1);
  }

  const prevSlide = () => {
    if (sliderBar && slideIndex === 1) {
      return setSlideIndex(sliderBar.length);
    }
    setSlideIndex(slideIndex - 1);
  }

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
            <img className="bar" src={bar.image} alt="banner" />
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

  const showMovie = () => {
    let result = [];

    if (movie && typeof movie !== "undefined" && movie !== null) {
      for (let i = 0; i < 4; i++) {
        result.push(
          <div className="movie" key={i}>
            <img
              src={movie[i].image}
              alt="image__movie"
              className="movie__image"
            />
            <div className="movie__name">{movie[i].name}</div>
            <div className="wrap-movie__btn">
              <span
                className="movie__btn"
                onClick={() => handleModal(movie[i].id, movie[i].name)}
              >
                {t("home.booking")}
              </span>
            </div>
            {account && tag ? (
              <div className={isOpenModal === movie[i].id ? "" : "none"}>
                <BookingForm
                  isOpenModal2={isOpenModal}
                  passIsOpen={passIsOpen}
                  movieNow={movie[i]}
                  ticketMovieName2={ticketMovieName}
                  passTicketMovieName={passTicketMovieName}
                />
              </div>
            ) : (
                ""
              )}
          </div>
        );
      }
    }
    return result;
  };

  return (
    <div className="home">
      <div className="slideshow-container">
        {showBar(sliderBar, slideIndex)}

        <span
          className="prev"
          onClick={() => prevSlide()}
        >
          &#10094;
        </span>
        <span
          className="next"
          onClick={() => nextSlide()}
        >
          &#10095;
        </span>
      </div>
      <br />

      <div className="wrapperDot">{showDot()}</div>
      {/* {autoSlidebar(sliderBar)} */}
      <div className="movies container">
        <div className="movies__header row">
          <span
            className={
              tag ? "movies__header__tag active" : "movies__header__tag"
            }
            onClick={() => setTag(true)}
          >
            {t("home.nowShowing")}
          </span>
          <span
            className={
              !tag ? "movies__header__tag active" : "movies__header__tag"
            }
            onClick={() => setTag(false)}
          >
            {t("home.comingSoon")}
          </span>
        </div>
        <div className="movies__main row">{showMovie()}</div>
        {tag ? (
          <Link to="/nowShowing" className="movies__btn">
            {t("home.viewMore")}
          </Link>
        ) : (
            <Link to="comingSoon" className="movies__btn">
              {t("home.viewMore")}
            </Link>
          )}
      </div>

      <div className="promotion ">
        <div className="container">
          <span className="movies__header__tag ">
            {t("home.promotionInformation")}
          </span>

          <div className="row">
            {promotionInfo &&
              promotionInfo.map((item, i) => (
                <div className="col-12 col-sm-6 col-lg-3" key={i}>
                  <div className="promotion__item">
                    <img
                      className="promotion__img"
                      src={item.promotion_image}
                      alt="promotion information"
                    />
                    <div className="wrap-promotion__btn">
                      <Link
                        to="/detailPromotion"
                        onClick={() =>
                          dispatch(promotionAction.detailPromotion(item))
                        }
                        className="promotion__btn"
                      >
                        {t("home.detail")}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
