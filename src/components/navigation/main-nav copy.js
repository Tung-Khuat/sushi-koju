import React from 'react';
import styled from 'styled-components';

const FullNav = styled.nav`
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  place-items: center;
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  font-size: 1.2rem;
  span {
    width: clamp(15ch, 100%, 25ch);
    text-align: center;
    border:1px solid white;
  }
`
const Logo = styled.span`
  background-image: url(${({imageUrl}) => imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-color: grey;
  width: 180px;
  height: 180px;
  grid-column: 7/8;
`
const LeftPanel1 = styled.span`
  grid-column: 3/5;
`
const LeftPanel2 = styled.span`
  grid-column: 5/7;
`
const RightPanel1 = styled.span`
  grid-column: 8/10;
`
const RightPanel2 = styled.span`
  grid-column: 10/12;
`
export default function MainNav () {
  return (
    <FullNav>
      <LeftPanel1>
        Koti
      </LeftPanel1>
      <LeftPanel2>
        Tarjoittimet
      </LeftPanel2>
      <Logo imageUrl={'./images/noki-sushi-logo.png'}/>
      <RightPanel1>
        Sushikojut
      </RightPanel1>
      <RightPanel2>
        Yhteys
      </RightPanel2>
    </FullNav>
  )
}