import classNames from 'classnames/bind';
import styles from './OrderMain.module.scss';
import { useState } from 'react';
import CustomerOrder from './CustomerOrder/CustomerOrder';
import MesOrder from './MesOrder/MesOrder';
import HistoryOrder from './HistoryOrder/HistoryOrder';
//

//
const cx = classNames.bind(styles);

const OrderMain = () => {
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

  return (
    <div className={cx('wrapper')}>
      {/* ==================== */}
      <div className={cx('container1')}>
        {/* ==================== */}
        {ChangePage === 1 ? (
          <div className={cx('convert-1', 'activated')} onClick={changePage(1)}>
            <h3 className={cx('text')}>QL khách order</h3>
          </div>
        ) : (
          <div className={cx('convert-1')} onClick={changePage(1)}>
            <h3 className={cx('text')}>khách order</h3>
          </div>
        )}

        {/* ==================== */}
        {ChangePage === 2 ? (
          <div className={cx('convert-2', 'activated')} onClick={changePage(2)}>
            <h3 className={cx('text')}>QL order</h3>
          </div>
        ) : (
          <div className={cx('convert-2')} onClick={changePage(2)}>
            <h3 className={cx('text')}>QL order</h3>
          </div>
        )}
        {/* ==================== */}
        {ChangePage === 3 ? (
          <div className={cx('convert-3', 'activated')} onClick={changePage(3)}>
            <h3 className={cx('text')}>QL lịch sử order</h3>
          </div>
        ) : (
          <div className={cx('convert-3')} onClick={changePage(3)}>
            <h3 className={cx('text')}>Lịch sử order</h3>
          </div>
        )}
      </div>
      {/* ==================== */}
      <div className={cx('container2')}>
        {ChangePage === 1 && <CustomerOrder />}
        {ChangePage === 2 && <MesOrder />}
        {ChangePage === 3 && <HistoryOrder />}
      </div>
    </div>
  );
};

export default OrderMain;
