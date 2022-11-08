import classNames from 'classnames/bind';
import styles from './CreateTable.module.scss';
//input localhost file
import axios from 'axios';
import { apiUrl, cookieValue } from '../../../contexts/contexts';
import { useState, useEffect } from 'react';
//
import { ToastContainer, toast } from 'react-toastify';
//
const cx = classNames.bind(styles);

const CreateTable = () => {
  //data filetfields
  const [TableName, setTableName] = useState('');
  const [SectorID, setSectorID] = useState('');
  //data
  const [DataSector, setDataSector] = useState([]);
  //================================
  //lấy dữ liệu select kku vực
  useEffect(() => {
    axios
      .get(apiUrl + '/v1/get-all-sector', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((res) => {
        setDataSector(res.data.data);
      })
      .catch((error) => {});
  }, []);
  //============================
  //tạo bàn
  const createTable = () => {
    axios
      .post(
        apiUrl + '/v1/create-table',
        {
          nameTable: TableName,
          IDnumberSector: SectorID,
        },
        {
          headers: {
            token: cookieValue(),
          },
        },
      )
      .then((res) => {
        pupsuccess(res.data.message);
        setTableName('');
        setSectorID('');
      })
      .catch((error) => {
        pupwarn(error.response.data.message);
      });
  };
  //============================
  //pup thong bao
  const pupwarn = (message) =>
    toast.warn(message, {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const pupsuccess = (message) =>
    toast.success(message, {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  //================================
  //rander ui
  const SelectSector = DataSector.map((data) => {
    return (
      <option key={data._id} value={data.IDnumber}>
        {data.SectorName}
      </option>
    );
  });

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container1')}>
        <h3>Tạo bàn mới</h3>
        {/* ================================== */}
        <div className={cx('container-infor')}>
          <label>Nhập tên bàn</label>
          <input
            type="text"
            className={cx('container-infor-ch')}
            onChange={(e) => setTableName(e.target.value)}
            value={TableName}
          />
        </div>
        {/* ================================== */}
        <div className={cx('container-infor')}>
          <label>Khu vực bàn</label>
          <select className={cx('select-filters-ch')} onChange={(e) => setSectorID(e.target.value)} value={SectorID}>
            <option value="">Vui lòng chọn</option>
            {SelectSector}
          </select>
        </div>
        {/* ================================== */}
        <button className={cx('container-btn')} onClick={createTable}>
          Tạo mới
        </button>
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
    </div>
  );
};

export default CreateTable;
