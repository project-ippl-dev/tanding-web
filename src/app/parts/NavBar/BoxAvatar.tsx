import { styleData } from "@/types/global"
import { Avatar, Typography } from "@mui/material"
import React from "react"

interface profileData {
    photo: string,
    name: string
}


function customStyle(): styleData{
   const result = {
        root: {
            display: "flex",
            alignItems: "center",
            margin: "0 40px 0 14px",
            cursor: "pointer",
        },
        avatar: {
            width: "30px",
            height: "30px",
        },
        name: {
            color: "black",
            marginLeft: "10px",
        },
    }
    return result
}

export default function BoxAvatar({
    data = {name: "test", photo: "/img/logo.png"},
    className,
    onClick
}:{ 
        data: profileData,
        className?: string 
        onClick?: () => void 
}) {
    const style: styleData = customStyle()

    return(
        <div className={className} style={style.root} onClick={onClick}>
          <Avatar style={style.avatar} alt="image" src={data.photo} />
          <Typography style={style.name} noWrap>
            {data.name}
          </Typography>
        </div>
    )
}