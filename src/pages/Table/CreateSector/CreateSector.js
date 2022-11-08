import classNames from 'classnames/bind';
import styles from './CreateSector.module.scss';
// import { useNavigate } from 'react-router-dom';
//
//input localhost file
import axios from 'axios';
import { apiUrl, cookieValue } from '../../../contexts/contexts';
import { useState } from 'react';
//
import { ToastContainer, toast } from 'react-toastify';
//
const cx = classNames.bind(styles);

const CreateSector = () => {
  //data filetfields
  const [SectorField, setSectorField] = useState('');
  //============================
  const createSector = () => {
    axios
      .post(
        apiUrl + '/v1/create-sector',
        { SectorName: SectorField },
        {
          headers: {
            token: cookieValue(),
          },
        },
      )
      .then((res) => {
        pupsuccess(res.data.message);
        setSectorField('');
      })
      .catch((error) => {
        pupwarn(error.response.data.message);
      });
  };
  //================================
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

  const pupsuccess = (message) =>
    toast.success(message, {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  //================================

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container1')}>
        <h3>Tạo khu vực mới</h3>
        {/* ================================== */}
        <div className={cx('container-infor')}>
          <label>Nhập tên khu vực</label>
          <input
            type="text"
            className={cx('container-infor-ch')}
            onChange={(e) => setSectorField(e.target.value)}
            value={SectorField}
          />
        </div>
        {/* ================================== */}
        <button className={cx('container-btn')} onClick={createSector}>
          Tạo mới
        </button>
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
};

export default CreateSector;
