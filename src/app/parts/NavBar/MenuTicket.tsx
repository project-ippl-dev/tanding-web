"use client";
import { Button } from "@mui/material"
import React from "react" 
import StyledMenu from "../../components/StyledMenu"
import {useTheme} from "@mui/material/styles";
import { Theme } from '@mui/material/styles'
function customStyle(theme: Theme): object{
    return {

    }
}

export default function MenuTicket({ anchorEl, id, open, onClose, data }) {
    const style = customStyle(useTheme())
    return(
        <StyledMenu
            anchorEl={anchorEl}
            id={id}
            keepMounted
            open={open}
            onClose={onClose}
        >
            Menu Tiket
        </StyledMenu>
    )
}