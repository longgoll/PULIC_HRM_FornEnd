import classNames from 'classnames/bind';
import Header from '../components/Header/';
import Sidebar from '../components/Sidebar/Sidebar';
import styles from './DefaultLayout.module.scss';
//
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../../contexts/contexts';
import axios from 'axios';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  let navigate = useNavigate();

  //kiểm tra token and đẵ đăng nhập hay chưa
  useEffect(() => {
    const checklogin = () => {
      //kiểm tra có cookie nào tồn tại hay không
      if (document.cookie.split(';').some((item) => item.trim().startsWith('accessToken='))) {
        //đoc cookie
        const cookieValue = document.cookie
          .split('; ')
          .find((row) => row.startsWith('accessToken='))
          .split('=')[1];
        //Gửi req token lên server xác thực
        axios
          .post(`${apiUrl}/v1/accuracy-login`, { token: cookieValue })
          .then((res) => {
            // console.log(res);
          })
          .catch((error) => {
            // console.log(error);
            navigate('/login');
          });
      } else {
        navigate('/login');
      }
    };
    checklogin();
  }, [navigate]);

  return (
    <div className={cx('wrapper')}>
      <Sidebar />
      <div className={cx('main')}>
        <Header />
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
