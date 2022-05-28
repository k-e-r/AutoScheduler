import React from 'react';
import { useSelector } from 'react-redux';

import PlanPopup from './planpopup/PlanPopup';
import EditCategory from './editcategory/EditCategory';

const Popup = () => {
  const planSetFlg = useSelector((state) => state.planData.planSetFlg);
  const planEditInfo = useSelector((state) => state.planData.planEditInfo);
  const categoryEditFlg = useSelector(
    (state) => state.categoryList.categoryEditFlg
  );

  return (
    <>
      {planSetFlg && <PlanPopup planInfo={planEditInfo} />}
      {categoryEditFlg && <EditCategory />}
    </>
  );
};

export default Popup;
