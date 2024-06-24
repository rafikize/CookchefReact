import Header from "./compenants/Header";
import Content from "./compenants/Content";
import Footer from "./compenants/Footer";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
