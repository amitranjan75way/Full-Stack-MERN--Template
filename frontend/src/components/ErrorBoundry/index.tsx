import { Component, ReactNode } from "react";
import styles from "./index.module.css";
import errorpng from '../../../public/assets/oops.png';


class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer}>
          <img src={errorpng} alt="Error" className={styles.errorImage} />
          <h1>Oops! Something went wrong.</h1>
          <p>We encountered an unexpected error. Please try refreshing the page.</p>
          <button onClick={this.handleReload} className={styles.reloadButton}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
