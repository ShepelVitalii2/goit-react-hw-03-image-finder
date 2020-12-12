import React from 'react';

function onBtnClick({ onClick }) {
  return (
    <button type="button" className="Button" onClick={onClick}>
      Загрузить еще
    </button>
  );
}

export default onBtnClick;
