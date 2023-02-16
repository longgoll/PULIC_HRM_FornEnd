import classNames from 'classnames/bind';
import styles from './AddPersonnel.module.scss';
import country from '../../data/country.json';
import { useEffect, useState } from 'react';
//
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
//
import { apiUrl, cookieValue, numberFormat } from '../../contexts/contexts';
// import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const AddPersonnel = () => {
  // let navigate = useNavigate();
  //chon cty
  const [CompanyOption, setCompanyOption] = useState([]);
  const [BranchOption, setBranchOption] = useState([]);
  const [DepartmentOption, setDepartmentOption] = useState([]);
  const [GroupOption, setGroupOption] = useState([]);
  //chức danh
  const [dataTitleStaff, setdataTitleStaff] = useState([]);
  //danh sách ngân hàng
  const [bankOption, setbankOption] = useState([]);
  //thông tin sau khi chỉnh lại
  const [nameStaffFormat, setnameStaffFormat] = useState('');

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
  //check list
  const [clnum1, setclnum1] = useState(false);
  const [clnum2, setclnum2] = useState(false);
  const [clnum3, setclnum3] = useState(false);
  const [clnum4, setclnum4] = useState(false);
  const [clnum5, setclnum5] = useState(false);
  const [clnum6, setclnum6] = useState(false);
  //STT
  //   const [numberID, setnumberID] = useState('');
  //loại giấy tờ
  const [typeCardID, settypeCardID] = useState('');
  //mã nhân viên
  const [numberNV, setnumberNV] = useState('');
  //giới tính
  const [sexStaff, setsexStaff] = useState('');
  //ngày sinh
  const [DateOfBirth, setDateOfBirth] = useState('');
  //Tình trạng hôn nhân
  const [maritalStatus, setmaritalStatus] = useState('');
  //Dân tộc
  const [ethnic, setethnic] = useState('');
  //Tôn giáo
  const [Religion, setReligion] = useState('');
  //Họ và tên
  // const [nameStaff, setnameStaff] = useState('');
  //CCCD
  const [IDcard1, setIDcard1] = useState('');
  //Ngày cấp CCCD
  const [DateRangeIDcard1, setDateRangeIDcard1] = useState('');
  //Nơi cấp CMND
  const [IssuedbyIDcard1, setIssuedbyIDcard1] = useState('');
  //Quốc tịch
  const [Nationality, setNationality] = useState('VN');
  //Số ĐT 1
  const [phoneNumber, setphoneNumber] = useState('');
  //Số ĐT 2
  // const [phoneNumber1, setphoneNumber1] = useState('');
  //Email
  const [email, setemail] = useState('');
  //địa chỉ thường trú
  const [addressResident, setaddressResident] = useState('');
  //địa chỉ tạm trú
  const [addressstaying, setaddressstaying] = useState('');
  //công ty
  const [Company, setCompany] = useState('');
  //Chi nhanh
  const [companyBranch, setcompanyBranch] = useState('');
  //phòng ban
  const [department, setdepartment] = useState('');
  //nhóm
  const [group, setgroup] = useState('');
  //chức danh
  const [titleStaff, settitleStaff] = useState('');
  //ngày nghỉ phép
  const [vacationDay, setvacationDay] = useState('');
  //ngày nghỉ phép đã dùng
  const [vacationDayUse, setvacationDayUse] = useState('');
  //ngày bắt đầu làm thử
  const [DateStartTestWork, setDateStartTestWork] = useState('');
  //ngày bắt đầu làm chính thức
  const [DateStartWork, setDateStartWork] = useState('');
  //Ngày nghỉ làm
  const [RetirementDay, setRetirementDay] = useState('');
  //trạng thái
  //có đang làm không
  const [Working, setWorking] = useState('');
  //loại hợp đồng
  const [statusWorking, setstatusWorking] = useState('');
  //Mã số thuế
  const [TaxCode, setTaxCode] = useState('');
  //mã số BHXH
  const [CodeBHXH, setCodeBHXH] = useState('');
  //Số người giảm trừ gia cảnh
  // const [familyCircumstances, setfamilyCircumstances] = useState('');
  //tên ngân hàng
  const [BankNameAccount, setBankNameAccount] = useState('');
  //Tên TK ngân hàng
  // const [BankNameUserAccount, setBankNameUserAccount] = useState('');
  //số TK ngân hàng
  const [BankNumberAccount, setBankNumberAccount] = useState('');
  //Lương cơ bản
  const [BasicSalary, setBasicSalary] = useState('');
  //Mức đóng BHXH
  const [PaymentRateBHXH, setPaymentRateBHXH] = useState('');
  //Ngày báo tăng BHXH
  const [RisingDayBHXH, setRisingDayBHXH] = useState('');
  //Ngày báo giảm BHXH
  const [ReducedDayBHXH, setReducedDayBHXH] = useState('');
  //Trình độ học vấn (Đại học, cao đẳng, trung cấp, THPT, THCS)
  const [AcademicLevel, setAcademicLevel] = useState('');
  //Xếp loại(Xuất sắc, tốt, trung bình)
  const [Classification, setClassification] = useState('');
  //Nơi đào tạo(trường)
  const [TrainingPlaces, setTrainingPlaces] = useState('');
  //Chuyên ngành đào tạo
  const [SpecializedTraining, setSpecializedTraining] = useState('');
  //URL ảnh
  // const [UrlAccount, setUrlAccount] = useState('');
  //=======================================
  //sel country
  const listCountry = country.map((data) => (
    <option key={data.code} value={data.code}>
      {data.name}
    </option>
  ));

  //tạo mới nhân viên
  const createStaff = () => {
    return (e) => {
      in_hoa_ten();
    };
  };

  const in_hoa_ten = () => {
    // const array = [];
    // const tach = nameStaffFormat.split(' ');
    // for (let i = 0; i < tach.length + 1; i++) {
    //   if (i < tach.length) {
    //     const capitalizedStr = tach[i].charAt(0).toUpperCase() + tach[i].slice(1);
    //     array.push(capitalizedStr);
    //   } else if (i === tach.length) {
    //     const string = array.join(' ');
    //     in_hoa_bo_day_NH(string, string);
    //   }
    // }
    //==================================
    // const name = nameStaffFormat
    //   .split(' ')
    //   .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    //   .join(' ');
    //==================================
    const name = nameStaffFormat
      .split(' ')
      .map((word) => word.toUpperCase())
      .join(' ');
    in_hoa_bo_day_NH(name, name);
  };

  const in_hoa_bo_day_NH = (str, Name) => {
    var AccentsMap = [
      'aàảãáạăằẳẵắặâầẩẫấậ',
      'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
      'dđ',
      'DĐ',
      'eèẻẽéẹêềểễếệ',
      'EÈẺẼÉẸÊỀỂỄẾỆ',
      'iìỉĩíị',
      'IÌỈĨÍỊ',
      'oòỏõóọôồổỗốộơờởỡớợ',
      'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
      'uùủũúụưừửữứự',
      'UÙỦŨÚỤƯỪỬỮỨỰ',
      'yỳỷỹýỵ',
      'YỲỶỸÝỴ',
    ];
    for (var i = 0; i <= 15; i++) {
      if (i < 14) {
        var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
        var char = AccentsMap[i][0];
        str = str.replace(re, char);
      } else if (i === 15) {
        // save(Name, str);
        save(str.toUpperCase(), Name);
      }
    }
  };

  //luu
  const save = (NameTKNH, Name) => {
    //luu
    axios
      .post(
        apiUrl + '/v1/create-staff',
        {
          checklist1: clnum1,
          checklist2: clnum2,
          checklist3: clnum3,
          checklist4: clnum4,
          checklist5: clnum5,
          checklist6: clnum6,
          // numberID,
          numberNV,
          IssuedbyIDcard1,
          IDcard1,
          typeCardID,
          sexStaff,
          DateOfBirth,
          maritalStatus,
          ethnic,
          Religion,
          nameStaff: Name,
          DateRangeIDcard1,
          Nationality,
          phoneNumber,
          // phoneNumber1,
          email,
          addressResident,
          addressstaying,
          Company,
          companyBranch,
          department,
          group,
          titleStaff,
          vacationDay,
          vacationDayUse,
          DateStartTestWork,
          DateStartWork,
          RetirementDay,
          Working,
          statusWorking,
          TaxCode,
          CodeBHXH,
          // familyCircumstances,
          BankNameAccount,
          BankNameUserAccount: NameTKNH,
          BankNumberAccount,
          BasicSalary,
          PaymentRateBHXH,
          RisingDayBHXH,
          ReducedDayBHXH,
          AcademicLevel,
          Classification,
          TrainingPlaces,
          SpecializedTraining,
          // UrlAccount,
        },
        {
          headers: {
            token: cookieValue(),
          },
        },
      )
      .then(async (req) => {
        // console.log(req.data.message);
        //hiện thông báo
        pupsuccess(req.data.message);
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        pupwarn(error.response.data.message);
      });
  };
  //=======================================
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

  useEffect(() => {
    if (Company.length > 0) {
      //lấy danh sach chi nhanh
      axios
        .post(
          apiUrl + '/v1/get-branch-byChi',
          { ChiCompany: Company },
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

    if (Company.length > 0 && companyBranch.length > 0) {
      //lấy phong ban
      axios
        .post(
          apiUrl + '/v1/get-department-bychi',
          { ChiCompany: Company, ChiCompanyBranch: companyBranch },
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then((req) => {
          setDepartmentOption(req.data.data);
        })
        .catch((error) => {});
    }

    if (Company.length > 0 && companyBranch.length > 0 && department.length > 0) {
      //laays nhom
      axios
        .post(
          apiUrl + '/v1/get-group-bychir',
          { ChiCompany: Company, ChiCompanyBranch: companyBranch, ChiDepartment: department },
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then((req) => {
          setGroupOption(req.data.data);
        })
        .catch((error) => {});
    }
    //lấy chức danh
    axios
      .get(apiUrl + '/v1/get-all-title-staff', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        setdataTitleStaff(req.data.data);
      })
      .catch((error) => {});
  }, [Company, companyBranch, department]);
  //==========================================
  //danh sách chức danh
  const selectTitleStaff = dataTitleStaff.map((data) => {
    return (
      <option key={data._id} value={data.Title}>
        {data.Title}
      </option>
    );
  });

  //==========================================
  //list company
  const selectCompany = CompanyOption.map((data) => {
    return (
      <option key={data._id} value={data.Company}>
        {data.Company}
      </option>
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
  //=======================================
  //lấy danh sách ngân hàng
  useEffect(() => {
    axios
      .get(apiUrl + '/v1/get-all-bank', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        setbankOption(req.data.dataBank.data);
      })
      .catch((error) => {});
  }, []);

  //hiển thị danh sách
  const selectBank = bankOption.map((data) => {
    return (
      <option key={data.code} value={data.code}>
        {data.shortName}
      </option>
    );
  });

  //========================================
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container1-1')}>
        <div className={cx('container1-1-1')}>
          <img
            className={cx('avatar')}
            src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/13-small.d796bffd.png"
            alt="avatar"
          ></img>
        </div>
        <div className={cx('container1-1-2')}>
          <div className={cx('container1-1-2-2')}>
            <button className={cx('btn-edit')}>Tải ảnh</button>
            <button className={cx('btn-delete')}>Xóa ảnh</button>
          </div>
        </div>
      </div>
      {/* ===== */}
      <div className={cx('container-main')}>
        <div className={cx('title-infor')}>
          <h4>Thông tin cá nhân</h4>
        </div>
        <div className={cx('container-infor-main')}>
          <div className={cx('container-infor')}>
            <label>Mã nhân viên</label>
            <input type="text" className={cx('container-infor-ch')} onChange={(e) => setnumberNV(e.target.value)} />
          </div>
          <div className={cx('container-infor')}>
            <label>Họ và tên</label>
            <input
              type="text"
              className={cx('container-infor-ch')}
              onChange={(e) => setnameStaffFormat(e.target.value)}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Ngày sinh</label>
            <input type="date" className={cx('container-infor-ch')} onChange={(e) => setDateOfBirth(e.target.value)} />
          </div>
          <div className={cx('container-infor')}>
            <label>Giới tính</label>
            <select className={cx('select-filters-ch')} onChange={(e) => setsexStaff(e.target.value)}>
              <option value="">Vui lòng chọn</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          {/* <div className={cx('container-infor')}>
            <label>Giới tính</label>
            <input type="radio" className={cx('select-filters-ch')} onChange={(e) => setsexStaff(e.target.value)} />
            <label>Nam</label>
            <input type="radio" className={cx('select-filters-ch')} onChange={(e) => setsexStaff(e.target.value)} />
            <label>Nữ</label>
          </div> */}
          <div className={cx('container-infor')}>
            <label>Dân tộc</label>
            <input type="text" className={cx('container-infor-ch')} onChange={(e) => setethnic(e.target.value)} />
          </div>
          <div className={cx('container-infor')}>
            <label>Quốc tịch</label>
            <select className={cx('select-filters-ch')} onChange={(e) => setNationality(e.target.value)}>
              <option value="VN">Việt Nam</option>
              {listCountry}
            </select>
          </div>
          <div className={cx('container-infor')}>
            <label>Loại giấy tờ</label>
            <select className={cx('select-filters-ch')} onChange={(e) => settypeCardID(e.target.value)}>
              <option value="">Vui lòng chọn</option>
              <option value="CMND">CMND</option>
              <option value="CCCD">CCCD</option>
            </select>
          </div>
          <div className={cx('container-infor')}>
            <label>Số CCCD/CMND</label>
            <input
              type="number"
              className={cx('container-infor-ch')}
              onChange={(e) => setIDcard1(e.target.value.replace('.', ''))}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Ngày cấp CCCD/CMND</label>
            <input
              type="date"
              className={cx('container-infor-ch')}
              onChange={(e) => setDateRangeIDcard1(e.target.value)}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Nơi cấp CCCD/CMND</label>
            <input
              type="text"
              className={cx('container-infor-ch')}
              onChange={(e) => setIssuedbyIDcard1(e.target.value)}
            />
          </div>
        </div>
        {/*checkbox hồ sơ*/}
        <div className={cx('container-infor-main')}>
          <div className={cx('container-infor')}>
            <label className={cx('container')}>
              Đơn xin việc
              <input
                className={cx('input-checkbox')}
                type="checkbox"
                checked={clnum1}
                onChange={() => setclnum1(!clnum1)}
              />
              <span className={cx('checkmark')}></span>
            </label>
            <label className={cx('container')}>
              Ảnh 3x4
              <input
                className={cx('input-checkbox')}
                type="checkbox"
                checked={clnum2}
                onChange={() => setclnum2(!clnum2)}
              />
              <span className={cx('checkmark')}></span>
            </label>
            <label className={cx('container')}>
              Sơ yếu lý lịch
              <input
                className={cx('input-checkbox')}
                type="checkbox"
                checked={clnum3}
                onChange={() => setclnum3(!clnum3)}
              />
              <span className={cx('checkmark')}></span>
            </label>
            <label className={cx('container')}>
              Sổ hộ khẩu/Giấy xác nhận nơi cư trú
              <input
                className={cx('input-checkbox')}
                type="checkbox"
                checked={clnum4}
                onChange={() => setclnum4(!clnum4)}
              />
              <span className={cx('checkmark')}></span>
            </label>
            <label className={cx('container')}>
              CMND/CCCD
              <input
                className={cx('input-checkbox')}
                type="checkbox"
                checked={clnum5}
                onChange={() => setclnum5(!clnum5)}
              />
              <span className={cx('checkmark')}></span>
            </label>
            <label className={cx('container')}>
              Bảng thông tin ứng viên
              <input
                className={cx('input-checkbox')}
                type="checkbox"
                checked={clnum6}
                onChange={() => setclnum6(!clnum6)}
              />
              <span className={cx('checkmark')}></span>
            </label>
          </div>
        </div>
        {/* ========== */}
        <div className={cx('title-infor')}>
          <h4>Thông tin công ty</h4>
        </div>
        <div className={cx('container-infor-main')}>
          <div className={cx('container-infor')}>
            <label>Tên công ty</label>
            <select className={cx('select-filters-ch')} onChange={(e) => setCompany(e.target.value)}>
              <option value="">Vui lòng chọn</option>
              {selectCompany}
            </select>
          </div>
          <div className={cx('container-infor')}>
            <label>Chi nhánh</label>
            <select className={cx('select-filters-ch')} onChange={(e) => setcompanyBranch(e.target.value)}>
              <option value="">Vui lòng chọn</option>
              {selectBranch}
            </select>
          </div>
          <div className={cx('container-infor')}>
            <label>Phòng ban</label>
            <select className={cx('select-filters-ch')} onChange={(e) => setdepartment(e.target.value)}>
              <option value="">Vui lòng chọn</option>
              {selectDepartment}
            </select>
          </div>
          <div className={cx('container-infor')}>
            <label>Nhóm</label>
            <select className={cx('select-filters-ch')} onChange={(e) => setgroup(e.target.value)}>
              <option value="">Vui lòng chọn</option>
              {selectGroup}
            </select>
          </div>
          <div className={cx('container-infor')}>
            <label>Chức danh</label>
            <select className={cx('select-filters-ch')} onChange={(e) => settitleStaff(e.target.value)}>
              <option value="">Vui lòng chọn</option>
              {selectTitleStaff}
            </select>
          </div>
        </div>
        {/* ========== */}
        <div className={cx('title-infor')}>
          <h4>Thông tin công việc và vị trí</h4>
        </div>
        <div className={cx('container-infor-main')}>
          {/* <div className={cx('container-infor')}>
            <label>STT</label>
            <input
              type="number"
              disabled
              className={cx('container-infor-ch')}
              placeholder="Số thứ tự nhân viên được cấp tự động"
            ></input>
          </div> */}
          <div className={cx('container-infor')}>
            <label>Ngày thử việc</label>
            <input
              type="date"
              className={cx('container-infor-ch')}
              onChange={(e) => setDateStartTestWork(e.target.value)}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Ngày chính thức</label>
            <input
              type="date"
              className={cx('container-infor-ch')}
              onChange={(e) => setDateStartWork(e.target.value)}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Số ngày được nghỉ phép</label>
            <input
              type="number"
              className={cx('container-infor-ch')}
              onChange={(e) => setvacationDay(e.target.value)}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Số ngày đã nghỉ phép</label>
            <input
              type="number"
              className={cx('container-infor-ch')}
              onChange={(e) => setvacationDayUse(e.target.value)}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Ngày nghỉ việc</label>
            <input
              type="date"
              className={cx('container-infor-ch')}
              onChange={(e) => setRetirementDay(e.target.value)}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>trạng thái</label>
            <select className={cx('select-filters-ch')} onChange={(e) => setWorking(e.target.value)}>
              <option value="">Vui lòng chọn</option>
              {/* <option value="Đang tuyển">Đang tuyển</option> */}
              <option value="Đang làm">Đang làm</option>
              <option value="Thai sản">Thai sản</option>
              <option value="Thôi việc">Thôi việc</option>
            </select>
          </div>
          <div className={cx('container-infor')}>
            <label>Lọai hợp đồng</label>
            <select className={cx('select-filters-ch')} onChange={(e) => setstatusWorking(e.target.value)}>
              <option value="">Vui lòng chọn</option>
              <option value="HDTV">Hợp đồng thử Việc</option>
              <option value="HDDV">Hợp đồng dịch vụ</option>
              <option value="HDLD">Hợp đồng lao động</option>
              {/* <option value="Thôi việc">Thôi việc</option> */}
            </select>
          </div>
        </div>
        {/* ========== */}
        <div className={cx('title-infor')}>
          <h4>Thông tin liên hệ</h4>
        </div>
        <div className={cx('container-infor-main')}>
          <div className={cx('container-infor')}>
            <label>SĐT1</label>
            <input
              type="number"
              className={cx('container-infor-ch')}
              onChange={(e) => setphoneNumber(e.target.value.replace('.', ''))}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Email</label>
            <input type="email" className={cx('container-infor-ch')} onChange={(e) => setemail(e.target.value)} />
          </div>
          {/* <div className={cx('container-infor')}>
            <label>SĐT2</label>
            <input
              type="number"
              className={cx('container-infor-ch')}
              onChange={(e) => setphoneNumber1(e.target.value.replace('.', ''))}
            />
          </div> */}
          <div className={cx('container-infor')}>
            <label>Địa chỉ thường trú</label>
            <input
              type="text"
              className={cx('container-infor-ch')}
              onChange={(e) => setaddressResident(e.target.value)}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Địa chỉ tạm trú</label>
            <input
              type="text"
              className={cx('container-infor-ch')}
              onChange={(e) => setaddressstaying(e.target.value)}
            />
          </div>
        </div>
        {/* ========== */}
        <div className={cx('title-infor')}>
          <h4>Thông tin Ngân hàng Và BHXH</h4>
        </div>
        <div className={cx('container-infor-main')}>
          <div className={cx('container-infor')}>
            <label>Mã số thuế</label>
            <input
              type="number"
              className={cx('container-infor-ch')}
              onChange={(e) => setTaxCode(e.target.value.replace('.', ''))}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Mã số BHXH</label>
            <input
              type="number"
              className={cx('container-infor-ch')}
              onChange={(e) => setCodeBHXH(e.target.value.replace('.', ''))}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Số tài khoản</label>
            <input
              type="number"
              className={cx('container-infor-ch')}
              onChange={(e) => setBankNumberAccount(e.target.value.replace('.', ''))}
            />
          </div>
          {/* <div className={cx('container-infor')}>
            <label>Tên tài khoản</label>
            <input
              type="text"
              className={cx('container-infor-ch')}
              onChange={(e) => setBankNameUserAccount(e.target.value)}
            />
          </div> */}
          {/* <div className={cx('container-infor')}>
            <label>Tên ngân hàng</label>
            <input
              type="text"
              className={cx('container-infor-ch')}
              onChange={(e) => setBankNameAccount(e.target.value)}
            />
          </div> */}
          <div className={cx('container-infor')}>
            <label>Tên ngân hàng</label>
            <select className={cx('select-filters-ch')} onChange={(e) => setBankNameAccount(e.target.value)}>
              <option value="">Vui lòng chọn</option>
              {selectBank}
            </select>
          </div>
          <div className={cx('container-infor')}>
            <label>Lương cơ bản</label>
            <input
              type="number"
              className={cx('container-infor-ch')}
              onChange={(e) => setBasicSalary(e.target.value.replace('.', ''))}
            />
            <p>{numberFormat.format(BasicSalary)}</p>
          </div>
          <div className={cx('container-infor')}>
            <label>Mức đóng BHXH</label>
            <input
              type="number"
              className={cx('container-infor-ch')}
              onChange={(e) => setPaymentRateBHXH(e.target.value.replace('.', ''))}
            />
            <p>{numberFormat.format(PaymentRateBHXH)}</p>
          </div>
          <div className={cx('container-infor')}>
            <label>Ngày báo tăng BHXH</label>
            <input
              type="date"
              className={cx('container-infor-ch')}
              onChange={(e) => setRisingDayBHXH(e.target.value)}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Ngày báo giảm BHXH</label>
            <input
              type="date"
              className={cx('container-infor-ch')}
              onChange={(e) => setReducedDayBHXH(e.target.value)}
            />
          </div>
        </div>
        {/* ========== */}
        <div className={cx('title-infor')}>
          <h4>Thông tin thêm</h4>
        </div>
        <div className={cx('container-infor-main')}>
          <div className={cx('container-infor')}>
            <label>Tình trạng hôn nhân</label>
            <select className={cx('select-filters-ch')} onChange={(e) => setmaritalStatus(e.target.value)}>
              <option value="">Vui lòng chọn</option>
              <option value="Độc thânh">Độc thân</option>
              <option value="Đã kết hôn">Đã kết hôn</option>
              <option value="Li thân">Li thân</option>
            </select>
          </div>
          <div className={cx('container-infor')}>
            <label>Tôn giáo</label>
            <input type="text" className={cx('container-infor-ch')} onChange={(e) => setReligion(e.target.value)} />
          </div>
          <div className={cx('container-infor')}>
            <label>Trình độ học vấn</label>
            <select className={cx('select-filters-ch')} onChange={(e) => setAcademicLevel(e.target.value)}>
              <option value="">Vui lòng chọn</option>
              <option value="Cao học">Cao học</option>
              <option value="Đại học">Đại học</option>
              <option value="Cao đẳng">Cao đẳng</option>
              <option value="Trung cấp">Trung cấp</option>
              <option value="THPT">THPT</option>
              <option value="THCS">THCS</option>
              <option value="Tiểu Học">Tiểu Học</option>
              <option value="Không">Không</option>
            </select>
          </div>
          <div className={cx('container-infor')}>
            <label>Xếp loại</label>
            <select className={cx('select-filters-ch')} onChange={(e) => setClassification(e.target.value)}>
              <option value="">Vui lòng chọn</option>
              <option value="Xuất sắc">Xuất sắc</option>
              <option value="Giỏi">Giỏi</option>
              <option value="Khá">Khá</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Yếu">Yếu</option>
            </select>
          </div>
          <div className={cx('container-infor')}>
            <label>Nơi đào tạo</label>
            <input
              type="url"
              className={cx('container-infor-ch')}
              onChange={(e) => setTrainingPlaces(e.target.value)}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Chuyên nghành</label>
            <input
              type="url"
              className={cx('container-infor-ch')}
              onChange={(e) => setSpecializedTraining(e.target.value)}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Zalo</label>
            <input type="url" className={cx('container-infor-ch')} />
          </div>
          <div className={cx('container-infor')}>
            <label>Facebook</label>
            <input type="url" className={cx('container-infor-ch')} />
          </div>
          <div className={cx('container-infor')}>
            <label>Telegram</label>
            <input type="url" className={cx('container-infor-ch')} />
          </div>
        </div>
        {/* ========== */}
        <div className={cx('container-btn')}>
          {/* <button className={cx('btn-reset')}>Cài lại</button> */}
          <button className={cx('btn-confirm')} onClick={createStaff()}>
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

export default AddPersonnel;
