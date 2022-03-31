import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './LoaderComponent.module.css';

function LoaderComponent() {
  return (
    <div className={s.overlay}>
      <Loader type="ThreeDots" color="#a52a2a" height="35" />
    </div>
  );
}

export default LoaderComponent;
