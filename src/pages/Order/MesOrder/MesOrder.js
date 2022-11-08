import classNames from 'classnames/bind';
import styles from './MesOrder.module.scss';
//
import CardOrder from '../../../components/Layout/components/Order/CardOrder/CardOrder';
//input localhost file
import axios from 'axios';
import { apiUrl, cookieValue } from '../../../contexts/contexts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//
const cx = classNames.bind(styles);

const MesOrder = () => {
  const navigator = useNavigate();
  //
  const [DataTable, setDataTable] = useState([]);
  const [dataSector, setdataSector] = useState([]);
  //data fields
  const [fieldSector, setfieldSector] = useState('0');
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
  const NextPageOrderFood = (id, IDnumber) => {
    return (e) => {
      navigator('/order-food/' + id + '?IDnumber=' + IDnumber);
    };
  };

  //chuyển trang đến chi tiết order
  const NextPageDetailOrder = (id) => {
    navigator('/detail-order/' + id);
  };
  //====================================
  //rander ui
  const listTable = DataTable.map((data) => {
    return (
      <div key={data._id}>
        {data.StatusTable === false ? (
          <div onClick={NextPageOrderFood(data._id, data.IDnumber)}>
            <CardOrder status={data.StatusTable} NameTable={data.nameTable} NameSector={data.Sector[0].SectorName} />
          </div>
        ) : (
          <div onClick={() => NextPageDetailOrder(data.IDnumber)}>
            <CardOrder status={data.StatusTable} NameTable={data.nameTable} NameSector={data.Sector[0].SectorName} />
          </div>
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
    </>
  );
};

export default MesOrder;
