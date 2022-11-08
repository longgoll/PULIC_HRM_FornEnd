import classNames from 'classnames/bind';
import styles from './Category.module.scss';
//
import { BsPlusLg } from 'react-icons/bs';
import CardCategory from '../../../components/Layout/components/Menu/CardCategory/CardCategory';
//
import { useNavigate } from 'react-router-dom';
//input localhost file
import axios from 'axios';
import { apiUrl, cookieValue } from '../../../contexts/contexts';
import { useEffect, useState } from 'react';
//
const cx = classNames.bind(styles);

const Category = () => {
  let navigate = useNavigate();
  //data
  const [dataCategory, setdataCategory] = useState([]);
  //======================
  //lấy dữ liệu category
  useEffect(() => {
    axios
      .get(apiUrl + '/v1/get-all-category', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((res) => {
        setdataCategory(res.data.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  //========================
  //chuyển trang
  const nextPage = () => {
    navigate('/create-category');
  };

  //chuyển trang chi tiết
  const nextPageDetailFood = (id) => {
    return (e) => {
      navigate('/detail-category/' + id);
    };
  };
  //========================
  //rander ui
  const listcategory = dataCategory.map((data) => {
    return (
      <div key={data._id} className={cx('container1-1')} onClick={nextPageDetailFood(data._id)}>
        <CardCategory NameCategory={data.categoryName} />
      </div>
    );
  });

  return (
    <div className={cx('wrapper')}>
      <button className={cx('container-btn')} onClick={nextPage}>
        <BsPlusLg className={cx('container-btn-icon')} />
        Tạo danh mục mới
      </button>
      {/* ====================== */}
      <h3 className={cx('container-title')}>Tất cả</h3>
      <div className={cx('container1')}>{listcategory}</div>
    </div>
  );
};

export default Category;
