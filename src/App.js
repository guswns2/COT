import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import COT from "./pages/COT";
import { useEffect } from "react";
import Login from "./components/Login";
import Signin from "./components/Signin";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<COT />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signin" element={<Signin />} />
    </Routes>
  );
}
export default App;
