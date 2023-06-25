import React, { useEffect, useState } from "react";
import _ from "lodash";
import axios from "axios";
import "../Qrcode.css";
import InputText from "../../containers/app/InputText";
import QrbtfLogo from "../svg/QrbtfLogo";
import { useTranslation } from "react-i18next";

import "./partheader.scss";

const PartHeader = ({ qrSrc, imgList = [], onToggle, isExpand } = {}) => {
  const { t } = useTranslation();

  return (
    <div
      className="Qr-Centered Qrbox"
      style={{ width: 1200, display: "flex", flexDirection: "row" }}
    >
      <div className="qrbox-sidecontent" style={{ width: 800 }}>
        <p className="Qr-subtitle head-title">
          <img src={require("../../assets/images/icon_qrcontent.png")} alt="" />
          {t("page.qrContent")}

          <div className="title-right">
            <div
              className={`togglebox ${isExpand ? "expand" : ""}`}
              onClick={onToggle}
            >
              {isExpand ? t("page.collapse") : t("page.expand")}
              <img
                src={require("../../assets/images/icon_header_more.png")}
                alt=""
              />
            </div>
          </div>
        </p>
        <InputText />
      </div>
    </div>
  );
};

export default PartHeader;
