import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { API_MAIN } from "../config/env";
import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { readCookie, removeToken } from "../globals/helpers";
import NavbarComponent from "./NavbarComponent";

function HOC(props) {
  const { navbar: Navbar, component: Component, isUserAdmin } = props;

  return (
    <>
      <Navbar isUserAdmin={isUserAdmin} />
      <Component />
    </>
  );
}

function AuthRoutes(props) {
  const { type, component: Component, admin, path } = props;
  const [isLoading, setIsLoading] = useState(true);
  // const [isLoading, setIsLoading] = useState(() => {
  //   if (type === "public") {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // });
  const [isAuthorized, setIsAuthorized] = useState(false);
  // const [token, setToken] = useState(readCookie("token"));
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  const token = useMemo(() => {
    return readCookie("token");
  }, [path]);

  //when url change and enter key is pressed and refresh happens,
  //this will be run every time (the else block if there is)

  //when Redirect is returned and this same component runs, the useEffect
  //will not run (if empty array is passed), so add a dependency to force is to
  //run for every redirect (if the render method in route is render, not component???)

  //however if the render method is render,
  //once enter is pressed, the case is the same unforuntately

  useEffect(() => {
    if (type === "private") {
      setIsLoading(true);

      if (!token) {
        setIsLoading(false);
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        axios
          .post(`${API_MAIN}/users/validateAuthorization`, { type }, config)
          .then((res) => {
            if (admin) {
              if (res.data.data.user.role !== "admin") {
                setIsAuthorized(false);
                setIsLoading(false);
                return;
              }
            }

            if (res.data.data.user.role === "admin") {
              setIsUserAdmin(true);
            }

            setIsAuthorized(true);
            setIsLoading(false);
          });
      } catch (err) {
        console.log(err);
        removeToken();

        setIsLoading(false);
      }
    }

    return () => {
      setIsLoading(true);
      setIsAuthorized(false);
      // setToken(readCookie("token"));
    };
    //reverting back is important, otherwise the previous state will be used
    //for some reason
  }, [path]);

  if (admin && !isLoading && !isAuthorized) {
    // if (admin){
    // if (isLoading) {
    //   return <></>;
    // }

    // if (!isLoading && !isAuthorized) {
    return <Redirect exact to="/home" />;
    // }
  }

  // //if admin
  // if (!isLoading && admin && !isAuthorized) {
  //   return <Redirect exact to="/home" />;
  //   // return "ahah";
  // }

  //if private - //potential bug here b/c of the isLoading
  // if (!isLoading && type === "private" && !isAuthorized) {
  //   console.log("private and unauthorized");
  //   return <Redirect to="/sign-in" />;
  // }

  if (type === "private" && !isLoading && !isAuthorized) {
    // if (type === "private"){
    // if (isLoading) {
    //   return <></>;
    // }

    // if (!isLoading && !isAuthorized) {
    return <Redirect exact to="/sign-in" />;
    // }
  }

  // if public
  if (type === "public" && !token) {
    return <Route exact={props.exact} path={path} component={Component} />;
  }

  if (type === "public" && token) {
    return <Redirect exact to="/home" />;
  }

  if (path === "/") {
    return <Redirect to="/sign-in" />;
  }

  //if 404
  if (!path) {
    return <Redirect to="/sign-in" />;
  }

  //if authorized
  return (
    <>
      {/* {isAuthorized && (
        <Route
          // {...props}
          exact={props.exact}
          path={path}
          // component={() => (
          //   <HOC navbar={NavbarComponent} component={Component} />
          // )}
          render={() => <HOC navbar={NavbarComponent} component={Component} />}
        />
      )} */}
      <HOC
        navbar={NavbarComponent}
        component={Component}
        isUserAdmin={isUserAdmin}
      />
    </>
  );
}

export default withRouter(AuthRoutes);
