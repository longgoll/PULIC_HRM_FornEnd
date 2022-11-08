import classNames from 'classnames/bind';
import styles from './CartAdd.module.scss';
//
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { apiUrl, cookieValue, numberFormat } from '../../../../contexts/contexts';
import axios from 'axios';

const cx = classNames.bind(styles);

const CartAdd = () => {
  const [dataCart, setdataCart] = useState([]);
  const [AllDataBill, setAllDataBill] = useState([]);
  const [dataFood, setdataFood] = useState([]);
  const [dataCount, setdataCount] = useState([]);
  //
  let dataOrderOld = [];
  let dataOrderGraft = [];
  let dataOrder = [];
  // relaodtable
  const [reloadTable, setreloadTable] = useState(true);
  //
  let list;
  let cartPriceTotal;
  //điếm số lượng sản phẩm trong giỏ
  let cartCountTotal;
  //=====================================
  useEffect(() => {
    setdataCart(JSON.parse(localStorage.getItem('cart')));
  }, [reloadTable]);

  //lấy thôn tin hóa đơn
  useEffect(() => {
    const url = window.location.href.split('/');
    axios
      .get(apiUrl + '/v1/get-detail-order-byid/' + url[4], {
        headers: {
          token: cookieValue(),
        },
      })
      .then((res) => {
        setAllDataBill(res.data.data[0]);
        setdataFood(res.data.data[0].Food);
        setdataCount(res.data.data[0].OrderNumberIDFood);
        //   console.log(res.data.data[0].Food);
        //   console.log(res.data.data[0].OrderNumberIDFood);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
    const pustdata = () => {
      for (let i = 0; i <= dataOrderGraft.length; i++) {
        if (i < dataOrderGraft.length) {
          dataOrder.push({ IDFood: dataOrderGraft[i].IDnumber, quantity: dataOrderGraft[i].count });
        } else if (i === dataOrderGraft.length) {
          const url = window.location.href.split('/');
          axios
            .put(
              apiUrl + '/v1/update-order/' + url[4],
              {
                IDAccountOrder: AllDataBill.IDAccountOrder,
                NameAccountOrder: AllDataBill.NameAccountOrder,
                codeBill: AllDataBill.codeBill,
                OrderNumberIDFood: dataOrder,
                tableNumberID: AllDataBill.tableNumberID,
                amount: AllDataBill.amount + cartPriceTotal,
                status: AllDataBill.status,
              },
              {
                headers: {
                  token: cookieValue(),
                },
              },
            )
            .then((res) => {
              deleteAll();
              console.log(res);
              // pupsuccess('Order thành công');
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    };

    for (let i = 0; i <= dataFood.length + 1; i++) {
      if (i < dataFood.length) {
        dataOrderOld.push({ ...dataFood[i], count: dataCount[i].quantity });
      } else if (i === dataFood.length) {
        let result = dataOrderOld.concat(dataCart).reduce((a, c) => {
          let obj = a.find((i) => i._id === c._id);
          if (obj) {
            obj.count += c.count;
          } else {
            a.push(c);
          }
          return a;
        }, []);
        dataOrderGraft = result;
      } else if (i === dataFood.length + 1) {
        pustdata();
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
            <button className={cx('btn')} onClick={createOrder}>
              Thêm món
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

export default CartAdd;
