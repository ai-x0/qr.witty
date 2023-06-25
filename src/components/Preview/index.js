import React, { useEffect, useState } from "react";
import _ from "lodash";
import axios from "axios";
import "../Qrcode.css";
import { useTranslation } from "react-i18next";
import { isMobile } from "../../utils/mobileHelper";

import "./index.scss";

const saveBase64Img = (src, width, height) => {
  let canvas = document.createElement("canvas");

  // Image will be scaled to the requested size.
  // var size = data.requestedSize;
  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);

  let ctx = canvas.getContext("2d");
  let img = document.createElement("img");
  img.setAttribute("src", src);

  return new Promise((resolve) => {
    img.onload = () => {
      ctx.fillStyle = "white";
      ctx.drawImage(img, 0, 0, width, height);
      // `download` attr is not well supported
      // Will result in a download popup for chrome and the
      // image opening in a new tab for others.

      let data = canvas.toDataURL("image/png", 0.8);

      let a = document.createElement("a");

      a.setAttribute("href", data);
      a.setAttribute("target", "download");
      a.setAttribute("download", `QRcode_${Date.now()}.png`);
      a.click();
      resolve(data);
    };
  });
};

const PreviewBox = ({ qrSrc, imgList = [] } = {}) => {
  const { t } = useTranslation();
  const [activedIndex, setActivedIndex] = useState(null);

  const handleDownload = () => {
    if (isMobile()) {
      return;
    }
    let xImgList = [qrSrc].concat(imgList);

    let src = xImgList[activedIndex] || qrSrc;

    if (!src) {
      return;
    }

    if (src.indexOf("http") !== 0) {
      saveBase64Img(src, 500, 500);
      return;
    }

    axios
      .get(src, { responseType: "blob", params: { rid: Math.random() } })
      .then((response) => {
        const blob = response.data;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        let x = src.split("?")[0] || ""; // 删除？后面的参数
        x = x.split("#")[0] || ""; // 删除#后面的参数
        let arr = x.split("/");
        let filename = arr.pop();
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
  };

  if (!qrSrc) {
    return "";
  }

  let xImgList = [qrSrc].concat(imgList);

  return (
    <div className="previewbox">
      <img
        className="qrcodeimg"
        src={
          activedIndex > 0 && xImgList[activedIndex]
            ? xImgList[activedIndex]
            : qrSrc
        }
        alt=""
      />

      {!!imgList?.length && isMobile() && (
        <div
          className={`btn-down mobile ${
            xImgList[activedIndex] ? "" : "disabled"
          }`}
        >
          {t("page.saveImg")}
        </div>
      )}
      {!!imgList?.length && (
        <div className="smallimgbox">
          {[qrSrc].concat(imgList || []).map((item, index) => (
            <div
              className={`smallitem ${activedIndex == index ? "actived" : ""}`}
              key={index}
              onClick={() => setActivedIndex(index)}
            >
              <img src={item} alt="" />
            </div>
          ))}
        </div>
      )}

      {!!imgList?.length && !isMobile() && (
        <div
          className={`btn-down ${xImgList[activedIndex] ? "" : "disabled"} `}
          onClick={handleDownload}
        >
          {t("page.Download")}
        </div>
      )}
    </div>
  );
};

export default PreviewBox;
