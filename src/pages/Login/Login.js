import className from 'classnames/bind';
import style from './Login.module.scss';
import axios from 'axios';
import { apiUrl } from '../../contexts/contexts';
import { useState, useEffect } from 'react';
//React-Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//
import { useNavigate } from 'react-router-dom';

const cx = className.bind(style);

function Login() {
  let navigate = useNavigate();
  //email
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  //kiem tra token
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
            navigate('/');
          })
          .catch((error) => {
            // console.log(error);
            // navigate('/login');
          });
      } else {
        // navigate('/login');
      }
    };
    checklogin();
  }, [navigate]);

  //pup thong bao
  const pupwarn = (message) =>
    toast.warn(message, {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  //==========
  const login = () => {
    return (e) => {
      axios
        .post(apiUrl + '/v1/login', {
          email: Email,
          password: Password,
        })
        .then((res) => {
          document.cookie = `accessToken= Bearer ${res.data.accessToken}`;
          document.cookie = `refreshToken= Bearer ${res.data.refreshToken}`;
          navigate('/');
        })
        .catch((res) => {
          pupwarn(res.response.data.message);
        });
    };
  };

  // const ref = () => {
  //   return (e) => {
  //     // axios
  //     //   .post('http://localhost:5000/api/v1/refresh-token')
  //     //   .then((res) => {
  //     //     console.log(res);
  //     //   })
  //     //   .catch((res) => {
  //     //     console.log(res);
  //     //   });
  //     var myHeaders = new Headers();
  //     myHeaders.append('Cookie', 'refreshToken=' + RefreshToken);

  //     var urlencoded = new URLSearchParams();

  //     var requestOptions = {
  //       method: 'POST',
  //       headers: myHeaders,
  //       body: urlencoded,
  //       redirect: 'follow',
  //     };

  //     fetch('http://localhost:5000/api/v1/refresh-token', requestOptions)
  //       .then((response) => response.text())
  //       .then((result) => console.log(result))
  //       .catch((error) => console.log('error', error));
  //   };
  // };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container-logo')}>
        <img
          className={cx('logo')}
          src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/logo.36f34a9f.svg"
          alt="logo"
        />
        <h2>HRM</h2>
      </div>
      <div className={cx('left')}>
        <img
          src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/login-v2.72cd8a26.svg"
          alt=""
        />
      </div>
      <div className={cx('right')}>
        <div className={cx('container-right')}>
          <h2>Welcome to Vuexy! 👋</h2>
          <p>Please sign-in to your account and start the adventure</p>
          <div className={cx('container-input')}>
            <label>Email</label>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
            <label>Password</label>
            <input type="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)}></input>
            <a href="/">Quên mật khẩu</a>
          </div>
          <div className={cx('container-btn')}>
            <button onClick={login()}>Đăng nhập</button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Login;
