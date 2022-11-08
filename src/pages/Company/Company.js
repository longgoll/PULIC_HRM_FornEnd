import classNames from 'classnames/bind';
import styles from './Company.module.scss';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
//
import { apiUrl, cookieValue } from '../../contexts/contexts';

const cx = classNames.bind(styles);

const Company = () => {
  //du lieuj main 1
  const [CompanyOption, setCompanyOption] = useState([]);
  const [BranchOption, setBranchOption] = useState([]);
  const [DepartmentOption, setDepartmentOption] = useState([]);
  //dữ liệu từ input
  const [NameBranch, setNameBranch] = useState('');
  const [NameDepartment, setNameDepartment] = useState('');
  const [NameGroup, setNameGroup] = useState('');
  const [getIDCompany, setgetIDCompany] = useState('');
  const [getIDBranch, setgetIDBranch] = useState('');
  const [getIDDepartment, setgetIDDepartment] = useState('');
  //du lieu main 2
  const [inputtitleStaff, setinputtitleStaff] = useState('');
  const [dataTitleStaff, setdataTitleStaff] = useState([]);
  const [reloadTableTitleStaff, setreloadTableTitleStaff] = useState(true);
  //dữ liệu main 3
  const [Company, setCompany] = useState([]);
  const [CompanyBranch, setCompanyBranch] = useState([]);
  const [Department, setDepartment] = useState([]);
  const [Group, setGroup] = useState([]);
  //các biến đổi
  const [changeCreateCt, setchangeCreateCt] = useState();
  const [changeUpdateCt, setchangeUpdateCt] = useState();
  const [changeListCompany, setchangeListCompany] = useState(1);
  //update
  const [idUpdate, setidUpdate] = useState('');
  const [lowName, setlowName] = useState('');
  const [newName, setnewName] = useState('');
  //trạng thái thay đổi table
  //loading lại sơ đồ khi thêm
  const [changeSDAdd, setchangeSDAdd] = useState(true);
  //pup thong bao
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
  //role
  const [role, setrole] = useState('');
  useEffect(() => {
    axios
      .get(apiUrl + '/v1/role', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        // console.log(req);
        setrole(req.data.role);
      });
  }, []);
  //================================
  //chọn tạo mới các thông tin cty
  const createCT = (num) => {
    return (e) => {
      if (changeCreateCt === num) {
        setchangeCreateCt(0);
        //chả các trường về null tránh lõi
        resetInput();
      } else {
        setchangeCreateCt(num);
        //chả các trường về null tránh lõi
        resetInput();
      }
    };
  };
  //chọn cập nhật các thông tin cty
  const UpdateCT = (num, ID, lowName) => {
    return (e) => {
      setidUpdate(ID);
      setlowName(lowName);
      if (changeUpdateCt === num) {
        setchangeUpdateCt(0);
        //chả các trường về null tránh lõi
      } else {
        setchangeUpdateCt(num);
        //chả các trường về null tránh lõi
      }
    };
  };
  //chả các trường về null tránh lõi
  const resetInput = () => {
    setNameBranch('');
    setNameDepartment('');
    setNameGroup('');
    setgetIDCompany('');
    setgetIDBranch('');
    setgetIDDepartment('');
  };
  //=========
  //lấy danh sách cty
  useEffect(() => {
    //lấy danh sách cty
    axios
      .get(apiUrl + '/v1/get-all-company', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        setCompany(res.data.data);
        setCompanyOption(res.data.data);
      })
      .catch((error) => {
        // console.log(error);
      });
    //lấy danh sach phòng ban
    axios
      .post(
        apiUrl + '/v1/get-all-branch',
        {},
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
    //lấy danh sach phòng
    axios
      .post(
        apiUrl + '/v1//get-all-department',
        {},
        {
          headers: {
            token: cookieValue(),
          },
        },
      )
      .then((req) => {
        setDepartmentOption(req.data.data);
        // console.log(req.data.data);
      })
      .catch((error) => {});
  }, [changeSDAdd]);

  //======================
  //get danh sách chi nhánh
  const getBranch = (ChiCompanyID) => {
    return (e) => {
      axios
        .post(
          apiUrl + '/v1/get-branch-byChi/',
          {
            ChiCompany: ChiCompanyID,
          },
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then((req) => {
          setCompanyBranch(req.data.data);
          setchangeListCompany(2);
          // console.log(req.data.data);
        });
    };
  };

  //get danh sách phòng ban
  const getDepartment = (ChiCompanyID, ChiCompanyBranch) => {
    return (e) => {
      axios
        .post(
          apiUrl + '/v1/get-department-bychi/',
          {
            ChiCompany: ChiCompanyID,
            ChiCompanyBranch: ChiCompanyBranch,
          },
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then((req) => {
          setDepartment(req.data.data);
          setchangeListCompany(3);
          // console.log(req.data.data);
        });
    };
  };

  //get group
  const getGroup = (ChiCompanyID, ChiCompanyBranch, ChiDepartment) => {
    return (e) => {
      axios
        .post(
          apiUrl + '/v1/get-group-bychir/',
          {
            ChiCompany: ChiCompanyID,
            ChiCompanyBranch: ChiCompanyBranch,
            ChiDepartment: ChiDepartment,
          },
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then((req) => {
          setGroup(req.data.data);
          setchangeListCompany(4);
          // console.log(req.data.data);
        });
    };
  };
  //===============================================
  //xóa chi nhánh
  const DelCompanyBranch = (ID) => {
    return (e) => {
      axios
        .delete(apiUrl + '/v1/delete-branch/' + ID, {
          headers: {
            token: cookieValue(),
          },
        })
        .then((req) => {
          pupsuccess(req.data.message);
          setchangeSDAdd(!changeSDAdd);
          // setchangeListCompany(1);
        })
        .catch((error) => {
          // console.log(error);
          pupwarn(error.response.data.message);
          setchangeSDAdd(!changeSDAdd);
        });
    };
  };
  //xóa phòng bàn
  const DelDepartmen = (ID) => {
    return (e) => {
      axios
        .delete(apiUrl + '/v1/delete-department/' + ID, {
          headers: {
            token: cookieValue(),
          },
        })
        .then((req) => {
          pupsuccess(req.data.message);
          setchangeSDAdd(!changeSDAdd);
        })
        .catch((error) => {
          // console.log(error);
          pupwarn(error.response.data.message);
          setchangeSDAdd(!changeSDAdd);
        });
    };
  };
  //xóa nhóm
  const DelGroup = (ID) => {
    return (e) => {
      axios
        .delete(apiUrl + '/v1/delete-group/' + ID, {
          headers: {
            token: cookieValue(),
          },
        })
        .then((req) => {
          pupsuccess(req.data.message);
          setchangeSDAdd(!changeSDAdd);
        })
        .catch((error) => {
          // console.log(error);
          pupwarn(error.response.data.message);
          setchangeSDAdd(!changeSDAdd);
        });
    };
  };
  //===============================================

  //lấy ra danh sách cty
  const listCompany = Company.map((data) => {
    return (
      <div key={data._id} className={cx('title-list')}>
        <div className={cx('list')} onClick={getBranch(data.Company)}>
          <div className={cx('dots')}></div>
          <h3>{data.Company}</h3>
          <p>Công Ty</p>
          {/* {listCompanyBranch} */}
        </div>
        <div>
          <button className={cx('btn-edit')} onClick={UpdateCT(1, data._id, data.Company)}>
            Chỉnh Sửa
          </button>
          {/* <button className={cx('btn-delete')}>xóa</button> */}
        </div>
      </div>
    );
  });

  //lay danh sach chi nhanh
  const listCompanyBranch = CompanyBranch.map((data) => {
    return (
      <div key={data._id} className={cx('title-list')}>
        <div className={cx('list2')} onClick={getDepartment(data.ChiCompany, data.companyBranch)}>
          <div className={cx('dots')}></div>
          <h4>{data.companyBranch}</h4>
          <p>Chi nhánh</p>
        </div>
        <div>
          <button className={cx('btn-edit')} onClick={UpdateCT(2, data._id, data.companyBranch)}>
            Chỉnh Sửa
          </button>
          <button className={cx('btn-delete')} onClick={DelCompanyBranch(data._id)}>
            xóa
          </button>
        </div>
      </div>
    );
  });

  //lấy danh sách phòng ban
  const listDepartment = Department.map((data) => {
    return (
      <div key={data._id} className={cx('title-list')}>
        <div className={cx('list2')} onClick={getGroup(data.ChiCompany, data.ChiCompanyBranch, data.department)}>
          <div className={cx('dots')}></div>
          <h4>{data.department}</h4>
          <p>Phòng ban</p>
        </div>
        <div>
          <button className={cx('btn-edit')} onClick={UpdateCT(3, data._id, data.department)}>
            Chỉnh Sửa
          </button>
          <button className={cx('btn-delete')} onClick={DelDepartmen(data._id)}>
            xóa
          </button>
        </div>
      </div>
    );
  });

  //laays nhom
  const listGroup = Group.map((data) => {
    return (
      <div key={data._id} className={cx('title-list')}>
        <div className={cx('list2')}>
          <div className={cx('dots')}></div>
          <h4>{data.group}</h4>
          <p>Nhóm</p>
        </div>
        <div>
          <button className={cx('btn-edit')} onClick={UpdateCT(4, data._id, data.group)}>
            Chỉnh Sửa
          </button>
          <button className={cx('btn-delete')} onClick={DelGroup(data._id)}>
            xóa
          </button>
        </div>
      </div>
    );
  });
  //==============
  const test = () => {
    return (e) => {
      if (changeListCompany === 1) {
        setchangeListCompany(1);
      } else {
        setchangeListCompany(changeListCompany - 1);
      }
    };
  };
  //==============
  //main 2
  //danh sách select công ty
  const selectCompany = CompanyOption.map((data) => {
    return (
      <select key={data._id} className={cx('select-filters-chi')} onChange={(e) => setgetIDCompany(e.target.value)}>
        <option value="">Vui lòng chọn Cty</option>
        <option value={data.Company}>{data.Company}</option>
      </select>
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
  //=========================
  //thêm chi nhánh
  const createBranch = () => {
    return (e) => {
      axios
        .post(
          apiUrl + '/v1/create-branch',
          {
            nameBranch: NameBranch,
            ChiCompany: getIDCompany,
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
          setchangeSDAdd(!changeSDAdd);
          setchangeCreateCt(1);
          setNameBranch('');
          setchangeListCompany(1);
        })
        .catch((error) => {
          pupwarn(error.response.data.message);
          // console.log(error.response.data.message);
        });
    };
  };
  //thêm phòng ban
  const createDepartment = () => {
    return (e) => {
      axios
        .post(
          apiUrl + '/v1/create-department',
          {
            nameDepartment: NameDepartment,
            ChiCompany: getIDCompany,
            ChiCompanyBranch: getIDBranch,
          },
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then((req) => {
          pupsuccess(req.data.message);
          setchangeSDAdd(!changeSDAdd);
          setchangeCreateCt(1);
          setNameDepartment('');
          setchangeListCompany(1);
        })
        .catch((error) => {
          // console.log(error);
          pupwarn(error.response.data.message);
        });
    };
  };
  //thêm nhóm
  const createGroup = () => {
    return (e) => {
      axios
        .post(
          apiUrl + '/v1/create-group',
          {
            nameGroup: NameGroup,
            ChiCompany: getIDCompany,
            ChiCompanyBranch: getIDBranch,
            ChiDepartment: getIDDepartment,
          },
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then((req) => {
          // console.log(req);
          pupsuccess(req.data.message);
          setchangeSDAdd(!changeSDAdd);
          setchangeCreateCt(1);
          setNameGroup('');
          setchangeListCompany(1);
        })
        .catch((error) => {
          // console.log(error);
          pupwarn(error.response.data.message);
        });
    };
  };
  //============================
  //đọc tất cả chức danh
  useEffect(() => {
    axios
      .get(apiUrl + '/v1/get-all-title-staff', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        setdataTitleStaff(req.data.data);
        // console.log(req.data.data);
      })
      .catch((error) => {});
  }, [reloadTableTitleStaff]);
  //tạo chức danh
  const createTitleStaff = () => {
    return (e) => {
      axios
        .post(
          apiUrl + '/v1/create-title-staff',
          { Title: inputtitleStaff },
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then((res) => {
          // console.log(res);
          pupsuccess(res.data.message);
          setreloadTableTitleStaff(!reloadTableTitleStaff);
        })
        .catch((error) => {
          // console.log(error);
          pupwarn(error.response.data.message);
        });
    };
  };

  //xóa chức danh
  const delTitleStaff = (ID) => {
    return (e) => {
      axios
        .delete(apiUrl + '/v1/del-title-staff/' + ID, {
          headers: {
            token: cookieValue(),
          },
        })
        .then((res) => {
          // console.log(res);
          pupsuccess(res.data.message);
          setreloadTableTitleStaff(!reloadTableTitleStaff);
        })
        .catch((error) => {
          // console.log(error);
          pupwarn(error.response.data.message);
        });
    };
  };

  let init = 1;
  //table chức danh
  const tableTitleStaff = dataTitleStaff.map((data) => {
    return (
      <tr key={data._id}>
        <td>{init++}</td>
        <td>{data.Title}</td>
        <td>
          <button className={cx('btn-del')} onClick={delTitleStaff(data._id)}>
            Xóa
          </button>
          {/* <button className={cx('btn-cn')}>Cập nhật</button> */}
        </td>
      </tr>
    );
  });

  //===================================
  const arryURLUpdate = ['', 'updata-company', 'updata-branch', 'updata-department', 'updata-group'];
  // cập nhật
  const Updata = (num) => {
    return (e) => {
      switch (num) {
        case 1:
          axios
            .put(
              apiUrl + '/v1/' + arryURLUpdate[num] + '/' + idUpdate,
              {
                oldCompany: lowName,
                nameCompany: newName,
              },
              {
                headers: {
                  token: cookieValue(),
                },
              },
            )
            .then((req) => {
              // console.log(req);
              pupsuccess(req.data.message);
              setchangeUpdateCt(0);
              setchangeListCompany(1);
            })
            .catch((error) => {
              // console.log(error);
              pupwarn(error.response.data.message);
            });
          break;
        case 2:
          axios
            .put(
              apiUrl + '/v1/' + arryURLUpdate[num] + '/' + idUpdate,
              {
                oldBranch: lowName,
                nameBranch: newName,
              },
              {
                headers: {
                  token: cookieValue(),
                },
              },
            )
            .then((req) => {
              // console.log(req);
              pupsuccess(req.data.message);
              setchangeUpdateCt(0);
              setchangeListCompany(1);
            })
            .catch((error) => {
              // console.log(error);
              pupwarn(error.response.data.message);
            });
          break;
        case 3:
          axios
            .put(
              apiUrl + '/v1/' + arryURLUpdate[num] + '/' + idUpdate,
              {
                oldDepartment: lowName,
                nameDepartment: newName,
              },
              {
                headers: {
                  token: cookieValue(),
                },
              },
            )
            .then((req) => {
              // console.log(req);
              pupsuccess(req.data.message);
              setchangeUpdateCt(0);
              setchangeListCompany(1);
            })
            .catch((error) => {
              // console.log(error);
              pupwarn(error.response.data.message);
            });
          break;
        case 4:
          axios
            .put(
              apiUrl + '/v1/' + arryURLUpdate[num] + '/' + idUpdate,
              {
                oldGroup: lowName,
                nameGroup: newName,
              },
              {
                headers: {
                  token: cookieValue(),
                },
              },
            )
            .then((req) => {
              // console.log(req);
              pupsuccess(req.data.message);
              setchangeUpdateCt(0);
              setchangeListCompany(1);
            })
            .catch((error) => {
              // console.log(error);
              pupwarn(error.response.data.message);
            });
          break;
        default:
          break;
      }
    };
  };

  return (
    <div className={cx('wrapper')}>
      {/* <div className={cx('main1')}>
        <div className={cx('content')}>
          <label>Bộ lọc</label>
          <div className={cx('container-filters')}>
            <div className={cx('select-filters')}>
              <label>Công ty</label>
              <select className={cx('select-filters-chi')}>
                <option value="0">10</option>
                <option value="1">20</option>
                <option value="2">30</option>
                <option value="3">40</option>
                <option value="4">50</option>
                <option value="5">60</option>
                <option value="6">70</option>
                <option value="7">80</option>
                <option value="8">90</option>
                <option value="9">100</option>
              </select>
            </div>
            <div className={cx('select-filters')}>
              <label>Chi nhánh</label>
              <select className={cx('select-filters-chi')}>
                <option value="0">10</option>
                <option value="1">20</option>
                <option value="2">30</option>
                <option value="3">40</option>
                <option value="4">50</option>
                <option value="5">60</option>
                <option value="6">70</option>
                <option value="7">80</option>
                <option value="8">90</option>
                <option value="9">100</option>
              </select>
            </div>
            <div className={cx('select-filters')}>
              <label>Phòng ban</label>
              <select className={cx('select-filters-chi')}>
                <option value="0">10</option>
                <option value="1">20</option>
                <option value="2">30</option>
                <option value="3">40</option>
                <option value="4">50</option>
                <option value="5">60</option>
                <option value="6">70</option>
                <option value="7">80</option>
                <option value="8">90</option>
                <option value="9">100</option>
              </select>
            </div>
          </div>
          <div className={cx('container-btn')}>
            <button className={cx('btn1')}>
              <AiOutlineReload className={cx('icon')} />
              Mặc định
            </button>
            <button className={cx('btn2')}>
              <AiOutlineFilter className={cx('icon')} />
              Tìm kiếm
            </button>
          </div>
        </div>
      </div> */}
      {/* ========== */}
      {role === 'Admin' ? (
        <>
          <div className={cx('main2')}>
            <div className={cx('content')}>
              <h3>Thêm mới</h3>
              <div className={cx('container-btn-2')}>
                <button onClick={createCT(1)} className={cx('btn-create-ct')}>
                  Chi nhánh
                </button>
                <button onClick={createCT(2)} className={cx('btn-create-ct')}>
                  Phòng ban
                </button>
                <button onClick={createCT(3)} className={cx('btn-create-ct')}>
                  Nhóm
                </button>
              </div>
              {changeCreateCt === 1 && (
                <div>
                  <h3>Thêm chi nhánh</h3>
                  <div className={cx('container-infor')}>
                    <div className={cx('container-filters')}>
                      <div className={cx('select-filters')}>
                        <label>Cty thêm chi nhánh</label>
                        {selectCompany}
                      </div>
                      <div className={cx('container-infor')}>
                        <label>Tên chi nhánh mới</label>
                        <input
                          type="text"
                          className={cx('container-infor-ch')}
                          onChange={(e) => setNameBranch(e.target.value)}
                          value={NameBranch}
                        />
                      </div>
                    </div>
                    <div>
                      <button className={cx('btn')} onClick={createBranch()}>
                        Thêm
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {changeCreateCt === 2 && (
                <div>
                  <h3>Thêm phòng ban</h3>
                  <div className={cx('container-filters')}>
                    <div className={cx('select-filters')}>
                      <label>Cty thêm chi nhánh</label>
                      {selectCompany}
                    </div>
                    <div className={cx('select-filters')}>
                      <label>Chinh nhánh thêm phòng ban</label>
                      <select className={cx('select-filters-chi')} onChange={(e) => setgetIDBranch(e.target.value)}>
                        <option value="">Vui lòng chọn chi nhánh</option>
                        {selectBranch}
                      </select>
                    </div>
                    <div className={cx('container-infor')}>
                      <label>Tên phòng ban mới</label>
                      <input
                        type="text"
                        className={cx('container-infor-ch')}
                        onChange={(e) => setNameDepartment(e.target.value)}
                        value={NameDepartment}
                      />
                    </div>
                  </div>
                  <div>
                    <button className={cx('btn')} onClick={createDepartment()}>
                      Thêm
                    </button>
                  </div>
                </div>
              )}
              {changeCreateCt === 3 && (
                <div>
                  <h3>Thêm nhóm</h3>
                  <div className={cx('container-filters')}>
                    <div className={cx('select-filters')}>
                      <label>Cty thêm chi nhánh</label>
                      {selectCompany}
                    </div>
                    <div className={cx('select-filters')}>
                      <label>Chinh nhánh thêm nhóm</label>
                      <select className={cx('select-filters-chi')} onChange={(e) => setgetIDBranch(e.target.value)}>
                        <option value="">Vui lòng chọn chi nhánh</option>
                        {selectBranch}
                      </select>
                    </div>
                    <div className={cx('select-filters')}>
                      <label>Phòng ban thêm nhóm</label>
                      <select className={cx('select-filters-chi')} onChange={(e) => setgetIDDepartment(e.target.value)}>
                        <option value="">Vui lòng chọn phòng ban</option>
                        {selectDepartment}
                      </select>
                    </div>
                    <div className={cx('container-infor')}>
                      <label>Tên nhóm mới</label>
                      <input
                        type="text"
                        className={cx('container-infor-ch')}
                        onChange={(e) => setNameGroup(e.target.value)}
                        value={NameGroup}
                      />
                    </div>
                  </div>
                  <div>
                    <button className={cx('btn')} onClick={createGroup()}>
                      Thêm
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* ========== */}
          <div className={cx('main2')}>
            <div className={cx('content')}>
              <h3>Thêm mới chức danh</h3>
              <div className={cx('content-01')}>
                <div className={cx('container-infor')}>
                  <label>Chức danh</label>
                  <input
                    type="text"
                    className={cx('container-infor-ch')}
                    onChange={(e) => setinputtitleStaff(e.target.value)}
                  />
                </div>
                <button className={cx('btn-create-ct')} onClick={createTitleStaff()}>
                  Thêm mới
                </button>
              </div>
              <div className={cx('content-02')}>
                <table>
                  <tbody>
                    <tr>
                      <th>STT</th>
                      <th>Chức danh</th>
                      <th>Tương tác</th>
                    </tr>
                    {tableTitleStaff}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* ========== */}
          <div className={cx('main3')}>
            <div className={cx('content')}>
              <div className={cx('container-title-company')}>
                {changeListCompany !== 1 && (
                  <button onClick={test()}>
                    <AiOutlineArrowLeft className={cx('icon')} />
                  </button>
                )}

                <h2>Sơ đồ công ty</h2>
              </div>
              {/* ======= */}
              {/* khong co dữ liệu */}
              {changeListCompany === 1 && listCompany.length === 0 && <div>Không có dữ liệu</div>}
              {/* khong co dữ liệu */}
              {changeListCompany === 1 && listCompany.length !== 0 && listCompany}
              {/* ======= */}
              {/* có dữ liệu */}
              {changeListCompany === 2 && listCompany.length === 0 && <div>Không có dữ liệu</div>}
              {/* khong co dữ liệu */}
              {changeListCompany === 2 && listCompany.length !== 0 && listCompanyBranch}
              {/* ======== */}
              {/* có dữ liệu */}
              {changeListCompany === 3 && listDepartment.length === 0 && <div>Không có dữ liệu</div>}
              {/* khong co dữ liệu */}
              {changeListCompany === 3 && listDepartment.length !== 0 && listDepartment}
              {/* ======== */}
              {/* khong co dữ liệu */}
              {changeListCompany === 4 && listGroup.length === 0 && <div>Không có dữ liệu</div>}
              {/* có dữ liệu */}
              {changeListCompany === 4 && listGroup.length !== 0 && listGroup}
            </div>
            {changeUpdateCt === 1 && (
              <div className={cx('container-update')}>
                <h3>Cập nhật cty</h3>
                <div className={cx('container-infor')}>
                  <div className={cx('container-filters')}>
                    <div className={cx('container-infor')}>
                      <label>Tên công ty mới</label>
                      <input
                        type="text"
                        className={cx('container-infor-ch')}
                        onChange={(e) => setnewName(e.target.value)}
                        value={newName}
                      />
                    </div>
                  </div>
                  <div>
                    <button className={cx('btn')} onClick={Updata(1)}>
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
            )}
            {changeUpdateCt === 2 && (
              <div className={cx('container-update')}>
                <h3>Cập nhật cty</h3>
                <div className={cx('container-infor')}>
                  <div className={cx('container-filters')}>
                    <div className={cx('container-infor')}>
                      <label>Tên chi nhánh mới</label>
                      <input
                        type="text"
                        className={cx('container-infor-ch')}
                        onChange={(e) => setnewName(e.target.value)}
                        value={newName}
                      />
                    </div>
                  </div>
                  <div>
                    <button className={cx('btn')} onClick={Updata(2)}>
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
            )}
            {changeUpdateCt === 3 && (
              <div className={cx('container-update')}>
                <h3>Cập nhật cty</h3>
                <div className={cx('container-infor')}>
                  <div className={cx('container-filters')}>
                    <div className={cx('container-infor')}>
                      <label>Tên phòng ban mới</label>
                      <input
                        type="text"
                        className={cx('container-infor-ch')}
                        onChange={(e) => setnewName(e.target.value)}
                        value={newName}
                      />
                    </div>
                  </div>
                  <div>
                    <button className={cx('btn')} onClick={Updata(3)}>
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
            )}
            {changeUpdateCt === 4 && (
              <div className={cx('container-update')}>
                <h3>Cập nhật cty</h3>
                <div className={cx('container-infor')}>
                  <div className={cx('container-filters')}>
                    <div className={cx('container-infor')}>
                      <label>Tên nhóm mới</label>
                      <input
                        type="text"
                        className={cx('container-infor-ch')}
                        onChange={(e) => setnewName(e.target.value)}
                        value={newName}
                      />
                    </div>
                  </div>
                  <div>
                    <button className={cx('btn')} onClick={Updata(4)}>
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        //==================================================
        //==================================================
        <>
          <div className={cx('main3')}>
            <div className={cx('content')}>
              <div className={cx('container-title-company')}>
                {changeListCompany !== 1 && (
                  <button onClick={test()}>
                    <AiOutlineArrowLeft className={cx('icon')} />
                  </button>
                )}

                <h2>Sơ đồ công ty</h2>
              </div>
              {/* ======= */}
              {/* khong co dữ liệu */}
              {changeListCompany === 1 && listCompany.length === 0 && <div>Không có dữ liệu</div>}
              {/* khong co dữ liệu */}
              {changeListCompany === 1 && listCompany.length !== 0 && listCompany}
              {/* ======= */}
              {/* có dữ liệu */}
              {changeListCompany === 2 && listCompany.length === 0 && <div>Không có dữ liệu</div>}
              {/* khong co dữ liệu */}
              {changeListCompany === 2 && listCompany.length !== 0 && listCompanyBranch}
              {/* ======== */}
              {/* có dữ liệu */}
              {changeListCompany === 3 && listDepartment.length === 0 && <div>Không có dữ liệu</div>}
              {/* khong co dữ liệu */}
              {changeListCompany === 3 && listDepartment.length !== 0 && listDepartment}
              {/* ======== */}
              {/* khong co dữ liệu */}
              {changeListCompany === 4 && listGroup.length === 0 && <div>Không có dữ liệu</div>}
              {/* có dữ liệu */}
              {changeListCompany === 4 && listGroup.length !== 0 && listGroup}
            </div>
          </div>
        </>
      )}

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

export default Company;
