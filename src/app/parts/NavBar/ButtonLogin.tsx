import { Button } from "@mui/material"
import React from "react"


export default function ButtonLogin({
    className
}:{
    className?: string
}) {
    return(
        <Button className={className}>Login</Button>
    )
}