import React, { useMemo, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook"; // Replaced FaFacebookF
import TwitterIcon from "@mui/icons-material/Twitter"; // Replaced FaTwitter
import DialogRegister from "./parts/BannerTournament/DialogRegister"
import { NumericFormat } from "react-number-format";
import Image from "next/image"; // Import Next.js Image component
import Link from "next/link";
import { ClassEvent, EventData } from "@/types/event.type";


function DialogReject({
  dialog,
  changeDialog,
}:{
  dialog: boolean
  changeDialog: (state: boolean) => void
}){
  return(
      <Dialog
        maxWidth="xs"
        fullWidth
        open={dialog}
        onClose={() => changeDialog(false)}
      >
        <DialogTitle>Opss Sorry</DialogTitle>
        <DialogContent>
          <Typography>
            Maaf anda harus mengisi data diri terlebih dahulu sebelum mengikuti
            pertandingan
          </Typography>
        </DialogContent>
        <DialogActions>
          <Link href={"/user-profile"}>
            <Button
              variant="contained"
              color="primary"
            >
              Update Profile
            </Button>
        </Link>
        </DialogActions>
      </Dialog>
  )
}

const slobarColor = (bar: number) => {
  if (bar <= 25) return "#4AE56C";
  if (bar <= 50) return "#FEEB21";
  if (bar <= 75) return "#FFB864";
  if (bar <= 100) return "#FF6464";
};

const BannerTournament = ({ 
    data, 
    canRegister 
  }:{
    data : EventData | null
    canRegister : boolean
  }) => {
  const [dialogRegister, setDialogRegister] = useState(false);
  const [dialogReject, setDialogReject] = useState(false);

  const handleRegister = () => {
    if (!canRegister) {
      return setDialogReject(true);
    } else {
      return setDialogRegister(true);
    }
  };

  const arrayMin = (arr: Array<number>) => arr.reduce((p, v) => (p < v ? p : v));
  const arrayMax = (arr: Array<number>) => arr.reduce((p, v) => (p > v ? p : v));

  const LowestPrice = ({ data }:{ data: ClassEvent[] | null}) => {
    const arrayPrice = data?.map((value) => value.price) || [];
    const low = arrayMin(arrayPrice);
    return low === 0 ? (
      <span>Gratis</span>
    ) : (
      <NumericFormat
        displayType="text"
        prefix="Rp "
        value={low}
        thousandSeparator="."
        decimalSeparator=","
      />
    );
  };

  const HighestPrice = ({ data }:{ data: ClassEvent[] | null}) => {
    const arrayPrice = data?.map((value) => value.price) || [];
    const lowest = arrayMin(arrayPrice);
    const highest = arrayMax(arrayPrice);
    return highest !== lowest ? (
      <NumericFormat
        displayType="text"
        prefix=" - "
        value={highest}
        thousandSeparator="."
        decimalSeparator=","
      />
    ) : null;
  };

  const regisButtonDesc = useMemo(() => {
    switch (data?.remark) {
      case "open":
        return "Daftar Kompetisi"
      case "done":
        return "Kompetisi Selesai"
      case "soon":
        return "Segera Hadir"
      case "ongoing":
        return "Kompetisi Sedang Berlangsung"
      default:
        return ""
    }
  },[data?.remark])

  return (
    <div>
      <Grid container>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              padding: { xs: 2, md: 3 },
              height: { xs: "auto", md: "400px" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            
            { data?.thumbnail && data?.thumbnail !== "" ? (
                <Image
                src={data?.thumbnail || null}
                alt="Tournament Thumbnail"
                width={800}
                height={450}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
                />
              ) : ""
            }

          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              padding: { xs: 2, md: 3 },
              height: { xs: "auto", md: "400px" },
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <div>
                <Typography
                  sx={{
                    fontSize: "22px",
                    fontWeight: "bold",
                  }}
                >
                  {data?.name}
                </Typography>
                <div
                  style={{
                    background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%)",
                    borderRadius: "2px",
                    padding: "2px 8px",
                    display: "inline-block",
                    marginTop: "5px",
                  }}
                >
                  <Typography
                    sx={{
                      textTransform: "lowercase",
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    #{data?.sport_name}
                  </Typography>
                </div>
              </div>
              <div>
                {data?.class_events && data.class_events.length > 0 && (
                  <Typography
                    sx={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      color: "#F38C0C",
                    }}
                    noWrap
                  >
                    <LowestPrice data={data?.class_events} />
                    <HighestPrice data={data?.class_events} />
                  </Typography>
                )}
                <div>
                  <div
                    style={{
                      width: "100%",
                      height: "3px",
                      borderRadius: "1px",
                      backgroundColor: "#DFDFDF",
                      margin: "0 auto",
                    }}
                  >
                    <div
                      style={{
                        height: "3px",
                        width: `${
                          (
                            (data?.participants || 0) / (data?.quota || 1)
                          ) * 100
                        }%`,
                        backgroundColor: slobarColor(
                          (
                            (data?.participants || 0) / (data?.quota || 1)
                          
                          ) * 100
                        ),
                      }}
                    />
                  </div>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#454545",
                      marginTop: "2px",
                    }}
                  >
                    {`Tersisa ${data?.quota} qouta`}
                  </Typography>
                </div>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    background: "linear-gradient(90deg, #CB4492 0%, #384FB9 100%)",
                    color: "#fff",
                    fontWeight: "bold",
                    marginTop: 1,
                  }}
                  onClick={handleRegister}
                  disabled={data?.remark !== "open"}
                >
                  {regisButtonDesc}
                </Button>
                <div
                  style={{
                    display: "flex",
                    marginTop: "8px",
                  }}
                >
                  <Button
                    sx={{
                      boxShadow: "none",
                      backgroundColor: "#3C5A98",
                      color: "#fff",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#3C5A98",
                      },
                      marginRight: 1,
                    }}
                    variant="contained"
                    size="small"
                    startIcon={<FacebookIcon />} // Updated icon
                  >
                    Share
                  </Button>
                  <Button
                    sx={{
                      boxShadow: "none",
                      backgroundColor: "#1EA1F2",
                      color: "#fff",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#1EA1F2",
                      },
                    }}
                    variant="contained"
                    size="small"
                    startIcon={<TwitterIcon />} // Updated icon
                  >
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </Box>
        </Grid>
      </Grid>

      {/* DIALOG REGISTER */}
      <DialogRegister
        open={dialogRegister}
        onClose={() => setDialogRegister(false)}
        dataTournament={data}
      />

      {/* DIALOG REJECT */}
      <DialogReject
        dialog={dialogReject}
        changeDialog={setDialogReject}
      />
    </div>
  );
};

export default BannerTournament;
