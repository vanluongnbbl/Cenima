import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as adminActions from "../../actions/admin";
import { useTranslation } from "react-i18next";

const AddMovie = (props) => {
  const [isOpenModal, setIsOpenModal] = useState(props.isOpenModalAddMovie);
  const [name, setName] = useState("");
  const [minutes, setMinutes] = useState();
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("1");
  const [type, setType] = useState("1");
  const [directors, setDirectors] = useState("");
  const [nation, setNation] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [cast, setCast] = useState("");
  const [age, setAge] = useState();
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  useEffect(() => {
    setIsOpenModal(props.isOpenModalAddMovie);
  }, [props.isOpenModalAddMovie]);

  const handleModal = () => {
    props.passIsOpenModalAddMovie(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let templ = {};
    templ.name = name;
    templ.minutes = minutes;
    templ.category = category;
    status === "1" ? (templ.status = 1) : (templ.status = 0);
    type === "1"
      ? (templ.type = "2D")
      : type === "2"
      ? (templ.type = "3D")
      : (templ.type = "2D/3D");
    templ.nation = nation;
    templ.description = description;
    templ.cast = cast;
    templ.age = age;
    templ.directors = directors;
    templ.releaseDate = releaseDate;
    templ.image = image;
    dispatch(adminActions.addMovie(templ));
    props.passIsOpenModalAddMovie(false);
    props.passNameMovie(templ);
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "name":
        return setName(event.target.value);
      case "minutes":
        return setMinutes(event.target.value);
      case "category":
        return setCategory(event.target.value);
      case "status":
        return setStatus(event.target.value);
      case "type":
        return setType(event.target.value);
      case "directors":
        return setDirectors(event.target.value);
      case "nation":
        return setNation(event.target.value);
      case "description":
        return setDescription(event.target.value);
      case "cast":
        return setCast(event.target.value);
      case "age":
        return setAge(event.target.value);
      case "releaseDate":
        return setReleaseDate(event.target.value);
        case "image":
        return setImage(event.target.value);
      default:
        return 0;
    }
  };

  return (
    <div
      className={
        !isOpenModal ? "booking-form-container none" : "booking-form-container"
      }
    >
      <div className="background-modal" onClick={handleModal}></div>
      <div className="booking-form">
        <div className="booking-form__inner">
          <form className="register adminEditUser" onSubmit={handleSubmit}>
            <label htmlFor="name">{t("auth.name")}</label>
            <input
              name="name"
              placeholder={t("auth.name")}
              type="text"
              id="name"
              value={name}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="image">{t("auth.image")}</label>
            <input
              name="image"
              placeholder={t("auth.image")}
              type="text"
              id="image"
              value={image}
              onChange={handleChange}
            />
            <br />

            <label htmlFor="minutes">{t("auth.minutes")}</label>
            <input
              name="minutes"
              placeholder={t("auth.minutes")}
              value={minutes}
              type="number"
              id="minutes"
              onChange={handleChange}
            />
            <br />

            <label htmlFor="releaseDate">{t("auth.releaseDate")}</label>
            <input
              name="releaseDate"
              placeholder={t("auth.releaseDate")}
              value={releaseDate}
              type="date"
              id="releaseDate"
              onChange={handleChange}
            />
            <br />

            <label htmlFor="category">{t("auth.category")}</label>
            <input
              name="category"
              placeholder={t("auth.category")}
              value={category}
              type="text"
              id="category"
              onChange={handleChange}
            />
            <br />

            <label htmlFor="age">{t("auth.age")}</label>
            <input
              name="age"
              placeholder={t("auth.age")}
              value={age}
              type="number"
              id="age"
              onChange={handleChange}
            />
            <br />

            <label htmlFor="directors">{t("auth.directors")}</label>
            <input
              name="directors"
              placeholder={t("auth.directors")}
              value={directors}
              type="text"
              id="directors"
              onChange={handleChange}
            />
            <br />
            <label htmlFor="cast">{t("auth.cast")}</label>
            <textarea
              name="cast"
              placeholder={t("auth.cast")}
              value={cast}
              type="text"
              rows="2"
              id="cast"
              onChange={handleChange}
            />
            <br />
            <label htmlFor="nation">{t("auth.nation")}</label>
            <input
              name="nation"
              placeholder={t("auth.nation")}
              value={nation}
              type="text"
              id="nation"
              onChange={handleChange}
            />
            <br />
            <label htmlFor="description">{t("auth.description")}</label>
            <textarea
              name="description"
              placeholder={t("auth.description")}
              value={description}
              type="text"
              rows="5"
              id="description"
              onChange={handleChange}
            />
            <br />

            <label>{t("auth.type")}</label>
            <label htmlFor="2D" className="gender">
              <input
                name="type"
                type="radio"
                value="1"
                id="2D"
                checked={type === "1"}
                onChange={handleChange}
              />{" "}
              {t("auth.2D")}
            </label>
            <br />
            <label htmlFor="3D" className="gender">
              <input
                name="type"
                type="radio"
                value="2"
                id="3D"
                checked={type === "2"}
                onChange={handleChange}
              />{" "}
              {t("auth.3D")}
            </label>
            <br />
            <label htmlFor="2D3D" className="gender">
              <input
                name="type"
                type="radio"
                value="3"
                id="2D3D"
                checked={type === "3"}
                onChange={handleChange}
              />{" "}
              {t("auth.2D3D")}
            </label>

            <label>{t("auth.status")}</label>
            <label htmlFor="nowShowing" className="gender">
              <input
                name="status"
                type="radio"
                value="1"
                id="nowShowing"
                checked={status === "1"}
                onChange={handleChange}
              />{" "}
              {t("home.nowShowing")}
            </label>
            <br />
            <label htmlFor="comingSoon" className="gender">
              <input
                name="status"
                type="radio"
                value="0"
                id="comingSoon"
                checked={status === "0"}
                onChange={handleChange}
              />{" "}
              {t("home.comingSoon")}
            </label>
            <br />

            <input type="submit" value={t("auth.editMovie")} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
