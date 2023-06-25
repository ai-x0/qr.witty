import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "antd";
import i18next from "i18next";

import PartHeader from "./PartHeader";
import PartParams from "./PartParams";
import PartStylesViewer from "../../containers/app/PartStylesViewer";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setScrollbarWidthProp } from "../../utils/util";
import $event from "../../utils/$event";
import apiData from "../../utils/api-data";
import {isMobile} from "../../utils/mobileHelper";

import Header from "../Header";
import PreviewBox from "../Preview";

import "./App.css";
import "../Qrcode.css";
function App({ textUrl, dispatch }) {
  const [xsrc, setSrc] = useState("");
  const [isExpand, setExpand] = useState(false);
  const [isGenerating, setGenerating] = useState(false);
  const [imgList, setImgList] = useState([
    // 'https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF',
    // 'https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF',
    // 'https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF',
    // 'https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF',
  ]);
  const [keyword, setKeyword] = useState("(masterpiece),(best quality),(ultra-detailed), (full body:1.2), Polar bear, denim overalls, shirt, shoes, cute, mascot, masterpiece, realistic , detailed , <lora:blindbox_v1mix:1>, 8k super quality, (smile:0.5), round face, fat body,");
  const { t } = useTranslation();

  useEffect(() => {
    login(true);
    const handle = (data) => {
      setSrc(data);
    };
    $event.on("generate_image", handle);

    return () => {
      $event.off("generate_image", handle);
    };
  }, []);
  setScrollbarWidthProp();

  function dataURLToFile(fileDataURL) {
    let arr = fileDataURL.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    let ext = mime.split("/")[1] || "png";
    let filename = uuidv4() + "." + ext;
    return new File([u8arr], filename, { type: mime });
  }

  const login = async (isForce) => {
    let dbToken = localStorage.getItem("dbt_token");
    if (!dbToken || isForce) {
      let res = await apiData.appLogin({ openid: uuidv4() }).catch((e) => null);
      if (res?.code !== 200 || !res?.data?.token) {
        return;
      }

      localStorage.setItem("dbt_token", res?.data?.token);
    }
  };

  function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms || 0);
    });
  }

  const getImgloop = async (tasks_id) => {
    let res = await apiData.getResult({ tasks_id }).catch((e) => {});
    if (res?.data?.images?.length) {
      setImgList([...res.data.images]);
      return;
    }
    await delay(1000);
    await getImgloop(tasks_id);
  };

  const generate = async () => {
    if (!textUrl) {
      Modal.warning({ title: i18next.t("page.qrContentPrompt") });
      return "";
    }

    if (!keyword) {
      Modal.warning({ title: i18next.t("page.emptyPrompt") });
      return "";
    }

    if (!xsrc) {
      Modal.warning({ title: i18next.t("page.emptyQrcode") });
      return "";
    }
    if (isGenerating) {
      return;
    }

    setGenerating(true);

    await login();

    const formData = new FormData();
    formData.append("file", dataURLToFile(xsrc));

    const res = await apiData.uploadFiletoAli(formData).catch((e) => null);

    console.log("res", res?.data?.fullurl);
    if (!res?.data?.fullurl) {
      setGenerating(false);
      return;
    }

    let params = {
      cfg_scale: 0,

      keywords: keyword,
      cnt_image_url: res?.data?.fullurl,
      is_vip: 0,
      scale: 1,
      user_size: "512x512",
      hr_scale: 1,
      style: "357",
      score_flag: 0,
    };

    const gRes = await apiData.generateQRCode(params);

    if (gRes?.code == 200 && gRes?.data) {
      await getImgloop(gRes?.data);
    }

    setGenerating(false);
  };

  const handleToggle = () => {
    console.log("abc");
    setExpand(!isExpand);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="Layout" style={{ width: "100%" }}>
          <Header />
          <div className="Qr-outer">
            {
              !isMobile() && (
                <PreviewBox qrSrc={xsrc} imgList={imgList} />

              )
            }

            <PartHeader onToggle={handleToggle} isExpand={isExpand} />

            <div className="expandbox" style={{ width: 1200, display: isExpand ? "block" : "none" }}>
              <PartStylesViewer />
              <PartParams />
            </div>
            {/* <PartDownloadViewer updateDownloadData={updateDownloadData} /> */}
            {/* <PartMore/> */}
            {/* <PartFooter/> */}
            <div
              className="line dashed-line"
              style={{
                height: 0,
                width: 780,
                marginRight: 420,
                boxSizing: "content-box",
                borderBottom: "1.5px dashed rgba(161, 161, 161, 0.5)",
              }}
            ></div>
            <div className="promptbox">
              <div className="promptbox-inner">
                <div className="promptbox-title head-title">
                  <img
                    src={require("../../assets/images/icon_imagepromrt.png")}
                    alt=""
                  />{" "}
                  {t("page.ImagePrompt")}
                </div>
                <textarea
                  value={keyword}
                  placeholder={t("page.imgDesc")}
                  onChange={(evt) => setKeyword(evt.target.value)}
                  style={{ userSelect: "none" }}
                ></textarea>
                <Button
                  loading={isGenerating}
                  className={`btn-generate ${isGenerating ? "disabled" : ""}`}
                  onClick={() => generate()}
                >
                  {t("page.generate")}
                </Button>
              </div>
            </div>
            {
              !!isMobile() && (
                <PreviewBox qrSrc={xsrc} imgList={imgList} />
              )
            }

          </div>
        </div>
      </header>
    </div>
  );
}

const mapStateToProps = (state) => ({
  textUrl: state.textUrl,
});

export default connect(mapStateToProps)(App);
