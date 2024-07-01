import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import styles from "./App.module.scss";
import { useState } from "react";
import Admin from "./pages/Admin/Admin";

function App() {
  const [page, setPage] = useState("homepage");
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header setPage={setPage} />
      {page === "homepage" && <HomePage />}
      {page === "admin" && <Admin />}
      <Footer />
    </div>
  );
}

export default App;
