import React from 'react';
import styled from 'styled-components';
const navLinkList = [
  {label: "Koti", href: "#koti"},
  {label: "Tarjottimet", href: "#tarjottimet"},
  {label: "Sushikojut", href: "#sushikojut"},
  {label: "Yhteys", href: "#Yhteys"},
]



const FullNav = styled.nav`
  display: grid;
  grid-template-columns: 1fr clamp(200px, 30%, 300px) 1fr;
  place-items: center;
  text-transform: uppercase;
  color: white;
  font-size: 1.15rem;
  ul {
        list-style:none;
        text-align: center;
        margin: unset;
        padding: 0;
    }
    ul li {
        display: inline-block;
        text-transform: uppercase;
        font-family: Proxima Nova Bold, sans-serif;
        color: ${props => props.color}; 
        &:not(:first-of-type):before {
            content: '';
            padding: 0 25px;
        }
    } 
    a {
        display: inline-block;
        position: relative;
        &:hover:after { 
            content: ' ';
            display: block;
            width: 100%;
            border-bottom: 2px solid;
            position: absolute;
            bottom: -0.5em;
            border-color: #bb002e;
        }
    }
`
const FirstHalf = styled.ul`
  grid-column: 1;
  justify-self: end;
` 
const Middle = styled.span`
  grid-column: 2;
`
const SecondHalf = styled.ul`
  grid-column: 3;
  justify-self: start;
`
const Logo = styled.span`
  background-image: url(${({imageUrl}) => imageUrl});
  background-repeat: no-repeat;
  background-size: cover;       
  background-position: center center; 
  background-color: grey;
  display: block;
  width: 180px;
  height: 180px;    
  margin: 0 auto;
`
export default function MainNav () {
  const halfMark = Math.ceil(navLinkList.length / 2);
  const firstHalf = navLinkList.splice(0, halfMark);
  const secondHalf = navLinkList.splice(-halfMark);

  function renderNavLinkItem (linkItem) {
    return <li><a href={linkItem.href}>{linkItem.label}</a></li>
  }
  return (
    <FullNav>
      <FirstHalf>
        {
          firstHalf.map((item)=>(renderNavLinkItem(item)))      
        }
      </FirstHalf>
      <Middle>
        <Logo imageUrl={'./images/noki-sushi-logo.png'}/>
      </Middle>
      <SecondHalf>
        {
          secondHalf.map((item)=>(renderNavLinkItem(item)))      
        }
      </SecondHalf>
    </FullNav>
  )
}