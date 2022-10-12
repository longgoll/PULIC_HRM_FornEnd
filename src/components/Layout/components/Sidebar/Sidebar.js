import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
// import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome, AiOutlineSolution, AiOutlineTeam } from 'react-icons/ai';
import { BiBriefcase } from 'react-icons/bi';

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('container-logio')}>
          <img
            className={cx('logo')}
            src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/logo.36f34a9f.svg"
            alt="logo"
          />
          <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }} className={cx('title-logo')}>
            HRM
          </NavLink>
        </div>
        <div className={cx('main-sidebar')}>
          <ul className={cx('sidebarList')}>
            <li className={cx('navigation-header')}>
              <span>Dashboard</span>
            </li>
            <NavLink to="/" className={cx('item')}>
              <AiOutlineHome />
              Home
            </NavLink>
            <li className={cx('navigation-header')}>
              <span>Nhân sự</span>
            </li>
            <NavLink to="/personnel" className={cx('item')}>
              <AiOutlineSolution />
              Nhân sự
            </NavLink>
            <NavLink to="/dependent-person" className={cx('item')}>
              <AiOutlineTeam />
              Người phụ thuộc
            </NavLink>
            <li className={cx('navigation-header')}>
              <span>Công ty</span>
            </li>
            <NavLink to="/company" className={cx('item')}>
              <BiBriefcase />
              Công ty
            </NavLink>
            <li className={cx('navigation-header')}>
              <span>Công ty</span>
            </li>
            <NavLink to="/" className={cx('item')}>
              <BiBriefcase />
              Công cụ
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
