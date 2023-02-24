import classNames from 'classnames/bind';
import styles from './EidtPersonnel.module.scss';
import country from '../../data/country.json';
//
import { useEffect, useState } from 'react';
import { apiUrl, cookieValue, numberFormat } from '../../contexts/contexts';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

function EidtPersonnel() {
  // let navigate = useNavigate();
  //=================================
  //danh sách ngân hàng
  const [bankOption, setbankOption] = useState([]);
  //chon cty
  const [CompanyOption, setCompanyOption] = useState([]);
  const [BranchOption, setBranchOption] = useState([]);
  const [DepartmentOption, setDepartmentOption] = useState([]);
  const [GroupOption, setGroupOption] = useState([]);
  //chức danh
  const [dataTitleStaff, setdataTitleStaff] = useState([]);
  //===============================
  //check list
  const [clnum1, setclnum1] = useState(false);
  const [clnum2, setclnum2] = useState(false);
  const [clnum3, setclnum3] = useState(false);
  const [clnum4, setclnum4] = useState(false);
  const [clnum5, setclnum5] = useState(false);
  const [clnum6, setclnum6] = useState(false);
  const [clnum7, setclnum7] = useState(false);
  // const [dataStaff, setdataStaff] = useState([]);
  //
  //STT
  const [numberID, setnumberID] = useState('');
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
  const [nameStaff, setnameStaff] = useState('');
  //CCCD
  const [IDcard1, setIDcard1] = useState('');
  //Ngày cấp CCCD
  const [DateRangeIDcard1, setDateRangeIDcard1] = useState('');
  //Nơi cấp CMND
  const [IssuedbyIDcard1, setIssuedbyIDcard1] = useState('');
  //Quốc tịch
  const [Nationality, setNationality] = useState('');
  //Số ĐT 1
  const [phoneNumber, setphoneNumber] = useState('');
  //Số ĐT 2
  const [phoneNumber1, setphoneNumber1] = useState('');
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
  const [BankNameUserAccount, setBankNameUserAccount] = useState('');
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
  //sel country
  const listCountry = country.map((data) => (
    <option key={data.code} value={data.code}>
      {data.name}
    </option>
  ));

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

  useEffect(() => {
    //lấy id nhân viên trên url
    const url = window.location.pathname.split('/');
    //lấy dữ liệu
    axios
      .get(apiUrl + '/v1/get-staff/' + url[2], {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        const dataStaff = req.data.data;
        // console.log(req.data.data);
        // setdataStaff(req.data.data);
        setclnum1(dataStaff.checklist1);
        setclnum2(dataStaff.checklist2);
        setclnum3(dataStaff.checklist3);
        setclnum4(dataStaff.checklist4);
        setclnum5(dataStaff.checklist5);
        setclnum6(dataStaff.checklist6);
        setclnum7(dataStaff.checklist7);
        //STT
        setnumberID(dataStaff.numberID);
        //loại giấy tờ
        settypeCardID(dataStaff.typeCardID);
        //mã nhân viên
        setnumberNV(dataStaff.numberNV);
        //giới tính
        setsexStaff(dataStaff.sexStaff);
        //ngày sinh
        setDateOfBirth(dataStaff.DateOfBirth);
        //Tình trạng hôn nhân
        setmaritalStatus(dataStaff.maritalStatus);
        //Dân tộc
        setethnic(dataStaff.ethnic);
        //Tôn giáo
        setReligion(dataStaff.Religion);
        //Họ và tên
        setnameStaff(dataStaff.nameStaff);
        //CCCD
        setIDcard1(dataStaff.IDcard1);
        //Ngày cấp CCCD
        setDateRangeIDcard1(dataStaff.DateRangeIDcard1);
        //Nơi cấp CMND
        setIssuedbyIDcard1(dataStaff.IssuedbyIDcard1);
        //Quốc tịch
        setNationality(dataStaff.Nationality);
        //Số ĐT 1
        setphoneNumber(dataStaff.phoneNumber);
        //Số ĐT 2
        setphoneNumber1(dataStaff.phoneNumber1);
        //Email
        setemail(dataStaff.email);
        //địa chỉ thường trú
        setaddressResident(dataStaff.addressResident);
        // //địa chỉ tạm trú
        setaddressstaying(dataStaff.addressstaying);
        // //công ty
        setCompany(dataStaff.Company);
        // //Chi nhanh
        setcompanyBranch(dataStaff.companyBranch);
        // //phòng ban
        setdepartment(dataStaff.department);
        //nhóm
        setgroup(dataStaff.group);
        //chức danh
        settitleStaff(dataStaff.titleStaff);
        //ngày nghỉ phép
        setvacationDay(dataStaff.vacationDay);
        //ngày nghỉ phép đã dùng
        setvacationDayUse(dataStaff.vacationDayUse);
        //ngày bắt đầu làm thử
        setDateStartTestWork(dataStaff.DateStartTestWork);
        // ngày bắt đầu làm chính thức
        setDateStartWork(dataStaff.DateStartWork);
        //Ngày nghỉ làm
        setRetirementDay(dataStaff.RetirementDay);
        //trạng thái
        //có đang làm không
        setWorking(dataStaff.Working);
        // loại hợp đồng
        setstatusWorking(dataStaff.statusWorking);
        //Mã số thuế
        setTaxCode(dataStaff.TaxCode);
        //mã số BHXH
        setCodeBHXH(dataStaff.CodeBHXH);
        //Số người giảm trừ gia cảnh
        // const [familyCircumstances, setfamilyCircumstances] = useState('');
        //tên ngân hàng
        setBankNameAccount(dataStaff.BankNameAccount);
        //Tên TK ngân hàng
        setBankNameUserAccount(dataStaff.BankNameUserAccount);
        //số TK ngân hàng
        setBankNumberAccount(dataStaff.BankNumberAccount);
        //Lương cơ bản
        setBasicSalary(dataStaff.BasicSalary);
        //Mức đóng BHXH
        setPaymentRateBHXH(dataStaff.PaymentRateBHXH);
        //Ngày báo tăng BHXH
        setRisingDayBHXH(dataStaff.RisingDayBHXH);
        //Ngày báo giảm BHXH
        setReducedDayBHXH(dataStaff.ReducedDayBHXH);
        //Trình độ học vấn (Đại học, cao đẳng, trung cấp, THPT, THCS)
        setAcademicLevel(dataStaff.AcademicLevel);
        //Xếp loại(Xuất sắc, tốt, trung bình)
        setClassification(dataStaff.Classification);
        //Nơi đào tạo(trường)
        setTrainingPlaces(dataStaff.TrainingPlaces);
        //Chuyên ngành đào tạo
        setSpecializedTraining(dataStaff.SpecializedTraining);
        // URL ảnh
        // const [UrlAccount, setUrlAccount] = useState('');
        // sel country
      })
      .catch((error) => {});
  }, []);

  //==================================
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

    if (Company.length > 0 && companyBranch !== undefined) {
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

    if (Company.length > 0 && companyBranch !== undefined && department !== undefined) {
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
    //==========================================
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

  //======================================
  //cap nhat
  const updateStaff = () => {
    return (e) => {
      in_hoa_ten();
    };
  };

  const in_hoa_ten = () => {
    // const array = [];
    // const tach = nameStaff.split(' ');
    // for (let i = 0; i < tach.length + 1; i++) {
    //   if (i < tach.length) {
    //     const capitalizedStr = tach[i].charAt(0).toUpperCase() + tach[i].slice(1);
    //     array.push(capitalizedStr);
    //   } else if (i === tach.length) {
    //     const string = array.join(' ');
    //     in_hoa_bo_day_NH(string, string);
    //   }
    // }
    //================================
    // const name = nameStaff
    //   .split(' ')
    //   .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    //   .join(' ');
    //================================
    const name = nameStaff
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

  const save = (NameTKNH, Name) => {
    //lấy id nhân viên trên url
    const url = window.location.pathname.split('/');
    axios
      .put(
        apiUrl + '/v1/updata-staff/' + url[2],
        {
          _id: url[2],
          //
          checklist1: clnum1,
          checklist2: clnum2,
          checklist3: clnum3,
          checklist4: clnum4,
          checklist5: clnum5,
          checklist6: clnum6,
          checklist7: clnum7,
          checklistNumber: [clnum1, clnum2, clnum3, clnum4, clnum5, clnum6, clnum7].reduce(
            (acc, val) => (val ? acc + 1 : acc),
            0,
          ),
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
          phoneNumber1,
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
      .then((req) => {
        // console.log(req.data.message);
        pupsuccess(req.data.message);
        // navigate('/personnel');
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        pupwarn(error.response.data.message);
      });
  };
  //=============================================
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
  //=============================================
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
          <div className={cx('container1-1-2-1')}>
            <h4>{nameStaff}</h4>
            <p>Nhân viên</p>
          </div>
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
            <label>STT</label>
            <input
              type="number"
              disabled
              className={cx('container-infor-ch')}
              placeholder="Số thứ tự nhân viên được cấp tự động"
              value={numberID}
            ></input>
          </div>
          <div className={cx('container-infor')}>
            <label>Mã nhân viên</label>
            <input
              disabled
              type="text"
              className={cx('container-infor-ch')}
              onChange={(e) => setnumberNV(e.target.value)}
              value={numberNV !== undefined ? numberNV : ''}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Họ và tên</label>
            <input
              type="text"
              className={cx('container-infor-ch')}
              onChange={(e) => setnameStaff(e.target.value)}
              value={nameStaff !== undefined ? nameStaff : ''}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Ngày sinh</label>
            <input
              type="date"
              className={cx('container-infor-ch')}
              onChange={(e) => setDateOfBirth(e.target.value)}
              value={DateOfBirth !== undefined ? moment(DateOfBirth).format('YYYY-MM-DD') : ''}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Giới tính</label>
            <select
              className={cx('select-filters-ch')}
              onChange={(e) => setsexStaff(e.target.value)}
              value={sexStaff !== undefined ? sexStaff : ''}
            >
              <option value="">Vui lòng chọn</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          <div className={cx('container-infor')}>
            <label>Dân tộc</label>
            <input
              type="text"
              className={cx('container-infor-ch')}
              onChange={(e) => setethnic(e.target.value)}
              value={ethnic}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Quốc tịch</label>
            <select
              className={cx('select-filters-ch')}
              onChange={(e) => setNationality(e.target.value)}
              value={Nationality}
            >
              <option value="VN">Việt Nam</option>
              {listCountry}
            </select>
          </div>
          <div className={cx('container-infor')}>
            <label>Loại giấy tờ</label>
            <select
              className={cx('select-filters-ch')}
              onChange={(e) => settypeCardID(e.target.value)}
              value={typeCardID !== undefined ? typeCardID : ''}
            >
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
              value={IDcard1 !== undefined ? IDcard1 : ''}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Ngày cấp CCCD/CMND</label>
            <input
              type="date"
              className={cx('container-infor-ch')}
              onChange={(e) => setDateRangeIDcard1(e.target.value)}
              value={DateRangeIDcard1 !== undefined ? moment(DateRangeIDcard1).format('YYYY-MM-DD') : ''}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Nơi cấp CCCD/CMND</label>
            <input
              type="text"
              className={cx('container-infor-ch')}
              onChange={(e) => setIssuedbyIDcard1(e.target.value)}
              value={IssuedbyIDcard1 !== undefined ? IssuedbyIDcard1 : ''}
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
            <label className={cx('container')}>
              Bằng cấp
              <input
                className={cx('input-checkbox')}
                type="checkbox"
                checked={clnum7}
                onChange={() => setclnum7(!clnum7)}
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
            <select
              className={cx('select-filters-ch')}
              onChange={(e) => setCompany(e.target.value)}
              value={Company !== undefined ? Company : ''}
            >
              <option value="">Vui lòng chọn</option>
              {selectCompany}
            </select>
          </div>
          <div className={cx('container-infor')}>
            <label>Chi nhánh</label>
            <select
              className={cx('select-filters-ch')}
              onChange={(e) => setcompanyBranch(e.target.value)}
              value={companyBranch !== undefined ? companyBranch : ''}
            >
              <option value="">Vui lòng chọn</option>
              {selectBranch}
            </select>
          </div>
          <div className={cx('container-infor')}>
            <label>Phòng ban</label>
            <select
              className={cx('select-filters-ch')}
              onChange={(e) => setdepartment(e.target.value)}
              value={department !== undefined ? department : ''}
            >
              <option value="">Vui lòng chọn</option>
              {selectDepartment}
            </select>
          </div>
          <div className={cx('container-infor')}>
            <label>Nhóm</label>
            <select
              className={cx('select-filters-ch')}
              onChange={(e) => setgroup(e.target.value)}
              value={group !== undefined ? group : ''}
            >
              <option value="">Vui lòng chọn</option>
              {selectGroup}
            </select>
          </div>
          <div className={cx('container-infor')}>
            <label>Chức danh</label>
            <select
              className={cx('select-filters-ch')}
              onChange={(e) => settitleStaff(e.target.value)}
              value={titleStaff}
            >
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
          <div className={cx('container-infor')}>
            <label>Ngày thử việc</label>
            <input
              type="date"
              className={cx('container-infor-ch')}
              onChange={(e) => setDateStartTestWork(e.target.value)}
              value={DateStartTestWork !== undefined ? moment(DateStartTestWork).format('YYYY-MM-DD') : ''}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Ngày chính thức</label>
            <input
              type="date"
              className={cx('container-infor-ch')}
              onChange={(e) => setDateStartWork(e.target.value)}
              value={DateStartWork !== undefined ? moment(DateStartWork).format('YYYY-MM-DD') : ''}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Số ngày được nghỉ phép</label>
            <input
              type="number"
              className={cx('container-infor-ch')}
              onChange={(e) => setvacationDay(e.target.value)}
              value={vacationDay}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Số ngày đã nghỉ phép</label>
            <input
              type="number"
              className={cx('container-infor-ch')}
              onChange={(e) => setvacationDayUse(e.target.value)}
              value={vacationDayUse}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Ngày nghỉ việc</label>
            <input
              type="date"
              className={cx('container-infor-ch')}
              onChange={(e) => setRetirementDay(e.target.value)}
              value={RetirementDay !== undefined ? moment(RetirementDay).format('YYYY-MM-DD') : ''}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>trạng thái</label>
            <select className={cx('select-filters-ch')} onChange={(e) => setWorking(e.target.value)} value={Working}>
              <option value="">Vui lòng chọn</option>
              {/* <option value="Đang tuyển">Đang tuyển</option> */}
              <option value="Đang làm">Đang làm</option>
              <option value="Thai sản">Thai sản</option>
              <option value="Thôi việc">Thôi việc</option>
            </select>
          </div>
          <div className={cx('container-infor')}>
            <label>Lọai hợp đồng</label>
            <select
              className={cx('select-filters-ch')}
              onChange={(e) => setstatusWorking(e.target.value)}
              value={statusWorking}
            >
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
              value={phoneNumber !== undefined ? phoneNumber : ''}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Email</label>
            <input
              type="email"
              className={cx('container-infor-ch')}
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />
          </div>
          {/* <div className={cx('container-infor')}>
            <label>SĐT2</label>
            <input
              type="number"
              className={cx('container-infor-ch')}
              onChange={(e) => setphoneNumber1(e.target.value.replace('.', ''))}
              value={phoneNumber1}
            />
          </div> */}
          <div className={cx('container-infor')}>
            <label>Địa chỉ thường trú</label>
            <input
              type="text"
              className={cx('container-infor-ch')}
              onChange={(e) => setaddressResident(e.target.value)}
              value={addressResident}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Địa chỉ tạm trú</label>
            <input
              type="text"
              className={cx('container-infor-ch')}
              onChange={(e) => setaddressstaying(e.target.value)}
              value={addressstaying}
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
              value={TaxCode}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Mã số BHXH</label>
            <input
              type="number"
              className={cx('container-infor-ch')}
              onChange={(e) => setCodeBHXH(e.target.value.replace('.', ''))}
              value={CodeBHXH}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Số tài khoản</label>
            <input
              type="number"
              className={cx('container-infor-ch')}
              onChange={(e) => setBankNumberAccount(e.target.value.replace('.', ''))}
              value={BankNumberAccount.replace(/'/g, '')}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Tên tài khoản</label>
            <input
              disabled
              type="text"
              className={cx('container-infor-ch')}
              onChange={(e) => setBankNameUserAccount(e.target.value)}
              value={BankNameUserAccount}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Tên ngân hàng</label>
            <select
              className={cx('select-filters-ch')}
              onChange={(e) => setBankNameAccount(e.target.value)}
              value={BankNameAccount}
            >
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
              value={BasicSalary}
            />
            <p>{numberFormat.format(BasicSalary)}</p>
          </div>
          <div className={cx('container-infor')}>
            <label>Mức đóng BHXH</label>
            <input
              type="number"
              className={cx('container-infor-ch')}
              onChange={(e) => setPaymentRateBHXH(e.target.value.replace('.', ''))}
              value={PaymentRateBHXH}
            />
            <p>{numberFormat.format(PaymentRateBHXH)}</p>
          </div>
          <div className={cx('container-infor')}>
            <label>Ngày báo tăng BHXH</label>
            <input
              type="date"
              className={cx('container-infor-ch')}
              onChange={(e) => setRisingDayBHXH(e.target.value)}
              value={RisingDayBHXH !== undefined ? moment(RisingDayBHXH).format('YYYY-MM-DD') : ''}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Ngày báo giảm BHXH</label>
            <input
              type="date"
              className={cx('container-infor-ch')}
              onChange={(e) => setReducedDayBHXH(e.target.value)}
              value={ReducedDayBHXH !== undefined ? moment(ReducedDayBHXH).format('YYYY-MM-DD') : ''}
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
            <select
              className={cx('select-filters-ch')}
              onChange={(e) => setmaritalStatus(e.target.value)}
              value={maritalStatus}
            >
              <option value="">Vui lòng chọn</option>
              <option value="Độc thânh">Độc thânh</option>
              <option value="Đã kết hôn">Đã kết hôn</option>
              <option value="Li thân">Li thân</option>
            </select>
          </div>
          <div className={cx('container-infor')}>
            <label>Tôn giáo</label>
            <input
              type="text"
              className={cx('container-infor-ch')}
              onChange={(e) => setReligion(e.target.value)}
              value={Religion}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Trình độ học vấn</label>
            <select
              className={cx('select-filters-ch')}
              onChange={(e) => setAcademicLevel(e.target.value)}
              value={AcademicLevel}
            >
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
            <select
              className={cx('select-filters-ch')}
              onChange={(e) => setClassification(e.target.value)}
              value={Classification}
            >
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
              value={TrainingPlaces}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Chuyên nghành</label>
            <input
              type="url"
              className={cx('container-infor-ch')}
              onChange={(e) => setSpecializedTraining(e.target.value)}
              value={SpecializedTraining}
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
          <button className={cx('btn-confirm')} onClick={updateStaff()}>
            Xác nhận thay đổi
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
}

export default EidtPersonnel;
