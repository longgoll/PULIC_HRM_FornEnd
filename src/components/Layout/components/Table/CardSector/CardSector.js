import classNames from 'classnames/bind';
import styles from './CardSector.module.scss';
//
import { TbArmchair } from 'react-icons/tb';
//
const cx = classNames.bind(styles);

const CardSector = (props) => {
  return (
    <>
      {/* ==================== */}
      <div className={cx('container2-1')}>
        {/* ==================== */}
        <div className={cx('container2-1-card')}>
          {/* ==================== */}
          <div className={cx('container2-1-card-1')}>
            <TbArmchair className={cx('container2-1-icon')} />
            <p className={cx('container2-1-p')}>{props.NameTitle}</p>
          </div>
          {/* ==================== */}
          {/* <div className={cx('container2-1-card-2')}>
            <AiOutlineQrcode className={cx('container2-1-icon-qr')} />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default CardSector;
