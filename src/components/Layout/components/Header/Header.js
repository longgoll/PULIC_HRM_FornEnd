import classNames from 'classnames/bind';
import styles from './Header.module.scss';
//
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useState, useEffect } from 'react';
import { apiUrl, cookieValue } from '../../../../contexts/contexts';
import axios from 'axios';

const cx = classNames.bind(styles);

function Header() {
  //
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setdata] = useState([]);
  //
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //=======================
  useEffect(() => {
    axios
      .get(apiUrl + '/v1/role', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((req) => {
        // console.log(req);
        getInfo(req.data.UserID);
      });
    const getInfo = (ID) => {
      //=======================
      axios
        .get(apiUrl + '/v1/get-user/' + ID, {
          headers: {
            token: cookieValue(),
          },
        })
        .then((req) => {
          setdata(req.data.data);
        });
    };
  }, []);

  //========================
  //========================
  ////click logout
  const logout = () => {
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('container-infor')}>
          <div className={cx('container-name')}>
            <p className={cx('p1')}>{data.Name}</p>
            <p className={cx('p2')}>{data.role}</p>
          </div>
          <img
            onClick={handleClick}
            src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/13-small.d796bffd.png"
            alt="avatar"
          ></img>
          {/* Menu */}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={logout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Header;
