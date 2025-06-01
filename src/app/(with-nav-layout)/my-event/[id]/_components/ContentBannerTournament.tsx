/* eslint-disable jsx-a11y/alt-text */
import React, { useMemo, useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { NumericFormat } from "react-number-format";
import Image from "next/image";
import { ClassEvent, EventData } from "@/types/event.type";
import { useAuth } from "@/context/auth.context";
import DialogRegister from "./parts/Preview/DialogRegister";
import DialogReject from "./parts/Preview/DialogReject";

const slobarColor = (bar: number) => {
  if (bar <= 25) return "#4AE56C";
  if (bar <= 50) return "#FEEB21";
  if (bar <= 75) return "#FFB864";
  return "#FF6464";
};

const ContentBannerTournament = ({ data }: {data : EventData | null}) => {

  const auth = useAuth();
  const [dialogRegister, setDialogRegister] = useState(false);
  const [dialogReject, setDialogReject] = useState(false);
  console.log("data", auth.authData?.can_participate)
  const handleRegister = () => {
    const canRegister = auth.authData?.can_participate
    if (!canRegister) {
      return setDialogReject(true);
    } else {
      return setDialogRegister(true);
    }
  };

  const arrayMin = (arr: number[]) => arr.reduce((p, v) => (p < v ? p : v));
  const arrayMax = (arr: number[]) => arr.reduce((p, v) => (p > v ? p : v));

  const LowestPrice: React.FC<{ data: ClassEvent[] | undefined }> = ({ data }) => {
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

  const HighestPrice: React.FC<{ data: ClassEvent[] | undefined }> = ({ data }) => {
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
      case "closed":
        return "Pendaftaran Ditutup"
      default:
        return ""
    }
  },[data?.remark])


  return (
    <div>
      <Grid container>
        <Grid size={{ md: 6, xs: 12 }}>
          <Box
            sx={{
              padding: 3,
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "@media (max-width: 960px)": {
                height: "auto",
                padding: 2,
              },
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
              src={data?.thumbnail || "/default-thumbnail.jpg"}
              alt="Tournament Thumbnail"
              width={800}
              height={450}
            />
          </Box>
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <Box
            sx={{
              padding: 3,
              height: "400px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              "@media (max-width: 960px)": {
                height: "auto",
                padding: 2,
              },
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
                <Typography sx={{ fontSize: "22px", fontWeight: "bold" }}>
                  {data?.name}
                </Typography>
                <Box
                  sx={{
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
                </Box>
              </div>
              <div>
                {(data?.class_events?.length || 0) > 0 && (
                  <Typography
                    sx={{ fontSize: "22px", fontWeight: "bold", color: "#F38C0C" }}
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
                        width: `${
                          ((data?.participants || 0) / 
                          (data?.quota || 1)) * 100
                        }%`,
                        height: "3px",
                        backgroundColor: slobarColor(
                          ((data?.participants || 0) / 
                          (data?.quota || 1)) * 100
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
                  >{`Tersisa ${data?.quota || 0} qouta`}</Typography>
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
                  data-testid="register-button"
                  onClick={handleRegister}
                  disabled={data?.remark !== "open"}
                >
                  {regisButtonDesc}
                </Button>
                <Box sx={{ display: "flex", marginTop: 1 }}>
                  <Button
                    sx={{
                      boxShadow: "none",
                      backgroundColor: "#3C5A98",
                      color: "#fff",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#3C5A98" },
                      marginRight: 1,
                    }}
                    variant="contained"
                    size="small"
                    startIcon={<FacebookIcon />}
                  >
                    Share
                  </Button>
                  <Button
                    sx={{
                      boxShadow: "none",
                      backgroundColor: "#1EA1F2",
                      color: "#fff",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#1EA1F2" },
                    }}
                    variant="contained"
                    size="small"
                    startIcon={<TwitterIcon />}
                  >
                    Share
                  </Button>
                </Box>
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
        onClose={()=>{setDialogReject(false)}}
      />
    </div>
  );
};

export default ContentBannerTournament;
