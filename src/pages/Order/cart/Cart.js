import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
//
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { apiUrl, cookieValue, numberFormat } from '../../../contexts/contexts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Cart = () => {
  const navigate = useNavigate();
  const [dataCart, setdataCart] = useState([]);
  //
  let dataOrder = [];
  // relaodtable
  const [reloadTable, setreloadTable] = useState(true);
  //
  let list;
  let cartPriceTotal;
  //=====================================
  useEffect(() => {
    setdataCart(JSON.parse(localStorage.getItem('cart')));
  }, [reloadTable]);

  //điếm số lượng sản phẩm trong giỏ
  let cartCountTotal;
  //=====================================
  //pup thong bao
  const pupwarn = (message) =>
    toast.warn(message, {
      position: 'bottom-left',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
  //xác nhận hóa đơn
  //tăng
  const increaseQuantity = (id) => {
    let item = dataCart.find((c) => c._id === id);
    item.count = item.count += 1;
    localStorage.setItem('cart', JSON.stringify(dataCart));
    setreloadTable(!reloadTable);
  };
  //giảm
  const decreaseQuantity = (id) => {
    let item = dataCart.find((c) => c._id === id);
    if (item.count > 1) {
      item.count = item.count -= 1;
      localStorage.setItem('cart', JSON.stringify(dataCart));
      setreloadTable(!reloadTable);
    }
  };
  //xóa
  const deleteSP = (id) => {
    let item = dataCart.filter((c) => c._id !== id);
    if (dataCart.length > 1) {
      localStorage.setItem('cart', JSON.stringify(item));
      pupsuccess('Xóa thành công');
    } else {
      localStorage.removeItem('cart');
      pupsuccess('Xóa thành công');
    }
    setreloadTable(!reloadTable);
  };

  //xóa tất cả
  const deleteAll = () => {
    if (dataCart.length > 0) {
      localStorage.removeItem('cart');
      setreloadTable(!reloadTable);
      pupsuccess('Xóa tất cả thành công');
    } else {
      pupwarn('Hiện tại không có SP');
    }
  };
  // tạo đơn order
  const createOrder = () => {
    dataOrder.length = 0;
    for (let i = 0; i <= dataCart.length; i++) {
      if (i < dataCart.length) {
        dataOrder.push({ IDFood: dataCart[i].IDnumber, quantity: dataCart[i].count });
      } else if (i === dataCart.length) {
        axios
          .post(
            apiUrl + '/v1/create-order',
            {
              IDAccountOrder: '',
              NameAccountOrder: '',
              OrderNumberIDFood: dataOrder,
              tableNumberID: window.location.search.split('=')[1],
              amount: cartPriceTotal,
              status: false,
            },
            {
              headers: {
                token: cookieValue(),
              },
            },
          )
          .then((res) => {
            deleteAll();
            // pupsuccess('Order thành công');
            navigate('/order');
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  //=====================================
  // rander ui
  if (dataCart !== null) {
    cartPriceTotal = dataCart.reduce((acc, item) => acc + item.Price * item.count, 0);
    cartCountTotal = dataCart.reduce((acc, item) => acc + item.count, 0);
    list = dataCart.map((data) => {
      return (
        // <div key={data._id}>
        //   {data.NameFood} x{data.count}
        // </div>
        <tr key={data._id}>
          <td>
            {/* {<img className={cx('container1-card-img')} src={img_card} alt="Italian Trulli"></img>}  */}
            {data.NameFood}
          </td>
          <td>{numberFormat.format(data.Price)}</td>
          <td>
            <button className={cx('count-btn-1')} onClick={() => decreaseQuantity(data._id)}>
              -
            </button>
            <input
              className={cx('count-input')}
              readOnly
              type="number"
              value={data.count}
              // onChange={(e) => setfieldCount(e.target.value)}
            />
            <button className={cx('count-btn-2')} onClick={() => increaseQuantity(data._id)}>
              +
            </button>
          </td>
          <td>{numberFormat.format(data.count * data.Price)}</td>
          <td>
            {
              <button className={cx('btn-delete')} onClick={() => deleteSP(data._id)}>
                Xóa
              </button>
            }
          </td>
        </tr>
      );
    });
  }
  //======================================
  return (
    <div>
      {dataCart !== null ? (
        <>
          <table className={cx('table')}>
            <tbody>
              <tr>
                <th>Sảng phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng</th>
                <th></th>
              </tr>

              {list}
              <tr>
                <td></td>
                <td></td>
                <td className={cx('td-total')}>Tổng SP: {cartCountTotal}</td>
                <td className={cx('td-total')}>Tổng tiền: {numberFormat.format(cartPriceTotal)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div className={cx('container-btn')}>
            <button className={cx('btn-delete')} onClick={deleteAll}>
              Xóa tất cả
            </button>
            <button className={cx('btn')}>In hóa đơn</button>
            <button className={cx('btn')}>Thanh toán</button>
            <button className={cx('btn')} onClick={createOrder}>
              Xác nhận order
            </button>
          </div>
        </>
      ) : (
        <h3 className={cx('empty')}>Không có sản phẩm</h3>
      )}

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

export default Cart;
