import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import BookingForm from "./BookingForm";
import * as pointActions from "../../../actions/point";
import * as adminActions from "../../../actions/admin";
import * as uiActions from "../../../actions/ui";
import "../../../sass/detailMovie.scss";
import { BsStar, BsStarFill } from "react-icons/bs";

const DetailMovie = (props) => {
  const movie = useSelector((state) => state.admin.movie);
  const [movie1, setMovie1] = useState(movie);
  const [isOpenModal, setIsOpenModal] = useState(0);
  const account = useSelector((state) => state.currentUser.account);
  const { t } = useTranslation("common");
  const [ticketMovieName, setTicketMovieName] = useState("");
  const dispatch = useDispatch();
  const points = useSelector((state) => state.points.points);
  const [count, setCount] = useState(0);

  useEffect(() => {
    dispatch(uiActions.showLoading());
    setTimeout(() => {
      dispatch(adminActions.showMovie(props.match.params.id));
      dispatch(uiActions.hideLoading());
    }, 1000);
  }, [dispatch, props]);

  useEffect(() => {
    if (movie && count !== 0) {
      setMovie1(movie);
    } else setMovie1(movie);
  }, [movie, count]);

  const handlePoint = () => {
    let result = points;
    let mediumScore = 0;
    let templ = movie;
    let count1 = 0;
    if (count !== 0 && points) {
      let index1 = searchIndexMovie(points);
      if (index1 !== -1) {
        let index = searchIndex(points[index1].users);
        if (index !== -1) {
          result[index1].users[index].point = count;
        } else {
          result[index1].users.push({
            usersId: account[0].id,
            point: count,
          });
        }
      }
      points[index1].users.forEach((list, i) => {
        mediumScore = mediumScore + list.point;
        count1 = count1 + 1;
      });
      templ.pointIMDB =
        Math.round((mediumScore / count1) * 100 + Number.EPSILON) / 100;
      dispatch(adminActions.editMovie(templ));
      dispatch(pointActions.editPost(result[index1]));
    }
    return result;
  };

  useEffect(() => {
    if (count !== 0) {
      handlePoint();
      dispatch(adminActions.showMovie(props.match.params.id));
    }
  }, [dispatch, count, props, points]);

  const searchIndex = (lists) => {
    let index = -1;
    lists.forEach((list, i) => {
      if (list.usersId === account[0].id) index = i;
    });
    return index;
  };

  const searchIndexMovie = (lists) => {
    let index = -1;
    lists &&
      lists.forEach((list, i) => {
        if (list.id === movie.id) index = i;
      });
    return index;
  };

  const passIsOpen = (value) => {
    setIsOpenModal(value);
  };

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

  const showSelector = () => {
    let result = [];
    for (let i = 1; i <= count; i++) {
      result.push(
        <BsStarFill
          style={{ marginRight: "2px", color: "orange" }}
          key={i}
          onClick={() => setCount(i)}
        />
      );
    }
    for (let i = count + 1; i <= 10; i++) {
      result.push(
        <BsStar
          style={{ marginRight: "2px", color: "orange" }}
          key={i}
          onClick={() => setCount(i)}
        />
      );
    }
    return result;
  };

  return movie1 ? (
    <div className="detailMovie container">
      <div className="detailMovie__image">
        <img src={movie1.image} alt="image" className="image" />
      </div>
      <div className="detailMovie__detail">
        <div className="detailMovie__detail__name">{movie1.name}</div>
        <div className="detailMovie__detail__item">
          <b>{t("auth.minutes")}:</b> {movie1.minutes}
        </div>
        <div className="detailMovie__detail__item">
          <b>{t("home.releaseDate")}:</b> {movie1.releaseDate}
        </div>
        <div className="detailMovie__detail__item">
          <b>{t("auth.category")}:</b> {movie1.category}
        </div>
        <div className="detailMovie__detail__item">
          <b>{t("auth.status")}: </b>
          {movie1.status === 1 ? t("home.nowShowing") : t("home.comingSoon")}
        </div>
        <div className="detailMovie__detail__item">
          <b>{t("auth.pointIMDB")}:</b> {movie1.pointIMDB}
        </div>
        <div className="detailMovie__detail__item">
          <b>{t("auth.age")}:</b> {movie1.age}
        </div>
        <div className="detailMovie__detail__item">
          <b>{t("auth.type")}:</b> {movie1.type}
        </div>
        <div className="detailMovie__detail__item">
          <b>{t("auth.directors")}:</b> {movie1.directors}
        </div>
        <div className="detailMovie__detail__item">
          <b>{t("auth.cast")}:</b> {movie1.cast}
        </div>
        <div className="detailMovie__detail__item">
          <b>{t("auth.nation")}:</b> {movie1.nation}
        </div>
        <div className="detailMovie__detail__item">
          <b>{t("auth.description")}:</b> {movie1.description}
        </div>
        {account && movie.status === 1 ? (
          <div className="detailMovie__detail__item">
            <b style={{ marginRight: "5px" }}>{t("home.evaluate")}:</b>
            {showSelector()}
          </div>
        ) : (
          ""
        )}
        {account && movie.status === 1 ? (
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
              ticketMovieName2={ticketMovieName}
              passTicketMovieName={passTicketMovieName}
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
