import React, { useMemo } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes";

// layouts
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// middleware
import { Authmiddleware, NonAuthmiddleware } from "./middleware/auth";

const App = () => {
  const selectorLayout = useSelector(({ Layout }) => Layout);
  const selectorAuth = useSelector(({ Auth }) => Auth);

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
  );
};

export default App;
