import classNames from 'classnames/bind';
import styles from './CreateFood.module.scss';
// import { useNavigate } from 'react-router-dom';
//input localhost file
import axios from 'axios';
import { apiUrl, cookieValue, numberFormat } from '../../../contexts/contexts';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
//

const cx = classNames.bind(styles);

const CreateFood = () => {
  //data fields
  const [CategoryDefault, setCategoryDefault] = useState('');
  const [NameFood, setNameFood] = useState('');
  const [Describe, setDescribe] = useState('');
  const [Price, setPrice] = useState(0);
  const [Category, setCategory] = useState('');
  const [VAT, setVAT] = useState('');
  const [HotFood, setHotFood] = useState(false);
  const [NewFood, setNewFood] = useState(false);
  const [BuffetFood, setBuffetFood] = useState(false);
  //dữ liệu category
  const [DataCategory, setDataCategory] = useState([]);
  //================================
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
  const createFood = () => {
    axios
      .post(
        apiUrl + '/v1/create-food',
        {
          CategoryDefault: CategoryDefault,
          NameFood: NameFood,
          Describe: Describe,
          Price: Price,
          CategoryFood: Category,
          PriceVAT: VAT,
          FoodHot: HotFood,
          FoodNew: NewFood,
          OnlyBuffet: BuffetFood,
        },
        {
          headers: {
            token: cookieValue(),
          },
        },
      )
      .then((res) => {
        pupsuccess(res.data.message);
        setCategoryDefault('');
        setNameFood('');
        setDescribe('');
        setPrice('');
        setCategory('');
        setVAT('');
        setHotFood(false);
        setNewFood(false);
        setBuffetFood(false);
      })
      .catch((error) => {
        // console.log(error);
        pupwarn(error.response.data.message);
      });
  };
  //================================
  //lấy dữ liệu category
  useEffect(() => {
    axios
      .get(apiUrl + '/v1/get-all-category', {
        headers: {
          token: cookieValue(),
        },
      })
      .then((res) => {
        setDataCategory(res.data.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  //================================
  //rader ui
  const listCategory = DataCategory.map((data) => {
    return (
      <option key={data._id} value={data.IDnumber}>
        {data.categoryName}
      </option>
    );
  });
  //================================
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container1')}>
        <h3>Tạo danh mục món ăn mới</h3>
        {/* ================================== */}
        <div className={cx('container-infor')}>
          <label>Món ăn mới</label>
          <select
            className={cx('select-filters-ch')}
            onChange={(e) => setCategoryDefault(e.target.value)}
            value={CategoryDefault}
          >
            <option value="">Vui lòng chọn</option>
            <option value="1">Đồ ăn có chế biến</option>
            <option value="2">Đồ uống có pha chế</option>
            <option value="3">Không chế biến</option>
            <option value="4">Món combo</option>
            <option value="5">Món buffet</option>
            {/* {listCountry} */}
          </select>
        </div>
        {/* ================================== */}
        <div className={cx('container-infor')}>
          <label>Tên món ăn</label>
          <input
            type="text"
            className={cx('container-infor-ch')}
            onChange={(e) => setNameFood(e.target.value)}
            value={NameFood}
          />
        </div>
        {/* ================================== */}
        <div className={cx('container-infor')}>
          <label>Mô tả món ăn</label>
          <input
            type="text"
            className={cx('container-infor-ch')}
            onChange={(e) => setDescribe(e.target.value)}
            value={Describe}
          />
        </div>
        {/* ================================== */}
        <div className={cx('container-infor')}>
          <label>Đơn giá</label>
          <input
            type="number"
            className={cx('container-infor-ch')}
            onChange={(e) => setPrice(e.target.value)}
            value={Price}
          />
        </div>
        <p>{numberFormat.format(Price)}</p>
        {/* ================================== */}
        <div className={cx('container-infor')}>
          <label>Danh mục món</label>
          <select className={cx('select-filters-ch')} onChange={(e) => setCategory(e.target.value)} value={Category}>
            <option value="">Vui lòng chọn</option>
            {listCategory}
          </select>
        </div>
        {/* ================================== */}
        <div className={cx('container-infor')}>
          <label>Giá VAT</label>
          <input
            type="number"
            className={cx('container-infor-ch')}
            onChange={(e) => setVAT(e.target.value)}
            value={VAT}
          />
        </div>
        {/* ================================== */}
        <div className={cx('container-infor')}>
          <label>Món Hot ?</label>
          <select className={cx('select-filters-ch')} onChange={(e) => setHotFood(e.target.value)} value={HotFood}>
            <option value={false}>Không</option>
            <option value={true}>Đúng</option>
            {/* {listCountry} */}
          </select>
        </div>
        {/* ================================== */}
        <div className={cx('container-infor')}>
          <label>Món mới ?</label>
          <select className={cx('select-filters-ch')} onChange={(e) => setNewFood(e.target.value)} value={NewFood}>
            <option value={false}>Không</option>
            <option value={true}>Đúng</option>
            {/* {listCountry} */}
          </select>
        </div>
        {/* ================================== */}
        <div className={cx('container-infor')}>
          <label>Món chỉ có trong buffet ?</label>
          <select
            className={cx('select-filters-ch')}
            onChange={(e) => setBuffetFood(e.target.value)}
            value={BuffetFood}
          >
            <option value={false}>Không</option>
            <option value={true}>Đúng</option>
            {/* {listCountry} */}
          </select>
        </div>
        {/* ================================== */}
        <button className={cx('container-btn')} onClick={createFood}>
          Tạo mới
        </button>
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

export default CreateFood;
