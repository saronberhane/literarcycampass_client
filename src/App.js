import { useContext } from "react";
import "./App.css";
import Pages from "./components/pages/Pages";
import { DataContext } from "./context/login.context";
import Cookies from "js-cookie";

function App() {
  const { setIsLoggedIn } = useContext(DataContext);
  const token = Cookies.get("user");
  if (token) {
    setIsLoggedIn(true);
  }

  return (
    <>
      <Pages />
    </>
  );
}

export default App;
