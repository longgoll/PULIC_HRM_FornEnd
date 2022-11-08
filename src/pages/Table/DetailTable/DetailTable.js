import classNames from 'classnames/bind';
import styles from './DetailTable.module.scss';
//input localhost file
import axios from 'axios';
import { apiUrl, cookieValue } from '../../../contexts/contexts';
import { useState, useEffect } from 'react';
//
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
//
const cx = classNames.bind(styles);

const DetailTable = () => {
  const navigate = useNavigate();
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
  //lấy dữ liệu các filetfields
  useEffect(() => {
    const url = window.location.href.split('/');
    axios
      .get(apiUrl + '/v1/create-detail-table/' + url[4], {})
      .then((res) => {
        setTableName(res.data.data.nameTable);
        setSectorID(res.data.data.IDnumberSector);
      })
      .catch((error) => {});
  }, []);

  //============================
  //xóa table
  const deleteTable = () => {
    const url = window.location.href.split('/');
    axios
      .delete(apiUrl + '/v1/delete-table/' + url[4], {
        headers: {
          token: cookieValue(),
        },
      })
      .then((res) => {
        pupsuccess(res.data.message);
        navigate('/table');
      })
      .catch((error) => {
        pupwarn(error.response.data.message);
      });
  };
  //cập nhật
  const updateTable = () => {
    const url = window.location.href.split('/');
    axios
      .put(
        apiUrl + '/v1/update-table/' + url[4],
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
        <h3>Thông tin bàn</h3>
        {/* ================================== */}
        <div className={cx('container-infor')}>
          <label>Tên bàn</label>
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
        <div className={cx('container-btn')}>
          <button className={cx('btn-delete')} onClick={deleteTable}>
            Xóa
          </button>
          <button className={cx('btn')} onClick={updateTable}>
            Cập nhật
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
    </div>
  );
};

export default DetailTable;
