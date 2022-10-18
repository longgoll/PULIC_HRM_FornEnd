import classNames from 'classnames/bind';
import styles from './Account.module.scss';
//
import axios from 'axios';
import { apiUrl, cookieValue } from '../../contexts/contexts';
import { useEffect, useState } from 'react';
//
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

const Account = () => {
  //
  const [data, setdata] = useState([]);
  //
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [Name, setName] = useState('');
  const [role, setrole] = useState('');
  //reload table
  const [ReloadTable, setReloadTable] = useState(true);
  //=======================================
  //thong bao
  const pupwarn = (message) =>
    toast.warn(message, {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const pupsuccess = (message) =>
    toast.success(message, {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  //=======================================
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
        // console.log(req.data.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [ReloadTable]);
  //============================
  const create = () => {
    return (e) => {
      axios
        .post(
          apiUrl + '/v1/register',
          {
            email,
            password,
            role,
            Name,
          },
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then((req) => {
          pupsuccess(req.data.message);
          setReloadTable(!ReloadTable);
          setemail('');
          setpassword('');
          setName('');
          setrole('');
        })
        .catch((error) => {
          pupwarn(error.response.data.message);
        });
    };
  };
  //============================
  //xoa
  const delAccount = (ID) => {
    return (e) => {
      axios
        .delete(apiUrl + '/v1/del-user/' + ID, {
          headers: {
            token: cookieValue(),
          },
        })
        .then((req) => {
          pupsuccess(req.data.message);
          setReloadTable(!ReloadTable);
        })
        .catch((error) => {
          //   console.log(error.response.data.message);
        });
    };
  };

  //khóa
  const lockAccount = (ID) => {
    return (e) => {
      axios
        .post(
          apiUrl + '/v1/lock-user/' + ID,
          {},
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then((req) => {
          pupsuccess(req.data.message);
          setReloadTable(!ReloadTable);
        })
        .catch((error) => {
          //   console.log(error.response.data.message);
        });
    };
  };

  //reset
  const resetAccount = (ID) => {
    return (e) => {
      axios
        .post(
          apiUrl + '/v1/reset-user/' + ID,
          {},
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then((req) => {
          pupsuccess(req.data.message + ' mật khẩu: 12345678');
          setReloadTable(!ReloadTable);
        })
        .catch((error) => {
          //   console.log(error.response.data.message);
        });
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
          <button className={cx('btn-delete')} onClick={delAccount(data._id)}>
            Xóa
          </button>
          <button className={cx('btn-lock')} onClick={lockAccount(data._id)}>
            Khóa
          </button>
          <button className={cx('btn-reset')} onClick={resetAccount(data._id)}>
            reset
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container1')}>
        <div className={cx('container1-1')}>
          <h3>Tạo tài khoản</h3>
          <div className={cx('container-infor')}>
            <label>Email</label>
            <input
              type="text"
              className={cx('container-infor-ch')}
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Mật khẩu</label>
            <input
              type="password"
              className={cx('container-infor-ch')}
              onChange={(e) => setpassword(e.target.value)}
              value={password}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Tên người dùng</label>
            <input
              type="text"
              className={cx('container-infor-ch')}
              onChange={(e) => setName(e.target.value)}
              value={Name}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Role</label>
            <select className={cx('select-filters-ch')} onChange={(e) => setrole(e.target.value)} value={role}>
              <option value="">Vui lòng chọn</option>
              <option value="Admin">Admin</option>
              <option value="QA">QA</option>
            </select>
          </div>
        </div>
        <div className={cx('container1-2')}>
          <button onClick={create()} className={cx('btn-confirm')}>
            Tạo tài khoản
          </button>
        </div>
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
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Account;
