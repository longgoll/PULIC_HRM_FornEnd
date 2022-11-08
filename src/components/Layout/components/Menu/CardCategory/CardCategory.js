import classNames from 'classnames/bind';
import styles from './CardCategory.module.scss';
//
import { AiOutlineEdit } from 'react-icons/ai';
//
const cx = classNames.bind(styles);

const CardCategory = (props) => {
  return (
    <>
      {/* ==================== */}
      <div className={cx('container-card')}>
        {/* ==================== */}
        <div className={cx('container-card-1')}>
          <p className={cx('title')}>{props.NameCategory}</p>
        </div>
        {/* ==================== */}
        <div className={cx('container-card-2')}>
          <AiOutlineEdit className={cx('container-icon')} />
        </div>
      </div>
    </>
  );
};

export default CardCategory;
