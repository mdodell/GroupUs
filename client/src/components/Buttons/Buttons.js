import React from 'react';

import GoogleImage from '../../images/google-icon.png';
import FacebookImage from '../../images/facebook-icon.png';

import { FacebookButtonWrapper, GoogleButtonWrapper, SocialAuthenticationButtonIcon} from "../StyledComponents/index";

export const FacebookButton = () => {
    return(
        <FacebookButtonWrapper href="/auth/facebook">
            <SocialAuthenticationButtonIcon alt="Google" src={FacebookImage} />
            Facebook
        </FacebookButtonWrapper>
    );
};

export const GoogleButton = () => {
    return(
        <GoogleButtonWrapper href="/auth/google">
            <SocialAuthenticationButtonIcon alt="Google" src={GoogleImage} />
            Google
        </GoogleButtonWrapper>
    );
};