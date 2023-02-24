import classNames from 'classnames/bind';
import styles from './personnel.module.scss';
import Pagination from '@mui/material/Pagination';
import {
  AiOutlineMore,
  // AiOutlineReload,
  // AiOutlineFilter,
  AiOutlineUserAdd,
  AiOutlineCaretUp,
  AiOutlineCaretDown,
} from 'react-icons/ai';
import { useEffect, useState } from 'react';
//
import { apiUrl, cookieValue } from '../../contexts/contexts';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
//menu
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
//dialog
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import Slide from '@mui/material/Slide';
//pup
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Personnel() {
  let navigate = useNavigate();
  const [Staff, setStaff] = useState([]);
  const [page_size, setpage_size] = useState('10');
  const [page, setpage] = useState(1);
  const [countPage, setcountPage] = useState(10);
  const [sort, setsort] = useState('numberID');
  const [sortty, setsortty] = useState(true);
  const [Search, setSearch] = useState('');
  const [TypeSearch, setTypeSearch] = useState('nameStaff');
  const [IDinfor, setIDinfor] = useState('');
  //loading table
  const [ReloadTable, setReloadTable] = useState(true);
  //pup thong bao
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
  //menu nut actions
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (ID) => {
    return (e) => {
      setAnchorEl(e.currentTarget);
      setIDinfor(ID);
    };
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  //dialog xoa
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  //xoa nhan vien
  const personnelDel = () => {
    handleCloseDialog();
    axios
      .delete(apiUrl + '/v1/delete-staff/' + IDinfor, {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        setReloadTable(!ReloadTable);
        pupsuccess(req.data.message);
      })
      .catch((error) => {
        pupwarn(error.response.data.message);
      });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  //chon trang
  const handleChange = (event, value) => {
    setpage(value);
  };

  //sắp sếp table
  const sorttable = (index) => {
    return (e) => {
      switch (index) {
        case 1:
          setsort('numberID');
          setsortty(!sortty);
          break;
        case 2:
          setsort('numberNV');
          setsortty(!sortty);
          break;
        case 3:
          setsort('nameStaff');
          setsortty(!sortty);
          break;
        case 4:
          setsort('IDcard1');
          setsortty(!sortty);
          break;
        case 5:
          setsort('checklistNumber');
          setsortty(!sortty);
          break;
        case 6:
          setsort('group');
          setsortty(!sortty);
          break;
        case 7:
          setsort('department');
          setsortty(!sortty);
          break;
        case 8:
          setsort('companyBranch');
          setsortty(!sortty);
          break;
        case 9:
          setsort('statusWorking');
          setsortty(!sortty);
          break;
        case 10:
          setsort('Working');
          setsortty(!sortty);
          break;
        default:
        // code block
      }
    };
  };

  //chuyen trang edit
  const EditPage = () => {
    navigate('/personnel-edit/' + IDinfor);
  };
  //=================================
  //lấy danh sách nhân viên
  useEffect(() => {
    if (Search === '') {
      axios
        .post(
          apiUrl + '/v1/get-staff-list',
          { page_size: parseInt(page_size), page: page, sort: sort, sortty: sortty ? '1' : '-1' },
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then((res) => {
          setStaff(res.data.dataPost);
          setcountPage(res.data.totalPage);
          // console.log(res.data.dataPost);
          // console.log(res.data.dataPost[0]);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    } else {
      axios
        .post(
          apiUrl + '/v1/search-staff-name',
          {
            keySearch: TypeSearch,
            valueSearch: TypeSearch === 'numberID' ? parseInt(Search) : Search,
            sort: sort,
            sortty: sortty ? '1' : '-1',
          },
          {
            headers: {
              token: cookieValue(),
            },
          },
        )
        .then((res) => {
          // console.log(req);
          setStaff(res.data.data);
          setcountPage(res.data.totalPage);
        })
        .catch((error) => {
          setStaff([]);
        });
    }
  }, [page_size, page, sort, sortty, Search, TypeSearch, ReloadTable]);
  //==========================================
  //chuyển trang sang chi tiết nhân viên
  const nextDetailPersonnel = (ID) => {
    return (e) => {
      // navigate('/personnel-details/' + ID);
      window.open('/personnel-details/' + ID);
    };
  };

  //tạo ra table
  const listviewStaff = Staff.map((data) => {
    return (
      <tr key={data._id}>
        <td className={cx('click-td')} onClick={nextDetailPersonnel(data._id)}>
          {data.numberID}
        </td>
        <td className={cx('click-td')} onClick={nextDetailPersonnel(data._id)}>
          {data.numberNV}
        </td>
        <td className={cx('click-td')} onClick={nextDetailPersonnel(data._id)}>
          {data.Company}
        </td>
        <td className={cx('click-td')} onClick={nextDetailPersonnel(data._id)}>
          {data.nameStaff}
        </td>
        <td className={cx('click-td')}>{data.IDcard1}</td>
        {/* <td className={cx('click-td')}>{data.jobPosition}</td> */}
        <td>{data.checklistNumber}/7</td>
        <td className={cx('click-td')}>{data.group}</td>
        <td className={cx('click-td')}>{data.department}</td>
        <td className={cx('click-td')}>{data.companyBranch}</td>
        <td className={cx('table-hd')}>
          {data.statusWorking === 'HDLD' && <span className={cx('ct')}>{data.statusWorking}</span>}
          {data.statusWorking === 'HDDV' && <span className={cx('ct')}>{data.statusWorking}</span>}
          {data.statusWorking === 'HDTV' && <span className={cx('thuv')}>{data.statusWorking}</span>}
          {data.statusWorking === 'Thôi việc' && <span className={cx('thoiv')}>{data.statusWorking}</span>}
          {/* <span className={cx('ct')}>{data.statusWorking}</span> */}
        </td>
        <td className={cx('table-tt')}>
          {data.Working === 'Đang làm' && <span className={cx('dl')}>Đang làm</span>}
          {data.Working === 'Thôi việc' && <span className={cx('nl')}>Đã nghỉ</span>}
          {data.Working === 'Đang tuyển' && <span className={cx('dtd')}>Đang tuyển</span>}
          {data.Working === 'Thai sản' && <span className={cx('ts')}>Thai sản</span>}
        </td>
        <td className={cx('acctions')}>
          <AiOutlineMore className={cx('icon')} onClick={handleClick(data._id)} />
        </td>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleCloseMenu}
          onClick={handleCloseMenu}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 0px 0.3px rgba(0,0,0,0.32))',
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={EditPage}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            Cập nhật
          </MenuItem>
          <MenuItem onClick={handleClickOpen}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            Xóa
          </MenuItem>
        </Menu>
      </tr>
    );
  });

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        {/* <div className={cx('container-filters-main')}>
          <label>Bộ lọc</label>
          <div className={cx('container-filters')}>
            <div className={cx('select-filters')}>
              <label>Nhóm</label>
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
              <label>Hợp đồng</label>
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
              <label>Trạng thái</label>
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
        </div> */}
        <div className={cx('container-table')}>
          <div className={cx('container-show-main')}>
            <div className={cx('container-show')}>
              <label>Hiển thị</label>
              <select onChange={(e) => setpage_size(e.target.value)} className={cx('element-select')}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="60">60</option>
                <option value="70">70</option>
                <option value="80">80</option>
                <option value="90">90</option>
                <option value="100">100</option>
              </select>
              <label>mục</label>
            </div>
            <div className={cx('container-search')}>
              <select className={cx('element-select')} onChange={(e) => setTypeSearch(e.target.value)}>
                <option value="nameStaff">Tìm theo họ và tên</option>
                <option value="numberID">Tìm theo STT</option>
                <option value="numberNV">Tìm theo MNV</option>
              </select>
              <input
                className={cx('input-search')}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
              />
              <Link to="/personnel-add/" className={cx('Link')}>
                <button>
                  <AiOutlineUserAdd className={cx('icon')} />
                  Thêm nhân viên
                </button>
              </Link>
            </div>
          </div>
          {/*=====*/}
          <div className={cx('container-table-chi')}>
            {Staff.length > 0 ? (
              <table className={cx('table-personnel')}>
                <tbody>
                  <tr>
                    <th onClick={sorttable(1)} className={cx('')}>
                      {sort === 'numberID' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          TTS
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'numberID' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          0 TTS
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'numberID' && 'STT'}
                    </th>
                    <th onClick={sorttable(2)}>
                      {sort === 'numberNV' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          MNV
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'numberNV' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          MNV
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'numberNV' && 'MNV'}
                    </th>
                    <th onClick={sorttable(5)}>
                      {sort === 'Company' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          Công ty
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'Company' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          Công ty
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'Company' && 'Công Ty'}
                    </th>
                    <th onClick={sorttable(3)}>
                      {sort === 'nameStaff' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          Họ và Tên
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'nameStaff' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          Họ và Tên
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'nameStaff' && 'Họ và Tên'}
                    </th>
                    <th onClick={sorttable(4)}>
                      {sort === 'IDcard1' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          CCCD
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'IDcard1' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          CCCD
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'IDcard1' && 'CCCD'}
                    </th>
                    {/* <th>Hồ sơ</th> */}
                    <th onClick={sorttable(5)}>
                      {sort === 'checklistNumber' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          Hồ sơ
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'checklistNumber' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          Hồ sơ
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'checklistNumber' && 'Hồ sơ'}
                    </th>
                    <th onClick={sorttable(6)}>
                      {sort === 'group' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          Nhóm
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'group' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          Nhóm
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'group' && 'Nhóm'}
                    </th>
                    <th onClick={sorttable(7)}>
                      {sort === 'department' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          Phòng ban
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'department' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          Phòng ban
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'department' && 'Phòng ban'}
                    </th>
                    <th onClick={sorttable(8)}>
                      {sort === 'companyBranch' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          Chi nhánh
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'companyBranch' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          Chi nhánh
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'companyBranch' && 'Chi nhánh'}
                    </th>
                    <th onClick={sorttable(9)}>
                      {sort === 'statusWorking' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          Hợp đồng
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'statusWorking' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          Hợp đồng
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'statusWorking' && 'Hợp đồng'}
                    </th>
                    <th onClick={sorttable(10)}>
                      {sort === 'Working' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          Trạng thái
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'Working' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          Trạng thái
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'Working' && 'Trạng thái'}
                    </th>
                    <th>ACTIONS</th>
                  </tr>
                  {listviewStaff}
                </tbody>
              </table>
            ) : (
              <h2 className={cx('no-data')}>Không có dữ liệu</h2>
            )}
          </div>
          <div className={cx('pagination')}>
            <Pagination count={countPage} page={page} onChange={handleChange} size="large" color="primary" />
          </div>
        </div>
      </div>
      {/* dialog Xoa */}
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Cảnh báo'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">Chắc chắn muốn xóa nhân viên này ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Không</Button>
          <Button onClick={personnelDel}>Có</Button>
        </DialogActions>
      </Dialog>
      {/* thong bao */}
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

export default Personnel;
