import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as bookingTimeAction from "../../../actions/bookingTime";
import * as theaterAction from '../../../actions/theaterAction'
function BookingForm() {
    const sessions = useSelector(state => state.bookingTimeReducer.data)
    const theaters = useSelector(state => state.theaterReducer.data)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(bookingTimeAction.bookingTimeRequest())
    }, [dispatch])

    useEffect(() => {
        dispatch(theaterAction.theaterRequest())
    }, [dispatch])

    const showSession = (session) => {
        return (
            session.suatChieu.map((suat, i) =>
                <span className="booking-form__time__item" key={i}>{suat} PM</span>)
        )
    }

    return (
        <div className="booking-form">
            <div className="booking-form__inner">
                <div className="booking-form__date row">
                    <span className="booking-form__date__item active">Monday - 01/09</span>
                    <span className="booking-form__date__item">Monday - 01/09</span>
                    <span className="booking-form__date__item">Monday - 01/09</span>
                    <span className="booking-form__date__item">Monday - 01/09</span>
                </div>

                <div className="booking-form__city row">
                    <span className="booking-form__city__item active">Ho Chi Minh</span>
                    <span className="booking-form__city__item">Ha noi</span>
                    <span className="booking-form__city__item">Da Nang</span>
                </div>

                <div className="booking-form__type row">
                    <span className="booking-form__type__item active">2D Vietsub</span>
                    <span className="booking-form__type__item">3D Vietsub</span>
                    <span className="booking-form__type__item">2D Dubbing</span>
                </div>

                {
                    sessions && sessions.map((session, i) =>
                        <div className="booking-form__time" key={i}>
                            <div className="booking-form__time__name">Vincom Royal</div>
                            <div className="row">
                                {showSession(session)}

                            </div>
                        </div>)

                }


            </div>
        </div>
    )
}

export default BookingForm
