import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import New from "./views/New";
import SingleListing from "./views/SingleListing";
import Landing from "./views/Landing";
import Admin from "./views/Admin";
import Login from "./views/Login";
import Properties from "./views/Properties";
import Registration from "./views/Registration";
import Contacts from "./views/Contacts";
import NavBar from "./components/global-components/nav-bar/NavBar";
import PseudoNav from "./components/global-components/nav-bar/PseudoNav";

function App() {
  const [theme, colorMode] = useMode();
  const [navShouldRender, setNavShouldRender] = useState(true);
  const currentPath = useLocation().pathname;

  useEffect(() => {
    const shouldRenderNavBar = currentPath !== '/login' && currentPath !== '/signup';
    setNavShouldRender(shouldRenderNavBar);
  }, [currentPath]);
  

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          {navShouldRender ? <NavBar /> : <PseudoNav />}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/login"
              element={<Login setNavShouldRender={setNavShouldRender} />}
            />
            <Route
              path="/signup"
              element={<Registration setNavShouldRender={setNavShouldRender} />}
            />
            <Route path="/listing/new" element={<New />} />
            <Route path="/listing/:id" element={<SingleListing />} />
            <Route path="/admin//*" element={<Admin />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
