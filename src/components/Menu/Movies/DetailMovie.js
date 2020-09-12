import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import BookingForm from "./BookingForm";
import "../../../sass/detailMovie.scss";

const DetailMovie = (props) => {
  const movie = useSelector((state) => state.movies.movie);
  const [isOpenModal, setIsOpenModal] = useState(0);
  const account = useSelector((state) => state.currentUser.account);
  const { t } = useTranslation("common");

  const passIsOpen = (value) => {
    setIsOpenModal(value);
  };

  const handleModal = (id) => {
    !account ? props.history.push("/login") : setIsOpenModal(id);
  };

  return movie ? (
    <div className="detailMovie container">
      <div className="detailMovie__image">
        <img src={movie.image} alt="image" className="image" />
      </div>
      <div className="detailMovie__detail">
        <div className="detailMovie__detail__name">{movie.name}</div>
        <div className="detailMovie__detail__item">
          <b>{t("auth.minutes")}:</b> {movie.minutes}
        </div>
        <div className="detailMovie__detail__item">
          <b>{t("home.releaseDate")}:</b> {movie.releaseDate}
        </div>
        <div className="detailMovie__detail__item">
          <b>{t("auth.category")}:</b> {movie.category}
        </div>
        <div className="detailMovie__detail__item">
          <b>{t("auth.status")}: </b>
          {movie.status === 1 ? t("home.nowShowing") : t("home.comingSoon")}
        </div>
        <div className="detailMovie__detail__item">
          <b>{t("auth.pointIMDB")}:</b> {movie.pointIMDB}
        </div>
        <div className="detailMovie__detail__item">
          <b>{t("auth.age")}:</b> {movie.age}
        </div>
        <div className="detailMovie__detail__item">
          <b>{t("auth.type")}:</b> {movie.type}
        </div>
        <div className="detailMovie__detail__item">
          <b>{t("auth.directors")}:</b> {movie.directors}
        </div>
        <div className="detailMovie__detail__item">
          <b>{t("auth.cast")}:</b> {movie.cast}
        </div>
        <div className="detailMovie__detail__item">
          <b>{t("auth.nation")}:</b> {movie.nation}
        </div>
        <div className="detailMovie__detail__item">
          <b>{t("auth.description")}:</b> {movie.description}
        </div>
        {movie.status === 1 ? (
          <span
            className="detailMovie__booking"
            onClick={() => handleModal(movie.id)}
          >
            {t("home.booking")}
          </span>
        ) : (
          ""
        )}
        {account ? (
              <div className={isOpenModal === movie.id ? "" : "none"}>
                <BookingForm
                  isOpenModal2={isOpenModal}
                  passIsOpen={passIsOpen}
                  movieNow={movie}
                />
              </div>
            ) : (
              ""
            )}
      </div>
    </div>
  ) : (
    ""
  );
};

export default DetailMovie;
