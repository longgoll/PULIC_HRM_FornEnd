import classNames from 'classnames/bind';
import styles from './TableMain.module.scss';
//
import { BsPlusLg } from 'react-icons/bs';
import Table from './Table/Table';
import Sector from './Sector/Sector';
import { useState } from 'react';
//
import { useNavigate } from 'react-router-dom';
//
const cx = classNames.bind(styles);
//

const TableMain = () => {
  let navigate = useNavigate();
  //
  const [ChangePage, setChangePage] = useState(1);

  //====================
  //chuyển trang
  //change page
  const changePage = (i) => {
    return (e) => {
      setChangePage(i);
    };
  };
  //====================
  //chuyển sang trang tạo table
  const nextPageCrTable = () => {
    navigate('/create-table');
  };

  //chuyển sang trang tạo table
  const nextPageCrSector = () => {
    navigate('/create-sector');
  };

  return (
    <div className={cx('wrapper')}>
      {/* ==================== */}
      <div className={cx('container1')}>
        {/* ==================== */}
        {ChangePage === 1 ? (
          <div className={cx('convert-l', 'activated')} onClick={changePage(1)}>
            <h3 className={cx('text')}>QL Bàn</h3>
          </div>
        ) : (
          <div className={cx('convert-l')} onClick={changePage(1)}>
            <h3 className={cx('text')}>Bàn</h3>
          </div>
        )}

        {/* ==================== */}
        {ChangePage === 2 ? (
          <div className={cx('convert-r', 'activated')} onClick={changePage(2)}>
            <h3 className={cx('text')}>QL Khu vực</h3>
          </div>
        ) : (
          <div className={cx('convert-r')} onClick={changePage(2)}>
            <h3 className={cx('text')}>Khu vực</h3>
          </div>
        )}
      </div>
      {/* ==================== */}
      <div className={cx('container2')}>
        {/* ==================== */}
        {ChangePage === 1 ? (
          <button className={cx('container2-btn')} onClick={nextPageCrTable}>
            <BsPlusLg className={cx('container2-btn-icon')} />
            Tạo bàn mới
          </button>
        ) : (
          <button className={cx('container2-btn')} onClick={nextPageCrSector}>
            <BsPlusLg className={cx('container2-btn-icon')} />
            Tạo khu vực mới
          </button>
        )}

        {ChangePage === 1 ? <Table /> : <Sector />}
      </div>
    </div>
  );
};

export default TableMain;
