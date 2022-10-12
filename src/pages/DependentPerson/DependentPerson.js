import classNames from 'classnames/bind';
import styles from './DependentPerson.module.scss';
import Pagination from '@mui/material/Pagination';
import { AiOutlineMore, AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai';
import { useEffect, useState } from 'react';
//
import { apiUrl, cookieValue } from '../../contexts/contexts';
import { useNavigate } from 'react-router-dom';
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
import moment from 'moment';

const cx = classNames.bind(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DependentPerson = () => {
  let navigate = useNavigate();
  const [Staff, setStaff] = useState([]);
  const [page_size, setpage_size] = useState('10');
  const [page, setpage] = useState(1);
  const [countPage, setcountPage] = useState(10);
  const [sort, setsort] = useState('numberID');
  const [sortty, setsortty] = useState(true);
  const [Search, setSearch] = useState('');
  const [TypeSearch, setTypeSearch] = useState('nameStaff');
  const [IDDependentPerson, setIDDependentPerson] = useState('');

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
  //menu nut actions
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (ID) => {
    return (e) => {
      setAnchorEl(e.currentTarget);
      setIDDependentPerson(ID);
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
      .delete(apiUrl + '/v1/del-dependent-person/' + IDDependentPerson, {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        // console.log(req);
        setReloadTable(!ReloadTable);
        pupsuccess(req.data.message);
      })
      .catch((error) => {
        // console.log(error);
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
        case 0:
          setsort('numberNV');
          setsortty(!sortty);
          break;
        case 1:
          setsort('nameStaff');
          setsortty(!sortty);
          break;
        case 2:
          setsort('nameDependentPerson');
          setsortty(!sortty);
          break;
        case 3:
          setsort('IDcard1DependentPerson');
          setsortty(!sortty);
          break;
        case 4:
          setsort('RelationshipWithTaxpayers');
          setsortty(!sortty);
          break;
        case 5:
          setsort('numberOfPapers');
          setsortty(!sortty);
          break;
        case 6:
          setsort('FromMonth');
          setsortty(!sortty);
          break;
        case 7:
          setsort('ToTheMonth');
          setsortty(!sortty);
          break;
        default:
        // code block
      }
    };
  };

  //chuyen trang edit
  const EditPage = () => {
    navigate('/dependent-person-edit/' + IDDependentPerson);
  };
  //=================================
  //lấy danh sách nhân viên
  useEffect(() => {
    if (Search === '') {
      axios
        .post(
          apiUrl + '/v1/get-all-dependent-person',
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
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    } else {
      axios
        .post(
          apiUrl + '/v1/search-dependent-person-by-key',
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
      navigate('/personnel-details/' + ID);
    };
  };

  //tạo ra table
  const listviewStaff = Staff.map((data) => {
    return (
      <tr key={data._id}>
        <td className={cx('click-td')} onClick={nextDetailPersonnel(data.IDStaff)}>
          {data.numberNV}
        </td>
        {/* <td className={cx('click-td')}>
          <img
            src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/13-small.d796bffd.png"
            alt="avatar"
          ></img>
        </td> */}
        <td className={cx('click-td')} onClick={nextDetailPersonnel(data.IDStaff)}>
          {data.nameStaff}
        </td>
        <td className={cx('click-td')}>{data.nameDependentPerson}</td>
        {/* <td className={cx('click-td')}>{data.jobPosition}</td> */}
        <td className={cx('click-td')}>{data.IDcard1DependentPerson}</td>
        <td className={cx('click-td')}>{data.RelationshipWithTaxpayers}</td>
        <td className={cx('click-td')}>{data.numberOfPapers}</td>
        <td className={cx('click-td')}>{moment(data.FromMonth).format('DD/MM/YYYY')}</td>
        <td className={cx('click-td')}>{moment(data.ToTheMonth).format('DD/MM/YYYY')}</td>
        {/* <td className={cx('table-tt')}>
          {data.Working === 'Đang làm' && <span className={cx('dl')}>Đang làm</span>}
          {data.Working === 'Thôi việc' && <span className={cx('nl')}>Đã nghỉ</span>}
          {data.Working === 'Đang tuyển' && <span className={cx('dtd')}>Đang tuyển</span>}
          {data.Working === 'Thai sản' && <span className={cx('ts')}>Thai sản</span>}
        </td> */}
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
                <option value="nameStaff">Tìm theo họ và tên NV</option>
                <option value="nameDependentPerson">Tìm theo họ và tên NPT</option>
                <option value="numberNV">Tìm theo MNV NV</option>
                <option value="IDcard1DependentPerson">Tìm theo CMND/CCCD NPT</option>
              </select>
              <input
                className={cx('input-search')}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
              />
              {/* <Link to="/personnel-add/" className={cx('Link')}>
                <button>
                  <AiOutlineUserAdd className={cx('icon')} />
                  Thêm nhân viên
                </button>
              </Link> */}
            </div>
          </div>
          {/*=====*/}
          <div className={cx('container-table-chi')}>
            {Staff.length > 0 ? (
              <table className={cx('table-personnel')}>
                <tbody>
                  <tr>
                    <th onClick={sorttable(0)}>
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
                    <th onClick={sorttable(1)}>
                      {sort === 'nameStaff' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          Họ và Tên nhân viên
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'nameStaff' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          Họ và Tên nhân viên
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'nameStaff' && 'Họ và Tên nhân viên'}
                    </th>
                    <th onClick={sorttable(2)}>
                      {sort === 'nameDependentPerson' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          Họ và Tên NPT
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'nameDependentPerson' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          Họ và Tên NPT
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'nameDependentPerson' && 'Họ và Tên NPT'}
                    </th>
                    {/* <th onClick={sorttable(5)}>
                      {sort === 'jobPosition' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          Vị trí
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'jobPosition' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          Vị trí
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'jobPosition' && 'Vị trí'}
                    </th> */}
                    <th onClick={sorttable(3)}>
                      {sort === 'IDcard1DependentPerson' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          CMND/CCCD NPT
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'IDcard1DependentPerson' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          CMND/CCCD NPT
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'IDcard1DependentPerson' && 'CMND/CCCD NPT'}
                    </th>
                    <th onClick={sorttable(4)}>
                      {sort === 'RelationshipWithTaxpayers' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          Quan hệ với NV
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'RelationshipWithTaxpayers' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          Quan hệ với NV
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'RelationshipWithTaxpayers' && 'Quan hệ với NV'}
                    </th>
                    <th onClick={sorttable(5)}>
                      {sort === 'numberOfPapers' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          Số giấy tờ
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'numberOfPapers' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          Số giấy tờ
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'numberOfPapers' && 'Số giấy tờ'}
                    </th>
                    <th onClick={sorttable(6)}>
                      {sort === 'FromMonth' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          Từ tháng
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'FromMonth' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          Từ tháng
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'FromMonth' && 'Từ tháng'}
                    </th>
                    <th onClick={sorttable(7)}>
                      {sort === 'ToTheMonth' && sortty === true && (
                        <div className={cx('container-sort-th')}>
                          Tới tháng
                          <AiOutlineCaretUp className={cx('icon-up')} />
                        </div>
                      )}
                      {sort === 'ToTheMonth' && sortty === false && (
                        <div className={cx('container-sort-th')}>
                          Tới tháng
                          <AiOutlineCaretDown className={cx('icon-dow')} />
                        </div>
                      )}
                      {sort !== 'ToTheMonth' && 'Tới tháng'}
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
          <DialogContentText id="alert-dialog-slide-description">
            Chắc chắn muốn xóa người phụ thuộc này ?
          </DialogContentText>
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
};

export default DependentPerson;
