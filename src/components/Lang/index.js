import React, { useState } from "react";
import { Select } from "antd";
import "./lang.scss";
import { useTranslation, Trans } from "react-i18next";

export default () => {
  const { t, i18n } = useTranslation();
  let defaultValue = i18n.language;
  if (["en", "zh-CN"].indexOf(defaultValue) === -1) {
    defaultValue = "en";
  }
  const [lang, setLang] = useState(defaultValue);

  const handleChange = (val) => {
    setLang(val);
    localStorage.setItem("dbt_lang", val);
    i18n.changeLanguage(val);
  };
  return (
    <div className="langBox">
      <Select
        className="lang-select"
        style={{ width: 150 }}
        value={lang}
        onChange={handleChange}
      >
        <Select.Option value="en">English</Select.Option>
        <Select.Option value="zh-CN">简体中文</Select.Option>
      </Select>
    </div>
  );
};
