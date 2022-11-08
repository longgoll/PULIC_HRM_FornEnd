import classNames from 'classnames/bind';
import styles from './Table.module.scss';
//
import CardTable from '../../../components/Layout/components/Table/CardTable';
//
import axios from 'axios';
import { apiUrl, cookieValue } from '../../../contexts/contexts';
import { useState, useEffect } from 'react';
//
const cx = classNames.bind(styles);

const Table = () => {
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
  //rander ui
  const listTable = DataTable.map((data) => {
    return (
      <div key={data._id}>
        <CardTable NameTable={data.nameTable} NameSector={data.Sector[0].SectorName} ID={data._id} />
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
    <div>
      {/* ================================== */}
      <div className={cx('container-infor')}>
        <label>Bộ lọc</label>
        <select className={cx('select-filters-ch')} onChange={(e) => setfieldSector(e.target.value)}>
          <option value="0">Tất Cả</option>
          {selectSector}
        </select>
      </div>
      {/* ================================== */}
      <h3 className={cx('container-title')}>{fieldSector === '0' ? 'Tất cả' : ''}</h3>
      {listTable.length > 0 ? listTable : <div className={cx('empty')}>Không có dữ liệu</div>}
    </div>
  );
};

export default Table;
