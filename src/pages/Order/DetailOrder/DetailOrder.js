import classNames from 'classnames/bind';
import styles from './DetailOrder.module.scss';
//
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { apiUrl, cookieValue, numberFormat } from '../../../contexts/contexts';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
//
const cx = classNames.bind(styles);

const DetailOrder = () => {
  const navigate = useNavigate();
  const [AllDataBill, setAllDataBill] = useState([]);
  const [dataFood, setdataFood] = useState([]);
  const [dataCount, setdataCount] = useState([]);
  //chuyên hướng
  // relaodtable
  let dataCart = [];
  //
  let list;
  let cartPriceTotal;
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
  // const pupsuccess = (message) =>
  //   toast.success(message, {
  //     position: 'bottom-left',
  //     autoClose: 2000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  //=====================================
  useEffect(() => {
    const url = window.location.href.split('/');
    axios
      .post(
        apiUrl + '/v1/get-detail-order-by-idNtable',
        { tableNumberID: url[4] },
        {
          headers: {
            token: cookieValue(),
          },
        },
      )
      .then((res) => {
        setAllDataBill(res.data.data[0]);
        setdataFood(res.data.data[0].Food);
        setdataCount(res.data.data[0].OrderNumberIDFood);
      })
      .catch((error) => {});
  }, []);

  //điếm số lượng sản phẩm trong giỏ
  let cartCountTotal;
  //=====================================
  //thêm món
  const AddFood = () => {
    navigate('/add-food/' + AllDataBill._id);
  };
  //sửa order
  const editOrder = () => {
    if (AllDataBill.status) {
      pupwarn('Đơn đã làm không thể thay đổi');
    } else {
      navigate('/edit-food/' + AllDataBill._id);
    }
  };
  //chuyển bàn
  const changeTable = () => {
    navigate('/change-table/' + AllDataBill.Table[0].IDnumber);
  };
  //hủy order
  const deleteOrder = () => {
    axios
      .post(
        apiUrl + '/v1/delete-order/' + AllDataBill._id,
        { idTable: AllDataBill.Table[0]._id },
        {
          headers: {
            token: cookieValue(),
          },
        },
      )
      .then((res) => {
        navigate('/order');
      })
      .catch((error) => {});
  };
  //=====================================
  // rander ui
  if (dataCart !== null) {
    for (let i = 0; i < dataFood.length; i++) {
      dataCart.push({ ...dataFood[i], count: dataCount[i].quantity });
    }

    cartPriceTotal = dataCart.reduce((acc, item) => acc + item.Price * item.count, 0);
    cartCountTotal = dataCart.reduce((acc, item) => acc + item.count, 0);
    list = dataCart.map((data) => {
      const count = dataCount.find((c) => c.IDFood === data.IDnumber).quantity;
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
          <td>{count}</td>
          <td>{numberFormat.format(count * data.Price)}</td>
          <td>
            {
              // <button className={cx('btn-delete')} onClick={() => deleteSP(data._id)}>
              //   Xóa
              // </button>
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
          <div className={cx('container-infor')}>
            <p>Thời gian: {moment(AllDataBill.createdAt).format('HH:MM DD/MM/YYYY')}</p>
            <p>Mã hóa đơn: {AllDataBill.codeBill}</p>
          </div>
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
            <button className={cx('btn')} onClick={AddFood}>
              Thêm món
            </button>
            <button className={cx('btn')} onClick={editOrder}>
              Sửa order
            </button>
            <button className={cx('btn')} onClick={changeTable}>
              Chuyển bàn
            </button>
            <button className={cx('btn-delete')} onClick={deleteOrder}>
              Hủy order
            </button>
            <button className={cx('btn')}>In hóa đơn</button>
            <button className={cx('btn')}>Thanh toán</button>
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

export default DetailOrder;
