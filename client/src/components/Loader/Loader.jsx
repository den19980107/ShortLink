import React from 'react';
import { Spin, Icon } from 'antd';

const Loader = ({ size }) => {
    return (
        <Icon type="loading" style={{ fontSize: size ? size : 24 }} spin />
    );
};

export default Loader;