import React from 'react';

function onBtnClick({ onClick }) {
  return (
    <button type="button" onClick={onClick} className="Button">
      Загрузить еще
    </button>
  );
}

export default onBtnClick;
