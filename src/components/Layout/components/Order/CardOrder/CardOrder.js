import classNames from 'classnames/bind';
import styles from './CardOrder.module.scss';
// import { useState } from 'react';
//
import { BsSquare, BsPersonSquare } from 'react-icons/bs';
//
const cx = classNames.bind(styles);

const CardOrder = (props) => {
  return (
    <>
      {props.status === true ? (
        <div className={cx('container-table')}>
          <BsPersonSquare className={cx('container-table-icon')} />
          <h3 className={cx('container-table-text')}>{props.NameTable}</h3>
          <h3 className={cx('container-table-text')}>{props.NameSector}</h3>
        </div>
      ) : (
        <div className={cx('container-table')}>
          <BsSquare className={cx('container-table-icon')} />
          <h3 className={cx('container-table-text')}>{props.NameTable}</h3>
          <h3 className={cx('container-table-text')}>{props.NameSector}</h3>
        </div>
      )}
    </>
  );
};

export default CardOrder;
