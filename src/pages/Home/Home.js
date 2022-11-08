import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { TbArmchair } from 'react-icons/tb';
import { BiDish, BiFoodMenu } from 'react-icons/bi';
//
import CardView from '../../components/Layout/components/Home/CardView';
//
const cx = classNames.bind(styles);

const Home = () => {
  return (
    <div className={cx('wrapper')}>
      <div>Home</div>
      <div className={cx('container2')}>
        <CardView name="QL Bàn" icon={TbArmchair} url="table" />
        <CardView name="QL Order" icon={BiDish} url="order" />
        <CardView name="QL Thực đơn" icon={BiFoodMenu} url="menu" />
        <CardView name="Order cho khách" icon={BiFoodMenu} url="menu" />
        <CardView name="Hỗ trợ" icon={BiFoodMenu} url="menu" />
        <CardView name="QL chế biến" icon={BiFoodMenu} url="menu" />
        <CardView name="QL nhân viên" icon={BiFoodMenu} url="menu" />
        <CardView name="Thống kê" icon={BiFoodMenu} url="menu" />
      </div>
    </div>
  );
};

export default Home;
