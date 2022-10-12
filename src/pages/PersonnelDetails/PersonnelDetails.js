import classNames from 'classnames/bind';
import styles from './PersonnelDetails.module.scss';
//
import { apiUrl, cookieValue } from '../../contexts/contexts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

function PersonnelDetails() {
  let navigate = useNavigate();
  const [dataStaff, setdataStaff] = useState([]);
  //nguời phụ thuộc
  const [dataDependentPerson, setdataDependentPerson] = useState([]);
  //reload nguwoif phụ thuộc
  const [ReloadDependentPerson, setReloadDependentPerson] = useState(true);

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
    //lấy dữ liệu
    axios
      .get(apiUrl + '/v1/get-staff/' + url[2], {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        // console.log(req.data.data);
        setdataStaff(req.data.data);
      })
      .catch((error) => {});
    //laasy danh sách người phụ thuộc
    axios
      .get(apiUrl + '/v1/get-by-id-staff-dependent-person/' + url[2], {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        // console.log(req.data.data);
        setdataDependentPerson(req.data.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [ReloadDependentPerson]);

  //=========================================
  const EditPage = () => {
    //lấy id nhân viên trên url
    const url = window.location.pathname.split('/');
    navigate('/personnel-edit/' + url[2]);
  };
  //==========================================
  const PageAddDependentPerson = () => {
    return (e) => {
      //lấy id nhân viên trên url
      const url = window.location.pathname.split('/');
      navigate('/dependent-person-add/' + url[2]);
    };
  };

  //xóa người phụ thuộc
  const delAddDependentPerson = (ID) => {
    return (e) => {
      axios
        .delete(apiUrl + '/v1/del-dependent-person/' + ID, {
          headers: {
            token: cookieValue(),
          },
        })
        .then((req) => {
          // alert('ok');
          setReloadDependentPerson(!ReloadDependentPerson);
          pupsuccess(req.data.message);
        })
        .catch((error) => {
          pupwarn('Thử lại sau');
        });
    };
  };

  //chỉnh sửa
  const editAddDependentPerson = (ID) => {
    return (e) => {
      navigate('/dependent-person-edit/' + ID);
    };
  };
  //==========================================
  //list người phụ thuộc
  let init = 1;
  const listdependentperson = dataDependentPerson.map((data) => {
    return (
      <div className={cx('container4-1')} key={data._id}>
        <div className={cx('title-infor-4')}>
          <div className={cx('title-infor-4-1')}>
            <h4>Thông tin người phụ thuộc {init++}</h4>
            <div className={cx('container1-1-2-2')}>
              <button className={cx('btn-edit')} onClick={editAddDependentPerson(data._id)}>
                Chỉnh Sửa
              </button>
              <button className={cx('btn-delete')} onClick={delAddDependentPerson(data._id)}>
                Xóa
              </button>
            </div>
          </div>
          <ul>
            <li>
              <div className={cx('title')}>Họ và Tên NPT</div>
              <div className={cx('text')}>{data.nameDependentPerson}</div>
            </li>
            <li>
              <div className={cx('title')}>Ngày sinh NPT</div>
              <div className={cx('text')}>{moment(data.DateOfBirthDependentPerson).format('DD/MM/YYYY')}</div>
            </li>
            <li>
              <div className={cx('title')}>Loại giấy tờ NPT</div>
              <div className={cx('text')}>{data.typeCardIDDependentPerson}</div>
            </li>
            <li>
              <div className={cx('title')}>Số CCCD/CMND NPT</div>
              <div className={cx('text')}>{data.IDcard1DependentPerson}</div>
            </li>
            <li>
              <div className={cx('title')}>Ngày cấp NPT</div>
              <div className={cx('text')}>{moment(data.DateRangeIDcard1DependentPerson).format('DD/MM/YYYY')}</div>
            </li>
            <li>
              <div className={cx('title')}>Nơi cấp NPT</div>
              <div className={cx('text')}>{data.IssuedbyIDcard1DependentPerson}</div>
            </li>
            <li>
              <div className={cx('title')}>Mã số thuế NPT</div>
              <div className={cx('text')}>{data.TaxCodeDependentPerson}</div>
            </li>
            <li>
              <div className={cx('title')}>Quan hệ với người nộp</div>
              <div className={cx('text')}>{data.RelationshipWithTaxpayers}</div>
            </li>
            <li>
              <div className={cx('title')}>Số giấy tờ</div>
              <div className={cx('text')}>{data.numberOfPapers}</div>
            </li>
            <li>
              <div className={cx('title')}>Từ tháng</div>
              <div className={cx('text')}>{moment(data.FromMonth).format('DD/MM/YYYY')}</div>
            </li>
            <li>
              <div className={cx('title')}>Tới tháng</div>
              <div className={cx('text')}>{moment(data.ToTheMonth).format('DD/MM/YYYY')}</div>
            </li>
          </ul>
        </div>
      </div>
    );
  });
  //==========================================
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container1')}>
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
              <h4>{dataStaff.nameStaff}</h4>
              <p>{dataStaff.titleStaff}</p>
            </div>
            <div className={cx('container1-1-2-2')}>
              <button className={cx('btn-edit')} onClick={EditPage}>
                Chỉnh Sửa
              </button>
              <button className={cx('btn-delete')}>Xóa</button>
            </div>
          </div>
        </div>
      </div>
      <div className={cx('container2')}>
        <div className={cx('container2-1')}>
          <div className={cx('container2-1-1')}>
            <div className={cx('title-infor')}>
              <h4>Thông tin cá nhân</h4>
            </div>
            <ul>
              <li>
                <div className={cx('title')}>Họ và Tên</div>
                <div className={cx('text')}>{dataStaff.nameStaff}</div>
              </li>
              <li>
                <div className={cx('title')}>Ngày sinh</div>
                <div className={cx('text')}>{moment(dataStaff.DateOfBirth).format('DD/MM/YYYY')}</div>
              </li>
              <li>
                <div className={cx('title')}>Giới tính</div>
                <div className={cx('text')}>{dataStaff.sexStaff}</div>
              </li>
              <li>
                <div className={cx('title')}>loại giấy tờ</div>
                <div className={cx('text')}>{dataStaff.typeCardID}</div>
              </li>
              <li>
                <div className={cx('title')}>Số CCCD/CMND</div>
                <div className={cx('text')}>{dataStaff.IDcard1}</div>
              </li>
              <li>
                <div className={cx('title')}>Ngày cấp</div>
                <div className={cx('text')}>{moment(dataStaff.DateRangeIDcard1).format('DD/MM/YYYY')}</div>
              </li>
              <li>
                <div className={cx('title')}>Nơi cấp</div>
                <div className={cx('text')}>{dataStaff.IssuedbyIDcard1}</div>
              </li>
            </ul>
          </div>
          <div className={cx('container2-1-2')}>
            <div className={cx('title-infor')}>
              <h4>Thông tin công ty</h4>
            </div>
            <ul>
              <li>
                <div className={cx('title')}>Công Ty</div>
                <div className={cx('text')}>{dataStaff.Company}</div>
              </li>
              <li>
                <div className={cx('title')}>Chi nhánh</div>
                <div className={cx('text')}>{dataStaff.companyBranch}</div>
              </li>
              <li>
                <div className={cx('title')}>Phòng ban</div>
                <div className={cx('text')}>{dataStaff.department}</div>
              </li>
              <li>
                <div className={cx('title')}>Nhóm</div>
                <div className={cx('text')}>{dataStaff.group}</div>
              </li>
              <li>
                <div className={cx('title')}>Chức danh</div>
                <div className={cx('text')}>{dataStaff.titleStaff}</div>
              </li>
            </ul>
          </div>
          <div className={cx('container2-1-3')}>
            <div className={cx('title-infor')}>
              <h4>Thông tin công việc và vị trí</h4>
            </div>
            <ul>
              <li>
                <div className={cx('title')}>STT</div>
                <div className={cx('text')}>{dataStaff.numberID}</div>
              </li>
              <li>
                <div className={cx('title')}>Mã nhân viên</div>
                <div className={cx('text')}>{dataStaff.numberNV}</div>
              </li>
              <li>
                <div className={cx('title')}>Ngày thử việc</div>
                <div className={cx('text')}>{moment(dataStaff.DateStartTestWork).format('DD/MM/YYYY')}</div>
              </li>
              <li>
                <div className={cx('title')}>Ngày chính thức</div>
                <div className={cx('text')}>{moment(dataStaff.DateStartWork).format('DD/MM/YYYY')}</div>
              </li>
              <li>
                <div className={cx('title')}>Số ngày được nghỉ phép</div>
                <div className={cx('text')}>{dataStaff.vacationDay}</div>
              </li>
              <li>
                <div className={cx('title')}>Số ngày đã nghỉ phép</div>
                <div className={cx('text')}>{dataStaff.vacationDayUse}</div>
              </li>
              <li>
                <div className={cx('title')}>Ngày nghỉ việc</div>
                <div className={cx('text')}>{moment(dataStaff.RetirementDay).format('DD/MM/YYYY')}</div>
              </li>
              <li>
                <div className={cx('title')}>Loại hợp đồng</div>
                <div className={cx('text')}>{dataStaff.statusWorking}</div>
              </li>
              <li>
                <div className={cx('title')}>trạng thái</div>
                <div className={cx('text')}>{dataStaff.Working}</div>
              </li>
            </ul>
          </div>
          <div className={cx('container2-1-4')}>
            <div className={cx('title-infor')}>
              <h4>Thông tin liên hệ</h4>
            </div>
            <ul>
              <li>
                <div className={cx('title')}>Email</div>
                <div className={cx('text')}>{dataStaff.email}</div>
              </li>
              <li>
                <div className={cx('title')}>SĐT1</div>
                <div className={cx('text')}>{dataStaff.phoneNumber}</div>
              </li>
              <li>
                <div className={cx('title')}>SĐT2</div>
                <div className={cx('text')}>{dataStaff.phoneNumber1}</div>
              </li>
              <li>
                <div className={cx('title')}>Địa chỉ thường trú</div>
                <div className={cx('text')}>{dataStaff.addressResident}</div>
              </li>
              <li>
                <div className={cx('title')}>Địa chỉ tạm trú</div>
                <div className={cx('text')}>{dataStaff.addressstaying}</div>
              </li>
            </ul>
          </div>
          <div className={cx('container2-1-5')}>
            <div className={cx('title-infor')}>
              <h4>Thông tin Ngân hàng Và BHXH</h4>
            </div>
            <ul>
              <li>
                <div className={cx('title')}>Mã số thuế</div>
                <div className={cx('text')}>{dataStaff.TaxCode}</div>
              </li>
              <li>
                <div className={cx('title')}>Mã số BHXH</div>
                <div className={cx('text')}>{dataStaff.CodeBHXH}</div>
              </li>
              <li>
                <div className={cx('title')}>Số tài khoản</div>
                <div className={cx('text')}>{dataStaff.BankNumberAccount}</div>
              </li>
              <li>
                <div className={cx('title')}>Tên tài khoản</div>
                <div className={cx('text')}>{dataStaff.BankNameUserAccount}</div>
              </li>
              <li>
                <div className={cx('title')}>Tên ngân hàng</div>
                <div className={cx('text')}>{dataStaff.BankNameAccount}</div>
              </li>
              <li>
                <div className={cx('title')}>Lương cơ bản</div>
                <div className={cx('text')}>{dataStaff.BasicSalary} VĐN</div>
              </li>
              <li>
                <div className={cx('title')}>Mức đóng BHXH</div>
                <div className={cx('text')}>{dataStaff.PaymentRateBHXH} VĐN</div>
              </li>
              <li>
                <div className={cx('title')}>Ngày báo tăng BHXH</div>
                <div className={cx('text')}>{moment(dataStaff.RisingDayBHXH).format('DD/MM/YYYY')}</div>
              </li>
              <li>
                <div className={cx('title')}>Ngày báo giảm BHXH</div>
                <div className={cx('text')}>{moment(dataStaff.ReducedDayBHXH).format('DD/MM/YYYY')}</div>
              </li>
              <li>
                <div className={cx('title')}>Số người giảm trừ gia cảnh</div>
                <div className={cx('text')}>{dataStaff.familyCircumstances}</div>
              </li>
            </ul>
          </div>
          <div className={cx('container2-1-6')}>
            <div className={cx('title-infor')}>
              <h4>Thông tin thêm</h4>
            </div>
            <ul>
              <li>
                <div className={cx('title')}>Tình trạng hôn nhân</div>
                <div className={cx('text')}>{dataStaff.maritalStatus}</div>
              </li>
              <li>
                <div className={cx('title')}>Dân tộc</div>
                <div className={cx('text')}>{dataStaff.ethnic}</div>
              </li>
              <li>
                <div className={cx('title')}>Tôn giáo</div>
                <div className={cx('text')}>{dataStaff.Religion}</div>
              </li>
              <li>
                <div className={cx('title')}>Quốc tịch</div>
                <div className={cx('text')}>{dataStaff.Nationality}</div>
              </li>
              <li>
                <div className={cx('title')}>Trình độ học vấn</div>
                <div className={cx('text')}>{dataStaff.AcademicLevel}</div>
              </li>
              <li>
                <div className={cx('title')}>Xếp loại</div>
                <div className={cx('text')}>{dataStaff.Classification}</div>
              </li>
              <li>
                <div className={cx('title')}>Nơi đào tạo</div>
                <div className={cx('text')}>{dataStaff.TrainingPlaces}</div>
              </li>
              <li>
                <div className={cx('title')}>Chuyên nghành</div>
                <div className={cx('text')}>{dataStaff.SpecializedTraining}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* ====================================== */}
      <div className={cx('container3')}>
        <div className={cx('container3-1')}>
          <h3>Thông tin người phụ thuộc</h3>
          <button className={cx('button-NPT')} onClick={PageAddDependentPerson()}>
            <AiOutlineUserAdd className={cx('icon')} />
            Thêm người phụ thuộc
          </button>
        </div>
      </div>
      {/* ============================================== */}
      <div className={cx('container4')}>{listdependentperson}</div>
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

export default PersonnelDetails;
