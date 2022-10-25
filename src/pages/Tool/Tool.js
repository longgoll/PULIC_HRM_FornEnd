import classNames from 'classnames/bind';
import styles from './Tools.module.scss';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { apiUrl, cookieValue } from '../../contexts/contexts';

const cx = classNames.bind(styles);

const Tool = () => {
  // //danh sach nhân viên
  // const [Data, setData] = useState([]);
  // //danh sách nhân viên tùy chỉnh 01
  // const [Data2, setData2] = useState([]);
  // //Người phụ thuộc
  // const [Data1, setData1] = useState([]);

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

  return (
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
  );
};

export default Tool;
