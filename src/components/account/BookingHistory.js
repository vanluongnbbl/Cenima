import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ShowTicket from "./ShowTicket";

const BookingHistory = (props) => {
  const account = useSelector((state) => state.currentUser.account);
  const tickets = useSelector((state) => state.tickets.tickets);
  const { t } = useTranslation("common");
  const [isOpenModal, setIsOpenModal] = useState(0);

  const filterTicket = () => {
    if (tickets && account) {
      return tickets.filter((data) => data.userId === account[0].id)
    }
  }

  const checkLogin = () => {
    if (!account) {
      props.history.push("/login");
    }
  };

  const passIsOpen = (value) => {
    setIsOpenModal(value);
  };

  const handleModal = (id) => {
    setIsOpenModal(id);
  };

  const showTicket = () => {
    let result = [];
    filterTicket().forEach((ticket, i) => {
        const day = new Date(ticket.timeSet);

        return result.push(
          <div key={i} className="content">
            <div className="content__item">{i + 1}</div>
            <div className="content__item">{ticket.nameMovie}</div>
            <div className="content__item">{ticket.showtimes.nameTheater}</div>
            <div className="content__item">
              {day.getDate() + "/" + day.getMonth() + "/" + day.getFullYear()}
            </div>
            <div className="content__item">
              <span className="edit" onClick={() => handleModal(ticket.id)}>
                {t("auth.show")}
              </span>
            </div>
            <div className={isOpenModal === ticket.id ? "" : "none"}>
              <ShowTicket
                passIsOpen={passIsOpen}
                isOpenModal={isOpenModal}
                ticket={ticket}
              />
            </div>
          </div>
        );
      });
    return result;
  };

  return (
    <div>
      {!account ? (
        checkLogin()
      ) : (
        <div style={{ paddingTop: 70 + "px" }} className="wrapperHistory">
          <div className="title">
            <div className="title__item">#</div>
            <div className="title__item">{t("auth.nameMovie")}</div>
            <div className="title__item">{t("auth.nameTheater")}</div>
            <div className="title__item">{t("auth.timeSet")}</div>
            <div className="title__item">{t("auth.action")}</div>
          </div>
          {showTicket()}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
