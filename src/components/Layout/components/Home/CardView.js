import classNames from 'classnames/bind';
import styles from './CardView.module.scss';
//
import { useNavigate } from 'react-router-dom';
//
const cx = classNames.bind(styles);

const CardView = (props) => {
  let navigate = useNavigate();

  const nextPage = () => {
    navigate('/' + props.url);
  };

  return (
    <div className={cx('item')} onClick={nextPage}>
      <props.icon className={cx('icon')}></props.icon>
      <h3 className={cx('title')}>{props.name}</h3>
    </div>
  );
};

export default CardView;
