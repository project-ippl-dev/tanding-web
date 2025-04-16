"use client"
import React, { useState } from "react";
import { 
  Container, 
  Grid, 
  Paper, 
  Avatar, 
  IconButton, 
  Typography, 
  Box, 
  Backdrop, 
  CircularProgress 
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { styleData } from "@/types/global";
import Edit from "@mui/icons-material/Edit";
import Person from '@mui/icons-material/Person';
import Tentang from "./component/Tentang";
import DialogProfileBasic from "./component/DialogProfileBasic";


interface profileData {
    data: {[key: string]: string}
    club: Array<Record<string,unknown>>
}

function customStyles(theme: Theme): styleData {
const result = {
  root: {
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(9),
    },
  },
  containerProfile: {
    borderRadius: "10px",
  },
  backgroundProfile: {
    width: "100%",
    height: "300px",
    position: "relative",
  },
  iconCamera: {
    backgroundColor: "#fff",
    color: "#0B66C2",
    position: "absolute",
    top: "15px",
    right: "15px",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "10px 10px 0 0",
  },
  avatarImage: {
    width: "180px",
    height: "180px",
    position: "absolute",
    top: "160px",
    left: "40px",
    border: "5px solid #fff",
    backgroundColor: "#fff",
    "& img": {
      marginTop: "3px",
    },
  },
  iconEdit: {
    position: "absolute",
    top: "310px",
    right: "15px",
  },
  containerInformation: {
    padding: theme.spacing(7, 4, 3, 4),
  },
  name: {
    fontSize: "27px",
    fontWeight: "bold",
  },
  title: {
    fontWeight: "400",
    fontSize: "17px",
  },
  address: {
    color: "#929292",
  },
  containGroup: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1.3),
  },
  imgGroup: {
    marginRight: theme.spacing(1),
  },
  textBold: {
    fontWeight: "bold",
  },
  boxClub: {
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(3),
    },
  },
  textLink: {
    fontWeight: 700,
    color: "blue",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  }
}

return result 
}

export default function UserProfile({
    profile,
    updateProfileBasic
}:{
    profile: profileData
    updateProfileBasic: () => void
}){
  const theme = useTheme()
  const style: styleData = customStyles(theme);
  const [loading, setLoading] = useState(false);
  const [dialogProfile, setDialogProfile] = useState(false);

  const useImageBackground : boolean = false 
  const backgroundProfile = (useImageBackground? 
  (
      <img
        sx={style.backgroundImage}
        alt="backgroundProfile"
        src="https://www.geeklawblog.com/wp-content/uploads/sites/528/2018/12/liprofile-656x369.png"
      />

  ):
  (<div style={{
    width:'100%',
    height:'100%',
    background: "linear-gradient(135deg, #384FB9 0%, #CB4492 50%, #FF69B4 100%"}}
    />))
  

    return(
    <div style={{ backgroundColor: "#fff" }}>
      <Container maxWidth="lg" sx={style.root}>
        <Grid container>
          <Grid size={{ xs: 12 }}>
            <Paper sx={style.containerProfile}>
              <div style={style.backgroundProfile}>
                {
                  backgroundProfile
                }
                {/* <IconButton sx={style.iconCamera}>
                  <CameraAltIcon />
                </IconButton> */}
                <Avatar
                  sx={style.avatarImage}
                  src={profile?.data?.photo || ""}
                >
                  <Person sx={{color:"black",height:"100%",width:"100%"}} />
                </Avatar>
                <IconButton
                  sx={style.iconEdit}
                  onClick={() => setDialogProfile(true)}
                >
                  <Edit />
                </IconButton>
              </div>
              <Grid container sx={style.containerInformation}>
                <Grid size={{ md: 9, xs: 12 }}>
                  <Typography sx={style.name}>
                    {`${profile?.data?.name || "Unknown Name"}`}
                  </Typography>
                  <Typography sx={style.address}>
                    {!profile?.data?.can_participate ? (
                      <span
                        style={style.textLink}
                        onClick={() => setDialogProfile(true)}
                      >
                        Update Profile Sekarang
                      </span>
                    ) : (
                      <span>{`${profile?.data?.born_at || "Unknown Date"}`}</span>
                    )}
                  </Typography>
                </Grid>
                <Grid size={{ md: 3, xs: 12 }} sx={style.boxClub}>
                  {profile?.club?.map((value) => (
                    <div sx={style.containGroup} key={value.id}>
                      <Avatar sx={style.imgGroup} src={value.image || ""} />
                      <Typography sx={style.textBold}>
                        {`${value.name || "Unknown Club"}`}
                      </Typography>
                    </div>
                  )) || <Typography>No Clubs Available</Typography>}
                </Grid>
              </Grid>
            </Paper>
            <Tentang data={profile} />
            {/* <Pengalaman /> */}
          </Grid>
        </Grid>
        <Box height="200px" />
      </Container>

      {/* Dialog */}
      <DialogProfileBasic
        profile={profile}
        open={dialogProfile}
        onClose={() => setDialogProfile(false)}
        action={updateProfileBasic}
        setLoading={setLoading}
      />

      {/* LOAD */}
      <Backdrop open={loading} sx={style.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}