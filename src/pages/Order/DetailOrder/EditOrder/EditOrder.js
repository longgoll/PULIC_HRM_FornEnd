import classNames from 'classnames/bind';
import styles from './EditOrder.module.scss';
//
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { apiUrl, cookieValue, numberFormat } from '../../../../contexts/contexts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(styles);

const EditOrder = () => {
  const navigate = useNavigate();
  const [dataCart, setdataCart] = useState([]);
  const [AllDataBill, setAllDataBill] = useState([]);
  let dataOrder = [];
  //
  // let dataOrder = [];
  // relaodtable
  const [reloadTable, setreloadTable] = useState(true);
  const [reloadData, setreloadData] = useState(true);
  //
  let list;
  let cartPriceTotal;
  //=====================================
  useEffect(() => {
    const url = window.location.href.split('/');
    const test = (a, b) => {
      setdataCart([]);
      for (let i = 0; i < a.length; i++) {
        setdataCart((oldArray) => [...oldArray, { ...a[i], count: b[i].quantity }]);
      }
    };
    axios
      .get(apiUrl + '/v1/get-detail-order-byid/' + url[4], {
        headers: {
          token: cookieValue(),
        },
      })
      .then((res) => {
        setAllDataBill(res.data.data[0]);
        test(res.data.data[0].Food, res.data.data[0].OrderNumberIDFood);
      })
      .catch((error) => {});

    return () => {
      // test();
    };
  }, [reloadData]);

  useEffect(() => {
    setdataCart(JSON.parse(localStorage.getItem('cart')));
  }, [reloadTable]);

  //điếm số lượng sản phẩm trong giỏ
  let cartCountTotal;
  //=====================================
  //pup thong bao
  // const pupwarn = (message) =>
  //   toast.warn(message, {
  //     position: 'bottom-left',
  //     autoClose: 2000,
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

  //back
  const back = () => {
    navigate('/detail-order/' + AllDataBill.Table[0].IDnumber);
  };

  // chỉnh đơn order
  const editOrder = () => {
    const data = JSON.parse(localStorage.getItem('cart'));
    if (data !== null) {
      const dataOrderGraft = JSON.parse(localStorage.getItem('cart'));
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
              localStorage.removeItem('cart');
              navigate('/detail-order/' + AllDataBill.Table[0].IDnumber);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    } else {
      navigate('/detail-order/' + AllDataBill.Table[0].IDnumber);
    }
  };
  //Xac nhan huy don
  const deleteOrder = () => {
    const url = window.location.href.split('/');
    axios
      .post(
        apiUrl + '/v1/delete-order/' + url[4],
        { idTable: AllDataBill.Table[0]._id },
        {
          headers: {
            token: cookieValue(),
          },
        },
      )
      .then((res) => {
        localStorage.removeItem('cart');
        navigate('/order');
      })
      .catch((error) => {});
  };

  //khong huy don
  const notDeleteOrder = () => {
    setreloadData(!reloadData);
  };
  //=====================================
  if (dataCart !== null) {
    //rander
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
            <button className={cx('btn')} onClick={back}>
              Không chỉnh sử đơn
            </button>
            <button className={cx('btn')} onClick={editOrder}>
              Xác nhận order
            </button>
          </div>
        </>
      ) : (
        <div className={cx('container-delete')}>
          <h3 className={cx('empty')}>Xác nhận hủy đơn?</h3>
          <div className={cx('container-delete-btn')}>
            <button className={cx('btn-delete')} onClick={notDeleteOrder}>
              Không
            </button>
            <button className={cx('btn')} onClick={deleteOrder}>
              Xác nhận
            </button>
          </div>
        </div>
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

export default EditOrder;
