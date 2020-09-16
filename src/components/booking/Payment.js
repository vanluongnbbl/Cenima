import React, { useEffect, useState } from "react";
import "../../sass/payment.scss";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import * as saveBookingActions from '../../actions/saveBooking'
import * as comboFoodAction from '../../actions/comboFood'
import { Link } from "react-router-dom";


const Payment = () => {

  const saveBooking = useSelector(state => state.saveBookingReducer.saveBooking)
  const getSeats = useSelector(state => state.seatReducer.seatData)
  const saveSeats = useSelector(state => state.saveSeatReducer.saveSeatData)

  const [bookedSeat, setBookedSeat] = useState([])

  const dispatch = useDispatch()
  let newArrPrice = (saveSeats && saveSeats.arrMoviePrice)

  useEffect(() => {
    if (getSeats !== null) {
      const result = [...getSeats].filter((getSeat) => {
        let result2 = getSeat.numberSeat
        const result3 = [...result2].filter((status) => {
          return status.status === false
        })
        setBookedSeat(() => [...result3])
      })
    }
  }, [getSeats])

  const totalMoviePrice = () => {
    let totalMovie
    if (newArrPrice !== null) {
      totalMovie = newArrPrice.reduce((a, b) => a + b, 0)
    }
    // let regexPrice = total

    return totalMovie
  }


  const totalPrice = () => {
    return totalMoviePrice() + 100
  }
  useEffect(() => {
    dispatch(saveBookingActions.saveBookingRequest())
  }, [dispatch])

  useEffect(() => {
    if (getSeats !== null) {
      const result = [...getSeats].filter((getSeat) => {
        let result2 = getSeat.numberSeat
        const result3 = [...result2].filter((status) => {
          return status.status === false
        })
        setBookedSeat(() => [...result3])
      })
    }
  }, [getSeats])


  const showRemaining = () => {
    if (getSeats !== null) {
      return getSeats && getSeats.map(seat =>
        <span className="content">{t("home.remaining")} ({bookedSeat.length}/{seat.numberSeat.length})</span>
      )
    }
  }


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
            {showRemaining()}
          </div>
          <div className="bookingSeats__infoBoard__footer">
            <span className="date">
              {saveBooking.showDate === 0 ?
                dateToday : saveBooking.showDate === 1 ?
                  dateToday1 : saveBooking.showDate === 2 ?
                    dateToday2 : dateToday3}
            </span>
            <span className="times">{saveBooking.screenings}</span>
          </div>
        </div>
      )
    }
    return result
  }

  const { t } = useTranslation("common");
  return (
    <div className="payment">
      <div className="container">
        <div className="payment__title">
          <span className="title">{t("home.bookingOnline")}</span>
        </div>
        {/*         
        <div className="payment__infoBoard">
          <div className="payment__infoBoard__header">
            <span className="content">Cinema</span>
            <span className="content">Cinema 2</span>
            <span className="content">{t("home.remaining")} (249/260)</span>
          </div>
          <div className="payment__infoBoard__footer">
            <span className="date">01/09/2020</span>
            <span className="times">20:30 ~ 23:25</span>
          </div>
        </div>
        */}

        {showInfoBoard()}
        <div className="payment__main">
          <div className="payment__main__title">{t("home.totalPayment")}</div>
          <div className="payment__main__content">
            <div className="wrapper">
              <div className="pay">
                <span className="pay__content key">{t("home.paymentMovie")}</span>
                <span className="pay__content value">{totalMoviePrice().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".",)} VND</span>
              </div>
              <div className="pay">
                <div className="pay__content key">{t("home.paymentFood")}</div>
                <div className="pay__content value">20$</div>
              </div>
              <div className="pay">
                <div className="pay__content key">{t("home.discount")}</div>
                <div className="pay__content value">0$</div>
              </div>
              <div className="total">{totalPrice().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".",)} VND</div>
            </div>
            <form>
              <label>{t("home.choosePay")}:</label>
              <label htmlFor="online">
                <input type="radio" name="pay" id="online" /> ATM
              </label>
              <label htmlFor="offline">
                <input type="radio" name="pay" id="offline" /> {t("home.cash")}
              </label>
            </form>
          </div>
        </div>
        <div className="payment__total">
          <span className="prev">
            <Link to="/bookingfood">&#10094; {t("home.prev")}</Link>
          </span>
          <span className="total">
            <div className="total__item">{t("home.payment")}</div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Payment;
