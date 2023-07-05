import { BallTriangle } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.Loader}>
    <BallTriangle color="#00BFFF" height={80} width={80} />
  </div>
);

export default Loader;
