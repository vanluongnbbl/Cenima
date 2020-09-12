import React, { useState, useEffect } from "react";
import "../../sass/bookingSeats.scss";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import * as saveBookingActions from '../../actions/saveBooking'

const BookingSeats = () => {
  const [clickSeat, setClickSeat] = useState(0)
  const saveBooking = useSelector(state => state.saveBookingReducer.saveBooking)
  const dispatch = useDispatch()
  const { t } = useTranslation("common")

  useEffect(() => {
    dispatch(saveBookingActions.saveBookingRequest())
  }, [dispatch])

  console.log("saveBooking", saveBooking)


  let today = new Date()
  let weekday = new Array(10);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  weekday[7] = "Sunday";
  weekday[8] = "Monday";
  weekday[9] = "Tuesday";
  let dateToday = (weekday[today.getDay()] +
    " - " + (today.getDate())
    + '/' + (today.getMonth() + 1))
  let dateToday1 = (weekday[today.getDay() + 1] +
    " - " + (today.getDate() + 1)
    + '/' + (today.getMonth() + 1))
  let dateToday2 = (weekday[today.getDay() + 2] +
    " - " + (today.getDate() + 2)
    + '/' + (today.getMonth() + 1))
  let dateToday3 = (weekday[today.getDay() + 3] +
    " - " + (today.getDate() + 3)
    + '/' + (today.getMonth() + 1))




  const showInfoBoard = () => {
    const result = []

    if (saveBooking !== null) {
      result.push(
        <div className="bookingSeats__infoBoard" key={1}>
          <div className="bookingSeats__infoBoard__header">
            <span className="content">{saveBooking.nameTheater}</span>
            <span className="content">Cinema {saveBooking.cinemaRoom}</span>
            <span className="content">{t("home.remaining")} (249/260)</span>
          </div>
          <div className="bookingSeats__infoBoard__footer">
            <span className="date">
              {saveBooking.showDate === 0 ?
                dateToday : saveBooking.showDate === 1 ?
                  dateToday1 : saveBooking.showDate === 2 ?
                    dateToday2 : dateToday3}
            </span>
            <span className="times">20:30 ~ 23:25</span>
          </div>
        </div>
      )
    }

    return result
  }

  return (
    <div className="bookingSeats">
      <div className="container">
        <div className="bookingSeats__title"><span className="title">{t("home.bookingOnline")}</span></div>

        {showInfoBoard()}

        <div className="bookingSeats__screen">{t("home.screen")}</div>
        <div className="bookingSeats__seats row">
          <div className="bookingSeats__seats__item booked">A01</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
          <div className="bookingSeats__seats__item">A02</div>
        </div>
        <div className="bookingSeats__total">
          <span className="total">{t("home.paymentMovie")}: <b>30$</b></span>
          <span className="next">{t("home.next")} &#10095;</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSeats;
