import classNames from 'classnames/bind';
import styles from './AddOrder.module.scss';
//components
import CardFood from '../../../../components/Layout/components/Menu/CardFood/CardFood';
//react dom
import { useNavigate } from 'react-router-dom';
//input localhost file
import axios from 'axios';
import { apiUrl, cookieValue } from '../../../../contexts/contexts';
import { useEffect, useState } from 'react';
//
const cx = classNames.bind(styles);

const AddOrder = () => {
  let navigate = useNavigate();
  //usestas
  const [dataFood, setdataFood] = useState([]);
  const [dataCategory, setdataCategory] = useState([]);
  // const [dataCart, setdataCart] = useState();
  //data fields
  const [fieldCategory, setfieldCategory] = useState('0');
  //
  //====================================
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

  //lấy dữ liêu món ăn
  useEffect(() => {
    //thay đổi bộ lọc
    if (fieldCategory === '0') {
      axios
        .get(apiUrl + '/v1/get-all-food', {
          headers: {
            token: cookieValue(),
          },
        })
        .then((res) => {
          setdataFood(res.data.data);
        })
        .catch((error) => {
          // console.log(error);
        });
    } else {
      axios
        .post(
          apiUrl + '/v1/get-all-food-by-category',
          {
            CategoryFood: fieldCategory,
          },
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then((res) => {
          setdataFood(res.data.data);
          // console.log(res.data);
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  }, [fieldCategory]);

  //==============================================
  const NextPageCart = () => {
    navigate('/cart-add/' + window.location.pathname.split('/')[2] + window.location.search);
  };
  //==============================================
  //rander ra ui\
  //danh sách món ăn
  const listFood = dataFood.map((data, i) => {
    return (
      <div key={data._id}>
        <CardFood NameFood={data.NameFood} Price={data.Price} status={true} data={data} />
      </div>
    );
  });

  //danh sách category
  const selectCategory = dataCategory.map((data) => {
    return (
      <option key={data._id} value={data.IDnumber}>
        {data.categoryName}
      </option>
    );
  });
  return (
    <div className={cx('wrapper')}>
      {/* {cartItems} */}
      {/* {cartTotals()} */}
      {/* ================================== */}
      <div className={cx('container-infor')}>
        <label>Bộ lọc</label>
        <select className={cx('select-filters-ch')} onChange={(e) => setfieldCategory(e.target.value)}>
          <option value="0">Tất Cả</option>
          {selectCategory}
        </select>
      </div>
      {/* ================================== */}
      {/* ====================== */}
      <div className={cx('cheack-order')}>
        <button className={cx('btn')} onClick={NextPageCart}>
          Kiểm tra Order
        </button>
      </div>
      <h3 className={cx('container-title')}>{fieldCategory === '0' ? 'Tất cả món' : <></>}</h3>
      <div className={cx('container1')}>{listFood.length > 0 ? listFood : 'Không có dữ liệu'}</div>
    </div>
  );
};

export default AddOrder;
