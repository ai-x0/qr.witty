import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import StyleListViewer from "../../containers/style/StyleListViewer";
import { isPC } from "../../utils/navigatorUtils";
import ScrollContainer from "react-indiana-drag-scroll";
import { handleScroll } from "../../utils/gaHelper";

const PartStyles = ({ setParamInfo }) => {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  const styleList = React.createElement(StyleListViewer({ setParamInfo }));

  return (
    <div className="Qr-titled" id="Qr-style" >
      <div className="stylebox" style={{ width: 1200 }}>
        <div className="Qr-Centered title-margin">
          <div className="Qr-s-title head-title">
            <img src={require("../../assets/images/icon_style.png")} alt="" />
            {t("page.qrStyle")}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            className="Qr-s"
            onStartScroll={(e) => handleScroll("style")}
            hideScrollbars={false}
            horizontal={true}
            vertical={false}
            style={{
              visibility: loaded ? "visible" : "hidden",
              flexGrow: 0,
              flexShrink: 0,
              width: 780,
            }}
          >
            {styleList}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartStyles;
