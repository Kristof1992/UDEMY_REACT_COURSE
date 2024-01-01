import PageNav from "../components/PageNav";

import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";

function Homepage() {
  return (
    <div className={styles.homepage}>
      <PageNav />

      <h1 className="test">WorldWise</h1>
      <Link to="/app">Go to the app</Link>
    </div>
  );
}

export default Homepage;
