import classNames from 'classnames/bind';
import styles from './Group.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
//
import { apiUrl, cookieValue } from '../../contexts/contexts';
//pup
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

const Group = () => {
  //du lieuj main 1
  const [CompanyOption, setCompanyOption] = useState([]);
  const [BranchOption, setBranchOption] = useState([]);
  const [DepartmentOption, setDepartmentOption] = useState([]);
  const [GroupOption, setGroupOption] = useState([]);
  //dữ liệu từ input
  const [getIDCompany, setgetIDCompany] = useState('');
  const [getIDBranch, setgetIDBranch] = useState('');
  const [getIDDepartment, setgetIDDepartment] = useState('');
  const [getIDGroup, setgetIDGroup] = useState('');
  //dữ liệu table
  const [dataTable, setdataTable] = useState([]);
  //trạng thái thay đổi table
  //==============================
  //pup thong bao
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
  //==============================
  //lấy danh sách cty
  useEffect(() => {
    //lấy danh sách cty
    axios
      .get(apiUrl + '/v1/get-all-company', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        setCompanyOption(res.data.data);
      })
      .catch((error) => {
        // console.log(error);
      });

    if (getIDCompany.length > 0) {
      //lấy danh sach phòng ban
      axios
        .post(
          apiUrl + '/v1/get-branch-byChi',
          {
            ChiCompany: getIDCompany,
          },
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then((req) => {
          setBranchOption(req.data.data);
          // console.log(req.data.data);
        })
        .catch((error) => {});
    }

    if (getIDBranch.length > 0) {
      //lấy danh sach phòng
      if (getIDBranch.length > 0) {
        axios
          .post(
            apiUrl + '/v1/get-department-bychi',
            {
              ChiCompany: getIDCompany,
              ChiCompanyBranch: getIDBranch,
            },
            {
              headers: {
                token: cookieValue(),
              },
            },
          )
          .then((req) => {
            setDepartmentOption(req.data.data);
            // console.log(req.data.data);
          })
          .catch((error) => {});
      }
    }

    //lấy danh sach nhóm
    if (getIDDepartment.length > 0) {
      axios
        .post(
          apiUrl + '/v1/get-group-bychir',
          {
            ChiCompany: getIDCompany,
            ChiCompanyBranch: getIDBranch,
            ChiDepartment: getIDDepartment,
          },
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then((req) => {
          setGroupOption(req.data.data);
          // console.log(req.data.data);
        })
        .catch((error) => {});
    }
  }, [getIDCompany, getIDBranch, getIDDepartment]);
  //======================

  //======================
  //main 2
  //danh sách select công ty
  const selectCompany = CompanyOption.map((data) => {
    return (
      <select key={data._id} className={cx('select-filters-chi')} onChange={(e) => setgetIDCompany(e.target.value)}>
        <option value="">Vui lòng chọn Cty</option>
        <option value={data.Company}>{data.Company}</option>
      </select>
    );
  });
  //danh sách select chi nhánh
  const selectBranch = BranchOption.map((data) => {
    return (
      <option key={data._id} value={data.companyBranch}>
        {data.companyBranch}
      </option>
    );
  });
  //danh sách select phòng ban
  const selectDepartment = DepartmentOption.map((data) => {
    return (
      <option key={data._id} value={data.department}>
        {data.department}
      </option>
    );
  });
  //danh sách select nhóm
  const selectGroup = GroupOption.map((data) => {
    return (
      <option key={data._id} value={data.group}>
        {data.group}
      </option>
    );
  });
  //=========================
  //chuyển trang thông tin nhân viên
  const nextpage = (ID) => {
    return (e) => {
      //   navigate('/personnel-details/' + ID);
      window.open('/personnel-details/' + ID);
    };
  };
  //=========================
  //tìm người trong một nhóm
  const findStaff = () => {
    return (e) => {
      axios
        .post(
          apiUrl + '/v1/get-group-staff',
          {
            Company: getIDCompany,
            companyBranch: getIDBranch,
            department: getIDDepartment,
            group: getIDGroup,
          },
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then((req) => {
          setdataTable(req.data.data);
          //   console.log(req.data.data);
          pupsuccess('Tìm thành công');
        })
        .catch((error) => {
          //   console.log(error);
          pupwarn(error.response.data.message);
        });
    };
  };
  //in ra
  const listtable = dataTable.map((data) => {
    return (
      <tr key={data._id} onClick={nextpage(data._id)}>
        <td>{data.numberID}</td>
        <td>{data.numberNV}</td>
        <td>{data.nameStaff}</td>
        <td>{data.companyBranch}</td>
        <td>{data.department}</td>
        <td>{data.group}</td>
        <td>{data.titleStaff}</td>
      </tr>
    );
  });

  //=========================
  return (
    <div>
      <div className={cx('wrapper')}>
        <h3>Thông tin nhóm</h3>
        <div className={cx('container-filters')}>
          <div className={cx('select-filters')}>
            <label>Cty thêm chi nhánh</label>
            {selectCompany}
          </div>
          <div className={cx('select-filters')}>
            <label>Chinh nhánh thêm nhóm</label>
            <select className={cx('select-filters-chi')} onChange={(e) => setgetIDBranch(e.target.value)}>
              <option value="">Vui lòng chọn chi nhánh</option>
              {selectBranch}
            </select>
          </div>
          <div className={cx('select-filters')}>
            <label>Phòng ban thêm nhóm</label>
            <select className={cx('select-filters-chi')} onChange={(e) => setgetIDDepartment(e.target.value)}>
              <option value="">Vui lòng chọn phòng ban</option>
              {selectDepartment}
            </select>
          </div>
          <div className={cx('select-filters')}>
            <label>Tên nhóm mới</label>
            <select className={cx('select-filters-chi')} onChange={(e) => setgetIDGroup(e.target.value)}>
              <option value="">Vui lòng chọn phòng ban</option>
              {selectGroup}
            </select>
          </div>
        </div>
        <div className={cx('container-btn')}>
          <button className={cx('btn')} onClick={findStaff()}>
            Tìm kiếm
          </button>
        </div>
      </div>
      <div>
        {listtable.length > 0 ? (
          <table className={cx('table-personnel')}>
            <tbody>
              <tr>
                <th>Số TT</th>
                <th>Mã NV</th>
                <th>Họ và Tên</th>
                <th>Chi nhánh</th>
                <th>Phòng ban</th>
                <th>Nhóm</th>
                <th>Chức danh</th>
              </tr>
              {listtable}
            </tbody>
          </table>
        ) : (
          <h2 className={cx('no-data')}>Không có dữ liệu</h2>
        )}
      </div>
      {/* thong bao */}
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

export default Group;
