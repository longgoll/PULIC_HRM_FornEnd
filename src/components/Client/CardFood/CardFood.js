import classNames from 'classnames/bind';
import styles from './CardFood.module.scss';
//img
import img_card from '../../../img/undraw_breakfast_psiw.png';
import { numberFormat } from '../../../contexts/contexts';
//
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
//
const cx = classNames.bind(styles);

const CardFood = (props) => {
  //data fields
  const [fieldCount, setfieldCount] = useState(1);
  let dataCart = [];
  //=======================================
  //pup thong bao
  // const pupwarn = (message) =>
  //   toast.warn(message, {
  //     position: 'bottom-left',
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  const pupsuccess = (message) =>
    toast.success(message, {
      position: 'bottom-left',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  //=====================================
  const add = (data) => {
    return (e) => {
      dataCart.length = 0;
      let storage = localStorage.getItem('cart');
      if (storage) {
        dataCart = JSON.parse(storage);
      }
      let item = dataCart.find((c) => c._id === data._id);
      if (item) {
        item.count = parseInt(item.count) + parseInt(fieldCount);
      } else {
        dataCart.push({ ...data, count: fieldCount });
      }
      localStorage.setItem('cart', JSON.stringify(dataCart));
      pupsuccess(`Thêm thành công ${data.NameFood} x ${fieldCount}`);
    };
  };

  //tăng
  const increaseQuantity = () => {
    setfieldCount(fieldCount + 1);
  };

  //giảm
  const decreaseQuantity = () => {
    if (fieldCount === 1) {
      // setfieldCount(1);
    } else {
      setfieldCount(fieldCount - 1);
    }
  };
  return (
    <>
      <div className={cx('container1-card')}>
        {props.FoodNew === true && props.FoodHot === false && (
          <h3 className={cx('h3-title', 'h3-title-new')}>Món mới</h3>
        )}
        {props.FoodHot === true && props.FoodNew === false && (
          <h3 className={cx('h3-title', 'h3-title-hot')}>Món Hot</h3>
        )}
        {props.FoodHot === true && props.FoodNew === true && (
          <h3 className={cx('h3-title', 'h3-title-all')}>Món Hot và Mới</h3>
        )}
        <img className={cx('container1-card-img')} src={img_card} alt="Italian Trulli"></img>
        <div className={cx('container1-card-conten')}>
          <h3 className={cx('NameFood')}>{props.NameFood}</h3>
          <h3 className={cx('price')}>{numberFormat.format(props.Price)}</h3>
          {/* <input type="number" onChange={(e) => setfieldCount(e.target.value)}></input> */}
          <div className={cx('container-count-btn')}>
            <button className={cx('count-btn-1')} onClick={decreaseQuantity}>
              -
            </button>
            <input
              className={cx('count-input')}
              readOnly
              type="number"
              value={fieldCount}
              onChange={(e) => setfieldCount(e.target.value)}
            />
            <button className={cx('count-btn-2')} onClick={increaseQuantity}>
              +
            </button>
          </div>
          <button className={cx('btn')} onClick={add(props.data)}>
            Thêm vào giỏ
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
    </>
  );
};

export default CardFood;
