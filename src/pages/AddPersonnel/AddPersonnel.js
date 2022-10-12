import classNames from 'classnames/bind';
import styles from './AddPersonnel.module.scss';
import country from '../../data/country.json';
import { useEffect, useState } from 'react';
//
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
//
import { apiUrl, cookieValue } from '../../contexts/contexts';
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
  //===========
  //sel country
  const listCountry = country.map((data) => (
    <option key={data.code} value={data.code}>
      {data.name}
    </option>
  ));

  //tạo mới nhân viên
  const createStaff = () => {
    return (e) => {
      axios
        .post(
          apiUrl + '/v1/create-staff',
          {
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
            nameStaff,
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
            BankNameUserAccount,
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
        })
        .catch((error) => {
          // console.log(error.response.data.message);
          pupwarn(error.response.data.message);
        });
    };
  };
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
      <option key={data._id} value={data._id}>
        {data.Company}
      </option>
    );
  });

  //danh sách select chi nhánh
  const selectBranch = BranchOption.map((data) => {
    return (
      <option key={data._id} value={data._id}>
        {data.companyBranch}
      </option>
    );
  });

  //danh sách select phòng ban
  const selectDepartment = DepartmentOption.map((data) => {
    return (
      <option key={data._id} value={data._id}>
        {data.department}
      </option>
    );
  });

  //danh sách select nhóm
  const selectGroup = GroupOption.map((data) => {
    return (
      <option key={data._id} value={data._id}>
        {data.group}
      </option>
    );
  });

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
            <label>Họ và tên</label>
            <input type="text" className={cx('container-infor-ch')} onChange={(e) => setnameStaff(e.target.value)} />
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
              <option value="Khác">Khác</option>
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
          <div className={cx('container-infor')}>
            <label>STT</label>
            <input
              type="number"
              disabled
              className={cx('container-infor-ch')}
              placeholder="Số thứ tự nhân viên được cấp tự động"
            ></input>
          </div>
          <div className={cx('container-infor')}>
            <label>Mã nhân viên</label>
            <input type="text" className={cx('container-infor-ch')} onChange={(e) => setnumberNV(e.target.value)} />
          </div>
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
              <option value="Đang tuyển">Đang tuyển</option>
              <option value="Đang làm">Đang làm</option>
              <option value="Thai sản">Thai sản</option>
              <option value="Thôi việc">Nghỉ làm</option>
            </select>
          </div>
          <div className={cx('container-infor')}>
            <label>Lọai hợp đồng</label>
            <select className={cx('select-filters-ch')} onChange={(e) => setstatusWorking(e.target.value)}>
              <option value="">Vui lòng chọn</option>
              <option value="Thử việc">Thử việc</option>
              <option value="Chính thức">Chính thức</option>
              <option value="Thôi việc">Nghỉ làm</option>
            </select>
          </div>
        </div>
        {/* ========== */}
        <div className={cx('title-infor')}>
          <h4>Thông tin liên hệ</h4>
        </div>
        <div className={cx('container-infor-main')}>
          <div className={cx('container-infor')}>
            <label>Email</label>
            <input type="email" className={cx('container-infor-ch')} onChange={(e) => setemail(e.target.value)} />
          </div>
          <div className={cx('container-infor')}>
            <label>SĐT1</label>
            <input
              type="number"
              className={cx('container-infor-ch')}
              onChange={(e) => setphoneNumber(e.target.value.replace('.', ''))}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>SĐT2</label>
            <input
              type="number"
              className={cx('container-infor-ch')}
              onChange={(e) => setphoneNumber1(e.target.value.replace('.', ''))}
            />
          </div>
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
          <div className={cx('container-infor')}>
            <label>Tên tài khoản</label>
            <input
              type="text"
              className={cx('container-infor-ch')}
              onChange={(e) => setBankNameUserAccount(e.target.value)}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Tên ngân hàng</label>
            <input
              type="text"
              className={cx('container-infor-ch')}
              onChange={(e) => setBankNameAccount(e.target.value)}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Lương cơ bản</label>
            <input
              type="number"
              className={cx('container-infor-ch')}
              onChange={(e) => setBasicSalary(e.target.value.replace('.', ''))}
            />
          </div>
          <div className={cx('container-infor')}>
            <label>Mức đóng BHXH</label>
            <input
              type="number"
              className={cx('container-infor-ch')}
              onChange={(e) => setPaymentRateBHXH(e.target.value.replace('.', ''))}
            />
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
              <option value="Độc thânh">Độc thânh</option>
              <option value="Đã kết hôn">Đã kết hôn</option>
              <option value="Li thân">Li thân</option>
            </select>
          </div>
          <div className={cx('container-infor')}>
            <label>Dân tộc</label>
            <input type="text" className={cx('container-infor-ch')} onChange={(e) => setethnic(e.target.value)} />
          </div>
          <div className={cx('container-infor')}>
            <label>Tôn giáo</label>
            <input type="text" className={cx('container-infor-ch')} onChange={(e) => setReligion(e.target.value)} />
          </div>
          <div className={cx('container-infor')}>
            <label>Quốc tịch</label>
            <select className={cx('select-filters-ch')} onChange={(e) => setNationality(e.target.value)}>
              <option value="">Vui lòng chọn</option>
              {listCountry}
            </select>
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
