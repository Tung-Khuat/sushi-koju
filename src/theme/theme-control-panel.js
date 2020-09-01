import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { themes, ThemeContext } from './theme-context';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { AbsCenter, NoButtonAttributes } from '../styled-components/mixin';
import CircleSvg from './CircleSvg'

const PanelWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 0;
    z-index: 100;
`
const PanelButtonContainer = styled.div`
    position: relative;
    width: 40px;
    height: 40px;
`
const ButtonBackground = styled.div`
    background: #000;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 0 4px 4px 0;
    opacity: 0.2;
`
const PanelButton = styled.button`
    ${NoButtonAttributes}
    ${AbsCenter}
    color: ${(props)=>props.color || props.theme.highlight};
    font-weight: bold;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    z-index: 101;
    text-align: center;
    cursor: pointer;
`


export default function ThemeControlPanel() {
    const themeContext = useContext(ThemeContext);
    const [anchorEl, setAnchorEl] = useState(null);

    function handleOnClick(event) {
        setAnchorEl(event.currentTarget)
    }
    function handleClose() {
        setAnchorEl(null)
    }

    function renderPanelButton() {
        return Object.keys(themes).map((colorTheme, index) =>
            <MenuItem 
                key={index}
                onClick={()=>{themeContext.switchTheme(themes[colorTheme]); handleClose()}}
            >
                { 
                    themes[colorTheme].paletteArray.map(color => (
                    <div style={{ backgroundColor: color, width: "10px", height:"20px" }}></div>
                    )) 
                }
            </MenuItem>  
        )
    }
    
    return(
        <PanelWrapper>
                <PanelButtonContainer>
                    <PanelButton onClick={handleOnClick}>
                        <CircleSvg circleWidth={20} circleHeight={20.36} circleColor={themeContext.theme.highlight} />
                    </PanelButton>
                    <ButtonBackground/>
                </PanelButtonContainer>
                <Menu
                    id="theme-control-panel"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {renderPanelButton()}
                </Menu>
        </PanelWrapper>
    )
};