import React, { useState } from "react";
import Lang from "../Lang";
import { useTranslation } from "react-i18next";

import "./index.scss";

export default () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="headerCom">
      <div className="headerCom-top">
        <div className="headerCom-top-inner">
          <div className="logobox">
            <img src={require("../../assets/images/logo.png")} alt=" " />
            {t("nav.generator")}
          </div>
          <Lang />
        </div>
      </div>
      <div className="headerCom-inner">
        <div className="headerCom-content">
          <div className="txt-title">{t("banner.txtCreate")} </div>
          <div className="txt-title">
            <span>{t("banner.txtArt")} </span> {t("banner.txtQR")}
          </div>
          <div className="txt-subtitle">{t("banner.scan")}</div>
          <div className="txt-subtitle">...</div>
        </div>

        <div className="qrbox">
          <div className="imgbox">
            <img
              src={require("../../assets/images/img_banner_qr.png")}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
