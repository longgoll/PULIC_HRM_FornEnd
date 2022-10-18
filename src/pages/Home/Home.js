import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { AiOutlineUser, AiOutlineGift, AiOutlineUserDelete, AiOutlineFile } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl, cookieValue } from '../../contexts/contexts';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Home() {
  const navigate = useNavigate();
  const [StaffDoing, setStaffDoing] = useState('');
  const [StaffQuit, setStaffQuit] = useState('');
  const [OffocoaContract, setOffocoaContract] = useState('');
  const [ProbationaryContract, setProbationaryContract] = useState('');
  const [birthday, setbirthday] = useState('');
  const [SignedContract, setSignedContract] = useState('');
  //===========================================
  useEffect(() => {
    //nhân viên đang làm
    axios
      .get(apiUrl + '/v1/get-number-doing', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        setStaffDoing(req.data.data);
      });
    //nhân viên đã nghỉ
    axios
      .get(apiUrl + '/v1/get-number-quitt', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        setStaffQuit(req.data.data);
      });
    //nhân viên HĐ chính thức
    axios
      .get(apiUrl + '/v1/get-number-official-contract', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        setOffocoaContract(req.data.data);
      });
    //nhân viên thử việc
    axios
      .get(apiUrl + '/v1/get-number-probationary-contract', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        setProbationaryContract(req.data.data);
      });
    //sinh nhật
    axios
      .get(apiUrl + '/v1/get-birthday', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        setbirthday(req.data.data);
      });
    //hơp đồng cần ký tháng này
    axios
      .get(apiUrl + '/v1/get-signed-contract', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        setSignedContract(req.data.data);
      });
  }, []);

  //===========================================
  const pagebirthday = () => {
    return (e) => {
      navigate('/birthday-statistical');
    };
  };

  const pagesignedContract = () => {
    return (e) => {
      navigate('/signed-contract-statistical');
    };
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container1')}>
        <div className={cx('container1-1')}>
          <h3 className={cx('title')}>Đang làm</h3>
          <div className={cx('container-conten')}>
            <div className={cx('b-avatar-custom', 'color-avatar-custom1')}>
              <AiOutlineUser className={cx('icon', 'icon-01')} />
            </div>
            <h3 className={cx('title-number')}>{StaffDoing} Nhân viên</h3>
          </div>
        </div>
        <div className={cx('container1-2')}>
          <h3>HĐ Chính thức</h3>
          <div className={cx('container-conten')}>
            <div className={cx('b-avatar-custom', 'color-avatar-custom2')}>
              <AiOutlineUser className={cx('icon', 'icon-02')} />
            </div>
            <h3 className={cx('title-number')}>{OffocoaContract} Nhân viên</h3>
          </div>
        </div>
        <div className={cx('container1-3')}>
          <h3>HĐ Thử việc</h3>
          <div className={cx('container-conten')}>
            <div className={cx('b-avatar-custom', 'color-avatar-custom3')}>
              <AiOutlineUser className={cx('icon', 'icon-03')} />
            </div>
            <h3 className={cx('title-number')}>{ProbationaryContract} Nhân viên</h3>
          </div>
        </div>
        <div className={cx('container1-4')}>
          <h3>Đã nghỉ</h3>
          <div className={cx('container-conten')}>
            <div className={cx('b-avatar-custom', 'color-avatar-custom4')}>
              <AiOutlineUserDelete className={cx('icon', 'icon-04')} />
            </div>
            <h3 className={cx('title-number')}>{StaffQuit} Nhân viên</h3>
          </div>
        </div>
        <div className={cx('container1-5')} onClick={pagebirthday()}>
          <h3>Sinh nhật tháng nay</h3>
          <div className={cx('container-conten')}>
            <div className={cx('b-avatar-custom', 'color-avatar-custom2')}>
              <AiOutlineGift className={cx('icon', 'icon-02')} />
            </div>
            <h3 className={cx('title-number')}>{birthday} Nhân viên</h3>
          </div>
        </div>
        <div className={cx('container1-6')} onClick={pagesignedContract()}>
          <h3>HĐ cần ký tháng này</h3>
          <div className={cx('container-conten')}>
            <div className={cx('b-avatar-custom', 'color-avatar-custom3')}>
              <AiOutlineFile className={cx('icon', 'icon-03')} />
            </div>
            <h3 className={cx('title-number')}>{SignedContract} Nhân viên</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
