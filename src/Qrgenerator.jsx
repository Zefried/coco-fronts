import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export default function QRGenerator() {
  const [src, setSrc] = useState('');

  useEffect(() => {
    QRCode.toDataURL('https://zefftest.shop/')
      .then(setSrc)
      .catch(console.error);
  }, []);

  return (
    <div>
      {src ? <img src={src} alt="QR Code" /> : <p>Loading QR...</p>}
    </div>
  );
}
