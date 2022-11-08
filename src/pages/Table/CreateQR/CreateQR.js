import React from 'react';
import QRCode from 'react-qr-code';
import { apiUrlQR } from '../../../contexts/contexts';

const CreateQR = () => {
  const url = window.location.href.split('/');
  return <QRCode value={apiUrlQR + '/client-menu/' + url[4]} bgColor="#FFFFFF" fgColor="#000000" level="L" />;
};

export default CreateQR;
