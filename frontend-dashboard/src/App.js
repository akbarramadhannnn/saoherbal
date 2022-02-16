import React, { useMemo, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes";

// layouts
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";
import Error500 from "./components/Error/Error500";

// middleware
import { Authmiddleware, NonAuthmiddleware } from "./middleware/auth";
import { LOAD_USER } from "./store/auth/actionsTypes";
import { HandleLoadUser } from "./api/auth";

const App = () => {
  const dispatch = useDispatch();
  const selectorLayout = useSelector(({ Layout }) => Layout);
  const selectorAuth = useSelector(({ Auth }) => Auth);
  const selectorCommon = useSelector(({ Common }) => Common);

  useEffect(() => {
    HandleLoadUser().then(response => {
      if (response) {
        if (response.status === 200) {
          dispatch({
            type: LOAD_USER,
            payload: {
              isAuth: true,
              user: response.result,
            },
          });
        }
      }
    });
  }, [dispatch]);

  const Layout = useMemo(() => {
    let layoutCls = VerticalLayout;
    switch (selectorLayout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  }, [selectorLayout]);

  return (
    <Fragment>
      {selectorCommon.error === "Network Error" ? (
        <Error500 message="No Internet Connection" />
      ) : (
        <Router>
          <Switch>
            {publicRoutes(selectorAuth).map((p, i) => (
              <NonAuthmiddleware
                path={p.path}
                layout={NonAuthLayout}
                component={p.component}
                key={i}
                isAuth={selectorAuth.isAuth}
                position={selectorAuth.user.position}
              />
            ))}

            {authProtectedRoutes(selectorAuth).map((route, idx) => (
              <Authmiddleware
                exact={route.exact}
                path={route.path}
                layout={Layout}
                component={route.component}
                key={idx}
                isAuth={selectorAuth.isAuth}
              />
            ))}
          </Switch>
        </Router>
      )}
    </Fragment>
  );
};

export default App;
