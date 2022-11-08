import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { apiUrl, cookieValue } from '../../contexts/contexts';
import styles from './AddDependentPerson.module.scss';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

const AddDependentPerson = () => {
  //ID nhân viên
  const [IDStaff, setIDStaff] = useState('');
  //mã số nhân viên
  const [numberNV, setnumberNV] = useState('');
  //Họ và tên NV
  const [nameStaff, setnameStaff] = useState('');
  //Họ và tên Người phụ thuộc
  const [nameDependentPerson, setnameDependentPerson] = useState('');
  //ngày sinh NPT
  const [DateOfBirthDependentPerson, setDateOfBirthDependentPerson] = useState('');
  //Mã số thuế người phụ thuộc
  const [TaxCodeDependentPerson, setTaxCodeDependentPerson] = useState('');
  //loại giấy tờ (cmnd, cccd) NPT
  const [typeCardIDDependentPerson, settypeCardIDDependentPerson] = useState('');
  //CCCD NPT
  const [IDcard1DependentPerson, setIDcard1DependentPerson] = useState('');
  //Ngày cấp CCCD NPT
  const [DateRangeIDcard1DependentPerson, setDateRangeIDcard1DependentPerson] = useState('');
  //Nơi cấp CCCD NPT
  const [IssuedbyIDcard1DependentPerson, setIssuedbyIDcard1DependentPerson] = useState('');
  //số giấy tờ
  const [numberOfPapers, setnumberOfPapers] = useState('');
  //Quan hệ với người nộp
  const [RelationshipWithTaxpayers, setRelationshipWithTaxpayers] = useState('');
  //từ tháng
  const [FromMonth, setFromMonth] = useState('');
  //tới tháng
  const [ToTheMonth, setToTheMonth] = useState('');
  //================================
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
  //================================
  useEffect(() => {
    //lấy id nhân viên trên url
    const url = window.location.pathname.split('/');
    //laasy thoong tin nhan vien
    axios
      .get(apiUrl + '/v1/get-staff-npt/' + url[2], {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        // console.log(req.data.data);
        setIDStaff(req.data.data._id);
        setnumberNV(req.data.data.numberNV);
        setnameStaff(req.data.data.nameStaff);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  //================================
  //tạo người phụ thuộc
  const create = () => {
    return (e) => {
      //tạo mới người phụ thuộc
      axios
        .post(
          apiUrl + '/v1/create-dependent-person',
          {
            IDStaff,
            numberNV,
            nameStaff,
            nameDependentPerson,
            DateOfBirthDependentPerson,
            TaxCodeDependentPerson,
            typeCardIDDependentPerson,
            IDcard1DependentPerson,
            DateRangeIDcard1DependentPerson,
            IssuedbyIDcard1DependentPerson,
            numberOfPapers,
            RelationshipWithTaxpayers,
            FromMonth,
            ToTheMonth,
          },
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then((req) => {
          // console.log(req.data.message);
          pupsuccess(req.data.message);
          setnameDependentPerson('');
          setDateOfBirthDependentPerson('');
          setTaxCodeDependentPerson('');
          settypeCardIDDependentPerson('');
          setIDcard1DependentPerson('');
          setDateRangeIDcard1DependentPerson('');
          setIssuedbyIDcard1DependentPerson('');
          setnumberOfPapers('');
          setRelationshipWithTaxpayers('');
          setFromMonth('');
          setToTheMonth('');
          cong_NPT();
        })
        .catch((error) => {
          // console.log(error);
          pupwarn(error.response.data.message);
        });
    };
  };

  const cong_NPT = () => {
    //cộng người phụ thuộc
    //lấy id nhân viên trên url
    const url = window.location.pathname.split('/');
    axios
      .post(
        apiUrl + '/v1/sum-dependent/' + url[2],
        {},
        {
          headers: {
            token: cookieValue(),
          },
        },
      )
      .then((req) => {
        // console.log(req);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  //================================
  return (
    <div>
      <div className={cx('container-main')}>
        <div className={cx('title-infor')}>
          <h4>Thông tin cá nhân người phụ thuộc</h4>
        </div>
        <div className={cx('container-infor-main')}>
          <div className={cx('container-infor')}>
            <label>Mã số nhân viên</label>
            <input
              disabled
              type="text"
              className={cx('container-infor-ch')}
              onChange={(e) => setnumberNV(e.target.value)}
              value={numberNV}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Họ và Tên nhân viên</label>
            <input
              disabled
              type="text"
              className={cx('container-infor-ch')}
              onChange={(e) => setnameStaff(e.target.value)}
              value={nameStaff}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Họ và tên NPT</label>
            <input
              type="text"
              className={cx('container-infor-ch')}
              value={nameDependentPerson}
              onChange={(e) => setnameDependentPerson(e.target.value)}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Ngày sinh NPT</label>
            <input
              type="date"
              className={cx('container-infor-ch')}
              value={DateOfBirthDependentPerson}
              onChange={(e) => setDateOfBirthDependentPerson(e.target.value)}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Mã số thuế NPT</label>
            <input
              type="number"
              className={cx('container-infor-ch')}
              onChange={(e) => setTaxCodeDependentPerson(e.target.value)}
              value={TaxCodeDependentPerson}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Loại giấy tờ NPT</label>
            <select
              className={cx('select-filters-ch')}
              value={typeCardIDDependentPerson}
              onChange={(e) => settypeCardIDDependentPerson(e.target.value)}
            >
              <option value="">Vui lòng chọn</option>
              <option value="CMND">CMND</option>
              <option value="CCCD">CCCD</option>
            </select>
          </div>
          <div className={cx('container-infor')}>
            <label>CMND/CCCD NPT</label>
            <input
              type="number"
              className={cx('container-infor-ch')}
              onChange={(e) => setIDcard1DependentPerson(e.target.value)}
              value={IDcard1DependentPerson}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Ngày cấp</label>
            <input
              type="date"
              className={cx('container-infor-ch')}
              value={DateRangeIDcard1DependentPerson}
              onChange={(e) => setDateRangeIDcard1DependentPerson(e.target.value)}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Nơi cấp</label>
            <input
              type="text"
              className={cx('container-infor-ch')}
              value={IssuedbyIDcard1DependentPerson}
              onChange={(e) => setIssuedbyIDcard1DependentPerson(e.target.value)}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Số giấy tờ</label>
            <input
              type="number"
              className={cx('container-infor-ch')}
              value={numberOfPapers}
              onChange={(e) => setnumberOfPapers(e.target.value)}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Quan hệ với người nộp</label>
            <select
              className={cx('select-filters-ch')}
              value={RelationshipWithTaxpayers}
              onChange={(e) => setRelationshipWithTaxpayers(e.target.value)}
            >
              <option value="">Vui lòng chọn</option>
              <option value="Cha/Mẹ">Cha/Mẹ</option>
              <option value="Anh/Em">Anh/Em</option>
              <option value="Con">Con</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div className={cx('container-infor')}>
            <label>Từ tháng</label>
            <input
              type="date"
              className={cx('container-infor-ch')}
              value={FromMonth}
              onChange={(e) => setFromMonth(e.target.value)}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Tới tháng</label>
            <input
              type="date"
              className={cx('container-infor-ch')}
              value={ToTheMonth}
              onChange={(e) => setToTheMonth(e.target.value)}
            />
          </div>
        </div>
        {/* ========== */}
        <div className={cx('container-btn')}>
          {/* <button className={cx('btn-reset')}>Cài lại</button> */}
          <button className={cx('btn-confirm')} onClick={create()}>
            Thêm mới
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
    </div>
  );
};

export default AddDependentPerson;
