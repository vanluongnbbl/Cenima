import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../sass/adminUser.scss";
import { useTranslation } from "react-i18next";
import * as adminActions from "../../actions/admin";
import EditUser from "./EditUser";

const ManagementUsers = (props) => {
  const { t } = useTranslation("common");
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const accounts = useSelector((state) => state.currentUser.accounts);
  const [listUsers, setListUsers] = useState(accounts);
  const [deleteUser, setDeleteUser] = useState(-1);
  const [isOpenModal, setIsOpenModal] = useState(0);
  const toggleSidebar = useSelector((state) => state.ui.showSidebar);
  const dispatch = useDispatch();
  const [productPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const checkAdmin = () => {
    props.history.push("/");
  };

  const passIsOpen = (value) => {
    setIsOpenModal(value);
  };

  const indexOfLastPost = currentPage * productPerPage;
  const indexOfFirstPost = indexOfLastPost - productPerPage;
  const currentPosts =
    listUsers && listUsers.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalMovies = listUsers && listUsers.length;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalMovies / productPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    if (deleteUser !== -1) {
      accounts.splice(deleteUser, 1);
      setListUsers([...accounts]);
      setDeleteUser(-1);
    } else setListUsers(accounts);
  }, [accounts, deleteUser]);

  const handleModal = (id) => {
    setIsOpenModal(id);
  };

  const showAdminUser = () => {
    let result = [];
    result.push(
      <div className="adminUsers" key={1}>
        <table className="table">
          <tr>
            <th>#</th>
            <th>{t("auth.avatar")}</th>
            <th>{t("auth.name")}</th>
            <th>{t("auth.email")}</th>
            <th>{t("auth.phone")}</th>
            <th>{t("auth.region")}</th>
            <th>{t("auth.birth")}</th>
            <th>{t("auth.gender")}</th>
            <th>{t("auth.registerDate")}</th>
            <th>{t("auth.editUser")}</th>
          </tr>
          {showUsers()}
        </table>
        <ul
          className="pagination"
          style={{ "justify-content": "flex-start", margin: "20px 0" }}
        >
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <a onClick={() => paginate(number)} className="page-link">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
    return result;
  };

  const showUsers = () => {
    let result = [];
    currentPosts &&
      currentPosts.forEach((user, i) => {
        const day = new Date(user.registerDate);
        if (user.email !== "admin@admin") {
          return result.push(
            <tr key={i}>
              <td>{i}</td>
              <td>
                <img src={user.avatar} alt="avatar" className="avatar" />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.region}</td>
              <td>{user.birth}</td>
              <td>{user.gender}</td>
              <td>
                {day.getDate() + "/" + day.getMonth() + "/" + day.getFullYear()}
              </td>
              <td>
                <span className="edit" onClick={() => handleModal(user.id)}>
                  {t("auth.edit")}
                </span>
                &nbsp;
                <span className="delete" onClick={() => handleDeleteUser(user)}>
                  {t("auth.delete")}
                </span>
              </td>
              <div className={isOpenModal === user.id ? "" : "none"}>
                <EditUser
                  passIsOpen={passIsOpen}
                  isOpenModal={isOpenModal}
                  user={user}
                />
              </div>
            </tr>
          );
        }
      });
    return result;
  };

  const handleDeleteUser = (user) => {
    const string = t("auth.deleteConfirm");
    if(window.confirm(string)) {
      dispatch(adminActions.deleteUser(user));
      const index = searchIndex(user.id);
      if (index !== -1) {
        setDeleteUser(index);
      }
    }
  };

  const searchIndex = (id) => {
    let index = -1;
    listUsers.forEach((user, i) => {
      if (user.id === id) index = i;
    });
    return index;
  };

  return (
    <div className={toggleSidebar ? "wrapperAdminUsers" : "wrapperAdminUsers admin"}>
      {currentUser && currentUser.email === "admin@admin"
        ? showAdminUser()
        : checkAdmin()}
    </div>
  );
};

export default ManagementUsers;
