import classNames from 'classnames/bind';
import styles from './Tools.module.scss';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { apiUrl, cookieValue } from '../../contexts/contexts';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

const Tool = () => {
  // //danh sach nhân viên
  // const [Data, setData] = useState([]);
  // //danh sách nhân viên tùy chỉnh 01
  // const [Data2, setData2] = useState([]);
  // //Người phụ thuộc
  // const [Data1, setData1] = useState([]);
  const [CompanyOption, setCompanyOption] = useState([]);
  //công ty
  const [Company, setCompany] = useState('');
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
  //===============================
  const ex = () => {
    return (e) => {
      axios
        .get(apiUrl + '/v1/get-staff-ex', {
          headers: {
            token: cookieValue(),
          },
        })
        .then(async (req) => {
          // console.log(req.data.data);
          // await setData(req.data.data);
          // console.log(req.data.data);

          //
          var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(req.data.data);

          XLSX.utils.book_append_sheet(wb, ws, 'MySheet1');

          XLSX.writeFile(wb, '01.xlsx');
        })
        .catch((error) => {});
    };
  };

  //===================================
  //lấy danh sách cty
  useEffect(() => {
    axios
      .get(apiUrl + '/v1/get-all-company', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        setCompanyOption(req.data.data);
        // console.log(req.data.data);
      })
      .then((error) => {});
  }, []);

  //===================================
  //xuat file
  const ex1 = () => {
    return (e) => {
      axios
        .get(apiUrl + '/v1/get-dependent-person-ex', {
          headers: {
            token: cookieValue(),
          },
        })
        .then(async (req) => {
          // console.log(req.data.data);
          // await setData1(req.data.data);

          //
          var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(req.data.data);

          XLSX.utils.book_append_sheet(wb, ws, 'MySheet1');

          XLSX.writeFile(wb, '03.xlsx');
        })
        .catch((error) => {});
    };
  };
  //===================================
  //xuat file
  const ex2 = () => {
    return (e) => {
      axios
        .get(apiUrl + '/v1/get-staff-ex-custom1', {
          headers: {
            token: cookieValue(),
          },
        })
        .then(async (req) => {
          // console.log(req.data.data);
          // await setData2(req.data.data);

          //
          var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(req.data.data);

          XLSX.utils.book_append_sheet(wb, ws, 'MySheet1');

          XLSX.writeFile(wb, '02.xlsx');
        })
        .catch((error) => {});
    };
  };
  //===================================
  //xuat file
  const ex3 = () => {
    return (e) => {
      axios
        .post(
          apiUrl + '/v1/get-staff-ex-by-company',
          { Company },
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then(async (req) => {
          // console.log(req.data.data);
          // await setData2(req.data.data);

          //
          var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(req.data.data);

          XLSX.utils.book_append_sheet(wb, ws, 'MySheet1');

          XLSX.writeFile(wb, '03.xlsx');
        })
        .catch((error) => {
          pupwarn(error.response.data.message);
        });
    };
  };

  //xuat file
  const ex4 = () => {
    return (e) => {
      axios
        .post(
          apiUrl + '/v1/get-staff-ex-custom1-by-company',
          { Company },
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then(async (req) => {
          // console.log(req.data.data);
          // await setData2(req.data.data);

          //
          var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(req.data.data);

          XLSX.utils.book_append_sheet(wb, ws, 'MySheet1');

          XLSX.writeFile(wb, '04.xlsx');
        })
        .catch((error) => {
          pupwarn(error.response.data.message);
        });
    };
  };
  //===================================

  //list company
  const selectCompany = CompanyOption.map((data) => {
    return (
      <option key={data._id} value={data.Company}>
        {data.Company}
      </option>
    );
  });

  return (
    <>
      <div className={cx('wrapper')}>
        <h3>Xuất file</h3>
        <div className={cx('container01')}>
          <button onClick={ex()} className={cx('btn')}>
            Xuất Danh sách nhân viên
          </button>
          <button onClick={ex2()} className={cx('btn')}>
            Xuất Danh sách nhân viên tùy chỉnh 01
          </button>
          <button onClick={ex1()} className={cx('btn')}>
            Xuất Danh sách người phụ thuộc
          </button>
        </div>
      </div>
      {/*==========*/}
      <div className={cx('wrapper1')}>
        <h3>Xuất file theo từng công ty</h3>
        <div className={cx('container01')}>
          <select className={cx('select-filters-chi')} onChange={(e) => setCompany(e.target.value)}>
            <option value="">Vui lòng chọn công ty</option>
            {selectCompany}
          </select>
          <button onClick={ex3()} className={cx('btn')}>
            Xuất Danh sách nhân viên theo công ty
          </button>
          <button onClick={ex4()} className={cx('btn')}>
            Xuất Danh sách nhân viên tùy chỉnh 01 theo công ty
          </button>
        </div>
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
    </>
  );
};

export default Tool;
