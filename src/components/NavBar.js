import React, { useContext } from "react";
import { Context } from "..";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { observer } from "mobx-react-lite";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from "../utils/consts";
import "./style.css";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    user.setIsUser({});
    user.setIsAuth(false);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink className="nav_link" to={SHOP_ROUTE}>
          Купи Слона
        </NavLink>

        {user.isAuth ? (
          <Nav className="navigation">
            <Button
              onClick={() => navigate(ADMIN_ROUTE)}
              className="nav_btn"
              variant="outline-light"
            >
              Админ Панель
            </Button>
            <Button
              onClick={() => navigate(BASKET_ROUTE)}
              className="nav_btn"
              variant="outline-light"
            >
              Корзина
            </Button>
            <Button
              onClick={() => logOut()}
              className="nav_btn"
              variant="outline-light"
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="navigation">
            <Button
              variant="outline-light"
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
