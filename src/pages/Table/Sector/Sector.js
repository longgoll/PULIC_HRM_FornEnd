import classNames from 'classnames/bind';
import CardSector from '../../../components/Layout/components/Table/CardSector/CardSector';
import styles from './Sector.module.scss';
//
import axios from 'axios';
import { apiUrl, cookieValue } from '../../../contexts/contexts';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//
const cx = classNames.bind(styles);

const Sector = () => {
  const navigate = useNavigate();
  //data
  const [dataSector, setdataSector] = useState([]);
  //=================================
  useEffect(() => {
    axios
      .get(apiUrl + '/v1/get-all-sector', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((res) => {
        setdataSector(res.data.data);
        // console.log(res);
      })
      .then((error) => {});
  }, []);
  //=================================
  //chuyển tran
  const NextPage = (id) => {
    return (e) => {
      navigate('/detail-sector/' + id);
    };
  };
  //=================================
  //rander
  const listSector = dataSector.map((data) => {
    return (
      <div key={data._id} onClick={NextPage(data._id)}>
        <CardSector NameTitle={data.SectorName} />
      </div>
    );
  });

  return (
    <>
      <h3 className={cx('container-title')}>Tất cả</h3>
      {listSector}
    </>
  );
};

export default Sector;
