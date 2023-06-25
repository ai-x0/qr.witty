import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import ParamListViewer from "../../containers/param/ParamListViewer";
import ParamCorrectLevelViewer from "../../containers/param/ParamCorrectLevelViewer";
import ParamIconViewer from "../../containers/param/disposable/ParamIconViewer";

const PartParams = () => {
  const { t, i18n } = useTranslation();
  const [isChanging, setChange] = useState(false);

  // 语言切换的时候强制重新渲染
  useEffect(() => {
    setChange(true);
    setTimeout(() => {
      setChange(false);
    }, 0);
  }, [i18n.language]);

  return (
    <div className="Qr-titled-nobg">
      <div className="Qr-Centered title-margin">
        <div className="Qr-s-title head-title">
          <img
            src={require("../../assets/images/icon_parameters.png")}
            alt=""
          />
          {t("page.param")}
        </div>
      </div>
      <div className="Qr-Centered">
        {!isChanging && (
          <div className="Qr-div-table" style={{ width: 780 }}>
            <ParamListViewer />

            <ParamCorrectLevelViewer />
            <ParamIconViewer />
          </div>
        )}
      </div>
    </div>
  );
};

export default PartParams;
