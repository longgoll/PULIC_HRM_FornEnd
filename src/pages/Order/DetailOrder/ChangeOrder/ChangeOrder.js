import classNames from 'classnames/bind';
import styles from './ChangeOrder.module.scss';
//
import CardOrder from '../../../../components/Layout/components/Order/CardOrder/CardOrder';
//input localhost file
import axios from 'axios';
import { apiUrl, cookieValue } from '../../../../contexts/contexts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//
const cx = classNames.bind(styles);

const ChangeOrder = () => {
  const navigate = useNavigate();
  //
  const [DataTable, setDataTable] = useState([]);
  const [dataSector, setdataSector] = useState([]);
  const [IDnumberTable, setIDnumberTable] = useState('');
  const [DataFood1, setDataFood1] = useState([]);
  const [DataFood2, setDataFood2] = useState([]);
  const [IdOrderOld, setIdOrderOld] = useState('');
  const [IdOrderNew, setIdOrderNew] = useState('');
  //data fields
  const [fieldSector, setfieldSector] = useState('0');
  //change page
  const [ChangePage, setChangePage] = useState(0);
  //=================================
  //lấy dữ liệu
  useEffect(() => {
    //lấy dữ liệu khu vực
    axios
      .get(apiUrl + '/v1/get-all-sector', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((res) => {
        setdataSector(res.data.data);
        // console.log(res);
      })
      .then((error) => {});
  }, []);

  useEffect(() => {
    //lấy dữ liệu tất cả bàn
    if (fieldSector === '0') {
      axios
        .get(apiUrl + '/v1/get-all-table-full-data', {
          headers: {
            token: cookieValue(),
          },
        })
        .then((res) => {
          setDataTable(res.data.data);
        })
        .then((error) => {});
    } else {
      axios
        .post(
          apiUrl + '/v1/get-all-table-by-secter-full-data',
          { IDnumberSector: fieldSector },
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then((res) => {
          setDataTable(res.data.data);
          // console.log(res);
        })
        .then((error) => {});
    }
  }, [fieldSector]);
  //====================================
  //chuyeenr trang
  const NextPageOrderFood = (IDnumber, StatusTable) => {
    const url = window.location.href.split('/');
    if (StatusTable) {
      //co nguoi
      setIDnumberTable(IDnumber);
      setChangePage(1);
      //lấy hóa đơn bàn cũ
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
          setIdOrderOld(res.data.data[0]._id);
          setDataFood1(res.data.data[0].OrderNumberIDFood);
        })
        .catch((error) => {});
      //lấy hóa đơn bàn mới
      axios
        .post(
          apiUrl + '/v1/get-detail-order-by-idNtable',
          { tableNumberID: IDnumber },
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then((res) => {
          setIdOrderNew(res.data.data[0]._id);
          setDataFood2(res.data.data[0].OrderNumberIDFood);
        })
        .catch((error) => {});
    } else {
      //khong nguoi
      axios
        .put(
          apiUrl + '/v1/change-table',
          { tableNumberID: url[4], ChangetableNumberID: IDnumber },
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
    }
  };

  //hủy gọp đơn
  const cancel = () => {
    setChangePage(0);
  };

  //xác nhận gọp đơn
  const yes = () => {
    // cập nhật gộp hóa đơn
    const updata = (result) => {
      //   console.log(result);
      const url = window.location.href.split('/');
      axios
        .put(
          apiUrl + '/v1/change-table-merge',
          {
            tableNumberID: url[4],
            ChangetableNumberID: IDnumberTable,
            OrderNumberIDFood: result,
            IDOrderNew: IdOrderNew,
            IDOrderOld: IdOrderOld,
          },
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
    //gộp hóa đơn
    let result = DataFood1.concat(DataFood2).reduce((a, c) => {
      let obj = a.find((i) => i.IDFood === c.IDFood);
      if (obj) {
        obj.quantity += c.quantity;
      } else {
        a.push(c);
      }
      return a;
    }, []);
    updata(result);
    // console.log(result);
  };

  //====================================
  //rander ui
  const listTable = DataTable.map((data) => {
    return (
      <div key={data._id}>
        {data.IDnumber !== window.location.href.split('/')[4] ? (
          <div>
            {data.StatusTable === false ? (
              <div onClick={() => NextPageOrderFood(data.IDnumber, data.StatusTable)}>
                <CardOrder
                  status={data.StatusTable}
                  NameTable={data.nameTable}
                  NameSector={data.Sector[0].SectorName}
                />
              </div>
            ) : (
              <div onClick={() => NextPageOrderFood(data.IDnumber, data.StatusTable)}>
                <CardOrder
                  status={data.StatusTable}
                  NameTable={data.nameTable}
                  NameSector={data.Sector[0].SectorName}
                />
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  });

  //danh sách khu vực
  const selectSector = dataSector.map((data) => {
    return (
      <option key={data._id} value={data.IDnumber}>
        {data.SectorName}
      </option>
    );
  });
  return (
    <>
      {ChangePage === 0 ? (
        <div className={cx('container-main')}>
          <h3>Chọn bàn cần chuyển</h3>
          <div className={cx('container-infor')}>
            <label>Bộ lọc</label>
            <select className={cx('select-filters-ch')} onChange={(e) => setfieldSector(e.target.value)}>
              <option value="0">Tất Cả</option>
              {selectSector}
            </select>
          </div>
          {/* ================================== */}
          <h3 className={cx('container-title')}>Tất cả</h3>
          <div className={cx('wrapper')}>
            {listTable.length > 0 ? listTable : <div className={cx('empty')}>Không có dữ liệu</div>}
          </div>
        </div>
      ) : (
        <div className={cx('container-main2')}>
          <h3 className={cx('container-title')}>Xác nhận gộp đơn</h3>
          <div className={cx('container-btn')}>
            <button className={cx('btn-delete')} onClick={cancel}>
              Hủy
            </button>
            <button className={cx('btn')} onClick={yes}>
              Xác nhận
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangeOrder;
