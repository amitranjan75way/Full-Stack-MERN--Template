import { Link } from "react-router-dom";
import style from "./index.module.css";

const NotFound = () => {
  return (
    <div className={style.container}>
      <h1 className={style.notfound}>404 - Page Not Found</h1>
      <p className={style.notfoundPara}>The page you're looking for doesn't exist.</p>
      <Link to="/" className={style.homeButton}>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
