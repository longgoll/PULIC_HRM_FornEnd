import classNames from 'classnames/bind';
import styles from './CreateCategory.module.scss';
// import { useNavigate } from 'react-router-dom';
//input localhost file
import axios from 'axios';
import { apiUrl, cookieValue } from '../../../contexts/contexts';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
//
const cx = classNames.bind(styles);

const CreateCategory = () => {
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
  //tạo category
  const createCategory = () => {
    axios
      .post(
        apiUrl + '/v1/create-category',
        { IndexCategory: indexCategory, categoryName: NameCategory },
        {
          headers: {
            token: cookieValue(),
          },
        },
      )
      .then((res) => {
        pupsuccess(res.data.message);
        setindexCategory('');
        setNameCategory('');
      })
      .catch((error) => {
        pupwarn(error.response.data.message);
      });
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container1')}>
        <h3>Tạo danh mục món ăn mới</h3>
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
        <button className={cx('container-btn')} onClick={createCategory}>
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

export default CreateCategory;
