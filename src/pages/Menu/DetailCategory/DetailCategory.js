import classNames from 'classnames/bind';
import styles from './DetailCategory.module.scss';
// import { useNavigate } from 'react-router-dom';
//input localhost file
import axios from 'axios';
import { apiUrl, cookieValue } from '../../../contexts/contexts';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
//
const cx = classNames.bind(styles);

const DetailCategory = () => {
  const navigate = useNavigate();
  //data fields
  const [indexCategory, setindexCategory] = useState('');
  const [NameCategory, setNameCategory] = useState('');
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
  //lấy dữ liệu
  useEffect(() => {
    const url = window.location.href.split('/');
    axios
      .get(apiUrl + '/v1/get-detail-category/' + url[4], {
        headers: {
          token: cookieValue(),
        },
      })
      .then((res) => {
        setindexCategory(res.data.data.IndexCategory);
        setNameCategory(res.data.data.categoryName);
      })
      .catch((error) => {});
  }, []);

  //================================
  //cap nhat danh muc
  const updateCategory = () => {
    const url = window.location.href.split('/');
    axios
      .put(
        apiUrl + '/v1/update-category/' + url[4],
        { IndexCategory: indexCategory, categoryName: NameCategory },
        {
          headers: {
            token: cookieValue(),
          },
        },
      )
      .then((res) => {
        pupsuccess(res.data.message);
        navigate('/menu');
      })
      .catch((error) => {
        pupwarn(error.response.data.message);
      });
  };

  //xoa
  const deleteCategory = () => {
    const url = window.location.href.split('/');
    axios
      .delete(apiUrl + '/v1/delete-category/' + url[4], {
        headers: {
          token: cookieValue(),
        },
      })
      .then((res) => {
        pupsuccess(res.data.message);
        navigate('/menu');
      })
      .catch((error) => {
        pupwarn(error.response.data.message);
      });
  };
  //================================
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container1')}>
        <h3>Danh mục món ăn</h3>
        {/* ================================== */}
        <div className={cx('container-infor')}>
          <label>Số thứ tự</label>
          <input
            type="text"
            className={cx('container-infor-ch')}
            onChange={(e) => setindexCategory(e.target.value)}
            value={indexCategory}
          />
        </div>
        {/* ================================== */}
        <div className={cx('container-infor')}>
          <label>Tên danh mục</label>
          <input
            type="text"
            className={cx('container-infor-ch')}
            onChange={(e) => setNameCategory(e.target.value)}
            value={NameCategory}
          />
        </div>
        {/* ================================== */}
        <div className={cx('container-btn')}>
          <button className={cx('btn-delete')} onClick={deleteCategory}>
            Xóa
          </button>
          <button className={cx('btn')} onClick={updateCategory}>
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

export default DetailCategory;
