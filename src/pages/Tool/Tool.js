import classNames from 'classnames/bind';
import styles from './Tools.module.scss';
import * as XLSX from 'xlsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl, cookieValue } from '../../contexts/contexts';

const cx = classNames.bind(styles);

const Tool = () => {
  const [Data, setData] = useState([]);
  const [DataNumber, setDataNumber] = useState();
  const [Data1, setData1] = useState([]);
  const [Data1Number, setData1Number] = useState();

  //xuat file
  useEffect(() => {
    axios
      .get(apiUrl + '/v1/get-staff-ex-number', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        // console.log(req.data.data);
        setDataNumber(req.data.data);
      })
      .catch((error) => {});
    //
    if (Data.length === DataNumber) {
      var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(Data);

      XLSX.utils.book_append_sheet(wb, ws, 'MySheet1');

      XLSX.writeFile(wb, '01.xlsx');
    } else {
      //   console.log(Data.length);
      //   ex();
    }
  }, [Data, DataNumber]);

  useEffect(() => {
    axios
      .get(apiUrl + '/v1/get-dependent-person-ex-number', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        // console.log(req.data.data);
        setData1Number(req.data.data);
      })
      .catch((error) => {});
    //
    if (Data1.length === Data1Number) {
      var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(Data1);

      XLSX.utils.book_append_sheet(wb, ws, 'MySheet1');

      XLSX.writeFile(wb, '02.xlsx');
    } else {
    }
  }, [Data1, Data1Number]);

  //===============================
  const ex = () => {
    axios
      .get(apiUrl + '/v1/get-staff-ex', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        // console.log(req.data.data);
        setData(req.data.data);
      })
      .catch((error) => {});
  };

  //===================================
  //xuat file
  const ex1 = () => {
    axios
      .get(apiUrl + '/v1/get-dependent-person-ex', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        // console.log(req.data.data);
        setData1(req.data.data);
      })
      .catch((error) => {});
  };

  return (
    <div className={cx('wrapper')}>
      <h3>Xuất file</h3>
      <div className={cx('container01')}>
        <button onClick={ex} className={cx('btn')}>
          Xuất Danh sách nhân viên
        </button>
        <button onClick={ex1} className={cx('btn')}>
          Xuất Danh sách người phụ thuộc
        </button>
      </div>
    </div>
  );
};

export default Tool;
