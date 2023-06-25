import React from 'react';
import PropTypes from 'prop-types'
import { Select } from 'antd';
import '../../Qrcode.css';
import FrameworkParam from "../FrameworkParam";
import {  useTranslation } from 'react-i18next'

const ParamCorrectLevel = ({value, onChange}) => {
    const {t } = useTranslation();
    return (
        <FrameworkParam paramName={t('page.correction')}>
            <Select
                className="Qr-select"
                value={value}
                style={{ height: 54 }}
                onChange={(val) => onChange({target:{value: val}})}>
                <Select.Option value={1}>7%</Select.Option>
                <Select.Option value={0}>15%</Select.Option>
                <Select.Option value={3}>25%</Select.Option>
                <Select.Option value={2}>30%</Select.Option>
            </Select>
        </FrameworkParam>
    )
}

ParamCorrectLevel.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

export default ParamCorrectLevel;
