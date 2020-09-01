import React from 'react';
import { adjustHexColor } from '../helpers/colorHelpers';

export default function CircleSvg({circleWidth, circleHeight, circleColor, circleShadow}) {
    return(
        <svg  width={circleWidth} height={circleHeight} viewBox="0 0 385 392" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="circle-shadow" fill={circleShadow || adjustHexColor(circleColor, 20)} d="M192.5 5.74219V386.258C295.7 386.258 379.36 301.077 379.36 196C379.36 90.9233 295.7 5.74219 192.5 5.74219Z" />
            <path id="circle-fill" fill={circleColor} d="M349.282 196C349.282 90.9233 279.088 5.74219 192.5 5.74219C89.2997 5.74219 5.63965 90.9233 5.63965 196C5.63965 301.077 89.2997 386.258 192.5 386.258C279.088 386.258 349.282 301.077 349.282 196Z" />
        </svg>
    )
};