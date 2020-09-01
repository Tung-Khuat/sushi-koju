import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {CircleButton} from '../../styled-components/basic-components';
import {
  ShoppingCart,
} from '@material-ui/icons';
import Badge from '@material-ui/core/Badge';

const itemsInCart = JSON.parse(sessionStorage.getItem('itemsInCart')) || null;

const StyledCartButton = styled(CircleButton)`
    width: 75px;
    height: 75px;
    position: fixed;
    bottom: 50px;
    right: 50px;
    background-color: white;        
    svg {
      font-size: 2rem;
    }
`

export default function CartButton({children, bgColor, borderColor, fontColor, onClick, fontSize, size, highlight}, props) { 
    const [badgeNumber, setBadgeNumber] = useState(null)
    
    useEffect(() => {
      console.log(itemsInCart.length)
      setBadgeNumber(itemsInCart.length) 
      console.log(badgeNumber)
    }, [itemsInCart])

    return (
        <StyledCartButton bgColor={bgColor} borderColor={borderColor} fontColor={fontColor} onClick={onClick} size={size || 50}>
          <Badge color="secondary" badgeContent={badgeNumber}>
            <ShoppingCart />  
          </Badge>
        </StyledCartButton>
    )       
}
