import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SignedContract.module.scss';
import axios from 'axios';
import { apiUrl, cookieValue } from '../../../contexts/contexts';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const SignedContract = () => {
  const navigate = useNavigate();
  //============================
  const [data, setdata] = useState([]);
  //============================
  useEffect(() => {
    axios
      .get(apiUrl + '/v1/get-signed-contract-all', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        // console.log(req.data.data);
        setdata(req.data.data);
      });
  }, []);
  //============================
  const nextpage = (id) => {
    return (e) => {
      navigate('/personnel-details/' + id);
    };
  };
  //============================
  const list = data.map((data) => {
    return (
      <tr key={data._id} onClick={nextpage(data._id)}>
        <td>{data.numberID}</td>
        <td>{data.numberNV}</td>
        <td>{data.nameStaff}</td>
        <td>{data.group}</td>
        <td>{data.department}</td>
        <td>{data.companyBranch}</td>
        <td>{moment(data.DateStartWork).format('DD/MM/YYYY')}</td>
      </tr>
    );
  });
  //============================
  return (
    <div>
      <table className={cx('table-personnel')}>
        <tbody>
          <tr>
            <th>Số TT</th>
            <th>Mã NV</th>
            <th>Họ và Tên</th>
            <th>Nhóm</th>
            <th>Phòng ban</th>
            <th>Chi nhánh</th>
            <th>Ngày ký</th>
          </tr>
          {list}
        </tbody>
      </table>
    </div>
  );
};

export default SignedContract;
