import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {CircleButton} from '../../styled-components/basic-components';

const StyledBadge = styled(CircleButton)`
    width: 20px;
    height: 20px;
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: Red;        
    svg {
      font-size: 12px;
    }
`

export default function Badge({children, badgeContent}) { 
    return (
      <StyledBadge color="secondary" badgeContent={3}>
        {children}
      </StyledBadge>
    )       
}
