import classNames from 'classnames/bind';
import styles from './MenuMain.module.scss';
import { useState } from 'react';
//
import Food from './Food/Food';
import Category from './Category/Category';
//
const cx = classNames.bind(styles);

const MenuMain = () => {
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
            <h3 className={cx('text')}>QL Món ăn</h3>
          </div>
        ) : (
          <div className={cx('convert-1')} onClick={changePage(1)}>
            <h3 className={cx('text')}>Món ăn</h3>
          </div>
        )}

        {/* ==================== */}
        {ChangePage === 2 ? (
          <div className={cx('convert-2', 'activated')} onClick={changePage(2)}>
            <h3 className={cx('text')}>QL danh mục</h3>
          </div>
        ) : (
          <div className={cx('convert-2')} onClick={changePage(2)}>
            <h3 className={cx('text')}>Danh mục</h3>
          </div>
        )}
        {/* ==================== */}
        {ChangePage === 3 ? (
          <div className={cx('convert-3', 'activated')} onClick={changePage(3)}>
            <h3 className={cx('text')}>QL món tùy chọn</h3>
          </div>
        ) : (
          <div className={cx('convert-3')} onClick={changePage(3)}>
            <h3 className={cx('text')}>món tùy chọn</h3>
          </div>
        )}
      </div>
      {/* ==================== */}
      <div className={cx('container2')}>
        {ChangePage === 1 && <Food />}
        {ChangePage === 2 && <Category />}
        {ChangePage === 3 && <Food />}
      </div>
    </div>
  );
};

export default MenuMain;
