import classNames from 'classnames/bind';
import styles from './CardTable.module.scss';
//
import { TbArmchair } from 'react-icons/tb';
import { AiOutlineQrcode } from 'react-icons/ai';
//
import { useNavigate } from 'react-router-dom';
//
const cx = classNames.bind(styles);
//

const CardTable = (props) => {
  let navigate = useNavigate();
  //====================================
  //xem chi tiết 1 bàn
  const Nextdetail = (id) => {
    return (e) => {
      navigate('/detail-table/' + id);
    };
  };

  //chuyen trang qr
  const NextPageQR = (id) => {
    navigate('/table-qr/' + id);
  };
  //====================================
  return (
    <>
      {/* ==================== */}
      <div className={cx('container2-1')}>
        {/* ==================== */}
        <div className={cx('container2-1-card')}>
          {/* ==================== */}
          <div className={cx('container2-1-card-1')} onClick={Nextdetail(props.ID)}>
            <TbArmchair className={cx('container2-1-icon')} />
            <p>
              {props.NameTable} - {props.NameSector}
            </p>
          </div>
          {/* ==================== */}
          <div className={cx('container2-1-card-2')} onClick={() => NextPageQR(props.ID)}>
            <AiOutlineQrcode className={cx('container2-1-icon-qr')} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardTable;
