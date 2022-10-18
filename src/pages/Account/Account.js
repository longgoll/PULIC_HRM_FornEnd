import classNames from 'classnames/bind';
import styles from './Account.module.scss';
//
import axios from 'axios';
import { apiUrl, cookieValue } from '../../contexts/contexts';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const Account = () => {
  //
  const [data, setdata] = useState([]);
  //bật bản đăng ký
  const [OpenContainer1, setOpenContainer1] = useState(false);
  //lấy tất cả tài khoản
  useEffect(() => {
    axios
      .get(apiUrl + '/v1/all-user', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        setdata(req.data.data);
        console.log(req.data.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);
  //============================
  const create = () => {
    return (e) => {
      setOpenContainer1(!OpenContainer1);
    };
  };

  //============================
  //list table
  const listTable = data.map((data) => {
    return (
      <tr key={data._id}>
        <td>{data.Name}</td>
        <td>{data.email}</td>
        <td>{data.role}</td>
        <td>{data.islock === false ? 'Hoạt động' : 'Bị khóa'}</td>
        <td>
          <button>Xóa</button>
          <button>Khóa</button>
          <button>reset</button>
        </td>
      </tr>
    );
  });

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container1')}>
        <button onClick={create()}>Tạo tài khoản</button>
        <div>{OpenContainer1 === false ? <div></div> : <div></div>}</div>
      </div>
      {/* ============================= */}
      <div className={cx('container2')}>
        <table className={cx('table-personnel')}>
          <tbody>
            <tr>
              <th>Tên</th>
              <th>Email</th>
              <th>Role</th>
              <th>Trạng thái</th>
              <th>...</th>
            </tr>
            {listTable}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Account;
