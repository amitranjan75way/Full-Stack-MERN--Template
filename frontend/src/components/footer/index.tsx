import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import logo from '../../../public/assets/logo.jpg';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            {/* <img src={logo} alt="Logo Here" className={styles.footerlogo} /> */}
          </div>
          <span className={styles.appName}>My App</span>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li><Link to="#home">Home</Link></li>
            <li><Link to="#about">About</Link></li>
            <li><Link to="#services">Services</Link></li>
            <li><Link to="#contact">Contact</Link></li>
          </ul>
        </nav>
        <div className={styles.socials}>
          <Link to="#facebook" className={styles.icon}>Facebook</Link>
          <Link to="#twitter" className={styles.icon}>Twitter</Link>
          <Link to="#instagram" className={styles.icon}>Instagram</Link>
        </div>
      </div>
      <div className={styles.copy}>
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
