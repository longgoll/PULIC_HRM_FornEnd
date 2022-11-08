import classNames from 'classnames/bind';
import styles from './DetailSector.module.scss';
// import { useNavigate } from 'react-router-dom';
//
//input localhost file
import axios from 'axios';
import { apiUrl, cookieValue } from '../../../contexts/contexts';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//
import { ToastContainer, toast } from 'react-toastify';
//
const cx = classNames.bind(styles);
const DetailSector = () => {
  const navigate = useNavigate();
  //data filetfields
  const [SectorField, setSectorField] = useState('');
  //data
  //   const [DataSector, setDataSector] = useState('');
  //============================
  //lấy dữ liệu khu vực
  useEffect(() => {
    const url = window.location.href.split('/');
    axios
      .get(apiUrl + '/v1/get-detail-sector/' + url[4], {
        headers: {
          token: cookieValue(),
        },
      })
      .then((res) => {
        setSectorField(res.data.data.SectorName);
        // console.log(res);
      })
      .catch((error) => {
        pupwarn(error.response.data.message);
      });
  }, []);
  //============================
  //xóa
  const deleteSector = () => {
    const url = window.location.href.split('/');
    axios
      .delete(apiUrl + '/v1/delete-sector/' + url[4], {
        headers: {
          token: cookieValue(),
        },
      })
      .then((res) => {
        pupsuccess(res.data.message);
      })
      .catch((error) => {
        pupwarn(error.response.data.message);
      });
  };
  //cập nhật
  //cập nhật
  const updateSector = () => {
    const url = window.location.href.split('/');
    axios
      .put(
        apiUrl + '/v1/upadate-sector/' + url[4],
        {
          SectorName: SectorField,
        },
        {
          headers: {
            token: cookieValue(),
          },
        },
      )
      .then((res) => {
        pupsuccess(res.data.message);
        navigate('/table');
      })
      .catch((error) => {
        pupwarn(error.response.data.message);
      });
  };
  //============================
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
        <h3>Tên khu vực</h3>
        {/* ================================== */}
        <div className={cx('container-infor')}>
          <label>Tên khu vực</label>
          <input
            type="text"
            className={cx('container-infor-ch')}
            onChange={(e) => setSectorField(e.target.value)}
            value={SectorField}
          />
        </div>
        {/* ================================== */}
        <div className={cx('container-btn')}>
          <button className={cx('btn-delete')} onClick={deleteSector}>
            Xóa
          </button>
          <button className={cx('btn')} onClick={updateSector}>
            Cập nhật
          </button>
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
};

export default DetailSector;
