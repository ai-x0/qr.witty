import React from 'react';
import PropTypes from 'prop-types'
import '../../Qrcode.css';
import FrameworkParam from "../FrameworkParam";
import {getExactValue} from "../../../utils/util";
import ParamIconSrcViewer from "../../../containers/param/disposable/ParamIconSrcViewer";
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

const IconParams = ({ icon, onBlur, onKeyPress }) => {
    const { t } = useTranslation();
    const { enabled, src, scale } = icon;
    const components = [];

    if (getExactValue(enabled, 0) == 1) {
        components.push(
            <FrameworkParam paramName={t('page.iconSource')}>
                <ParamIconSrcViewer icon={icon} onChange={onBlur}/>
            </FrameworkParam>
        );
    }

    if (getExactValue(enabled, 0) != 0) {
        components.push(
            <FrameworkParam paramName={t('page.iconScale')}>
                <input
                    type="number"
                    className="Qr-input small-input"
                    defaultValue={scale}
                    onBlur={(e) => onBlur({...icon, scale: e.target.value})}
                    onKeyPress={(e) => onKeyPress(e, {...icon, scale: e.target.value})}
                />
            </FrameworkParam>
        )
    }
    return components;
}

const ParamIcon = ({icon, onBlur, onKeyPress}) => {
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <FrameworkParam paramName={t('page.icon')}>
                <Select
                    className="Qr-select"
                    defaultValue={icon.enabled}
                    onChange={(e) => onBlur({...icon, enabled: e})}>
                    <Select.Option key='0' value={0}>{t('page.None')}</Select.Option>
                    <Select.Option key='1' value={1}>{t('page.custom')}</Select.Option>
                    <Select.Option key='2' value={2}>{t('page.wexin-small')}</Select.Option>
                    <Select.Option key='3' value={3}>{t('page.wexin')}</Select.Option>
                    <Select.Option key='4' value={4}>{t('page.wxpay')}</Select.Option>
                    <Select.Option key='5' value={5}>{t('page.Alipay')}</Select.Option>
                </Select>
            </FrameworkParam>
            <IconParams icon={icon} onBlur={onBlur} onKeyPress={onKeyPress}/>
        </React.Fragment>
    )
}

ParamIcon.propTypes = {
    icon: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
}

export default ParamIcon;
