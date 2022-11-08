export const apiUrl =
  process.env.NODE_ENV !== 'production' ? 'http://192.168.1.15:5000/api' : 'https://salty-brook-05753.herokuapp.com';

// export const cookieValue = 'adad';
export const apiUrlQR =
  process.env.NODE_ENV !== 'production' ? 'http://192.168.1.15:3000' : 'https://salty-brook-05753.herokuapp.com';

export function cookieValue() {
  if (document.cookie.split(';').some((item) => item.trim().startsWith('accessToken='))) {
    //đoc cookie
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='))
      .split('=')[1];
    return cookieValue;
  } else {
    // navigate('/login');
  }
}

export const numberFormat = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});
