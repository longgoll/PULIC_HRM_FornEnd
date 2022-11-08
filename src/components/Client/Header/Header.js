import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Header = () => {
  const navigate = useNavigate();

  const BackPage = () => {
    const url = window.location.href.split('/');
    navigate('/client-menu/' + url[4]);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container1')}>
        {/* =================== */}
        <div className={cx('container1-1')}>
          <h3 className={cx('title')} onClick={BackPage}>
            OMenu
          </h3>
        </div>
        {/* =================== */}
        {/* <div className={cx('container1-2')}>Đăng xuất</div> */}
      </div>
    </div>
  );
};

export default Header;
