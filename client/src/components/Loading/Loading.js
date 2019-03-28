import React from 'react';

import { LoadingPage } from '../StyledComponents'

import { Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 48 }} spin />;

const Loading = () => {
    return (
        <LoadingPage>
            <h1 style={{fontSize: '3em'}}>Loading...</h1>
            {antIcon}
        </LoadingPage>
    );
};

export default Loading;
