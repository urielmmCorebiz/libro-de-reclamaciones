import React from "react";
import { injectIntl } from "react-intl";
import Complaints from "./Complaints";

const complaintBook = ({ intl, banners }) => {
  return <Complaints />;
};

export default injectIntl(complaintBook);
