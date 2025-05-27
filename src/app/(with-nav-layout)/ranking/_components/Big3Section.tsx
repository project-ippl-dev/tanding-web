"use client";
import { RankingClubData, RankingUserData } from "@/types/ranking.types";
import { Avatar, Box, Card, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Badge1 from "@/assets/images/badge1.png";
import Badge2 from "@/assets/images/badge2.png";
import Badge3 from "@/assets/images/badge3.png";
import BorderGold from "@/assets/images/border-gold.webp";
import BorderSilver from "@/assets/images/border-silver.webp";
import BorderBronze from "@/assets/images/border-bronze.webp";
import { EmojiEvents } from "@mui/icons-material";
import { NumericFormat } from "react-number-format";

export default function Big3Section({
  data,
}: {
  data: RankingClubData[] | RankingUserData[];
}) {
  function isClubData(obj: RankingClubData): obj is RankingClubData {
    return "logo" in obj;
  }

  // function isUserData(obj: RankingUserData): obj is RankingUserData {
  //   return "photo" in obj;
  // }
  return (
    <Grid
      container
      sx={(theme) => ({
        marginTop: theme.spacing(3),
      })}
    >
      {!!data[1] && (
        <Grid
          size={{
            xs: 4,
          }}
          sx={(theme) => ({
            padding: theme.spacing(0, 1),
          })}
        >
          <Card
            sx={(theme) => ({
              padding: theme.spacing(3),
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
            })}
          >
            <Box
              component="div"
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                component={"div"}
                sx={{
                  position: "relative",
                  // border: "4px solid #C04695",
                  // borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  minWidth: "200px",
                }}
              >
                <Image
                  alt="Border Silver"
                  src={BorderSilver}
                  style={{
                    position: "absolute",
                    height: "170px",
                    width: "auto",
                    transform: "translate(-50%,-50%)",
                    top: "50%",
                    left: "50%",
                    zIndex: 10,
                  }}
                />
                <Avatar
                  src={isClubData(data[1]) ? data[1].logo : data[1].photo}
                  sx={{
                    width: "100px",
                    height: "100px",
                  }}
                />
                <Image
                  alt="Badge For 2nd Place"
                  src={Badge2}
                  className="absolute h-[30px] w-auto bottom-0 right-0 z-20"
                />
              </Box>
            </Box>
            <Box marginTop={3}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                {data[1].name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                }}
              >
                Rank 2
              </Typography>
            </Box>
            <Box
              component={"div"}
              sx={(theme) => ({
                padding: theme.spacing(2, 0, 4),
                display: "flex",
                justifyContent: "center",
              })}
            >
              <Box
                component={"div"}
                sx={(theme) => ({
                  background:
                    "linear-gradient(90deg, #CB4492 0%, #384FB9 100%);",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: "20px",
                  padding: theme.spacing(0.8, 2),
                })}
              >
                <Typography>{`${data[1].total_participate} Pertandingan`}</Typography>
              </Box>
            </Box>
            <Box
              component={"div"}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <EmojiEvents
                  sx={{
                    fontSize: "20px",
                    marginRight: "5px",
                  }}
                />
                <Typography>Tanding! Point</Typography>
              </Box>
              <NumericFormat
                style={{ fontWeight: 600 }}
                displayType="text"
                thousandSeparator="."
                decimalSeparator=","
                value={data[1].total_point}
              />
            </Box>
          </Card>
        </Grid>
      )}
      {!!data[0] && (
        <Grid
          size={{
            xs: 4,
          }}
          sx={(theme) => ({
            padding: theme.spacing(0, 1),
          })}
        >
          <Card
            sx={(theme) => ({
              padding: theme.spacing(3),
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
            })}
          >
            <Box
              component="div"
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                component={"div"}
                sx={{
                  position: "relative",
                  // border: "4px solid #C04695",
                  // borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  minWidth: "200px",
                }}
              >
                <Image
                  alt="Border Gold"
                  src={BorderGold}
                  style={{
                    position: "absolute",
                    height: "170px",
                    width: "auto",
                    transform: "translate(-50%,-50%)",
                    top: "50%",
                    left: "50%",
                    zIndex: 10,
                  }}
                />
                <Avatar
                  src={isClubData(data[0]) ? data[0].logo : data[0].photo}
                  sx={{
                    width: "100px",
                    height: "100px",
                  }}
                />
                <Image
                  alt="Badge For 1st Place"
                  src={Badge1}
                  className="absolute h-[30px] w-auto bottom-0 right-0 z-20"
                />
              </Box>
            </Box>
            <Box marginTop={3}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                {data[0].name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                }}
              >
                Rank 1
              </Typography>
            </Box>
            <Box
              component={"div"}
              sx={(theme) => ({
                padding: theme.spacing(2, 0, 4),
                display: "flex",
                justifyContent: "center",
              })}
            >
              <Box
                component={"div"}
                sx={(theme) => ({
                  background:
                    "linear-gradient(90deg, #CB4492 0%, #384FB9 100%);",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: "20px",
                  padding: theme.spacing(0.8, 2),
                })}
              >
                <Typography>{`${data[0].total_participate} Pertandingan`}</Typography>
              </Box>
            </Box>
            <Box
              component={"div"}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <EmojiEvents
                  sx={{
                    fontSize: "20px",
                    marginRight: "5px",
                  }}
                />
                <Typography>Tanding! Point</Typography>
              </Box>
              <NumericFormat
                style={{ fontWeight: 600 }}
                displayType="text"
                thousandSeparator="."
                decimalSeparator=","
                value={data[0].total_point}
              />
            </Box>
          </Card>
        </Grid>
      )}
      {!!data[2] && (
        <Grid
          size={{
            xs: 4,
          }}
          sx={(theme) => ({
            padding: theme.spacing(0, 1),
          })}
        >
          <Card
            sx={(theme) => ({
              padding: theme.spacing(3),
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
            })}
          >
            <Box
              component="div"
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                component={"div"}
                sx={{
                  position: "relative",
                  // border: "4px solid #C04695",
                  // borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  minWidth: "200px",
                }}
              >
                <Image
                  alt="Border Bronze"
                  src={BorderBronze}
                  style={{
                    position: "absolute",
                    height: "170px",
                    width: "auto",
                    transform: "translate(-50%,-50%)",
                    top: "50%",
                    left: "50%",
                    zIndex: 10,
                  }}
                />
                <Avatar
                  src={isClubData(data[2]) ? data[2].logo : data[2].photo}
                  sx={{
                    width: "100px",
                    height: "100px",
                  }}
                />
                <Image
                  alt="Badge For 3rd Place"
                  src={Badge3}
                  className="absolute h-[30px] w-auto bottom-0 right-0 z-20"
                />
              </Box>
            </Box>
            <Box marginTop={3}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                {data[2].name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                }}
              >
                Rank 3
              </Typography>
            </Box>
            <Box
              component={"div"}
              sx={(theme) => ({
                padding: theme.spacing(2, 0, 4),
                display: "flex",
                justifyContent: "center",
              })}
            >
              <Box
                component={"div"}
                sx={(theme) => ({
                  background:
                    "linear-gradient(90deg, #CB4492 0%, #384FB9 100%);",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: "20px",
                  padding: theme.spacing(0.8, 2),
                })}
              >
                <Typography>{`${data[2].total_participate} Pertandingan`}</Typography>
              </Box>
            </Box>
            <Box
              component={"div"}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <EmojiEvents
                  sx={{
                    fontSize: "20px",
                    marginRight: "5px",
                  }}
                />
                <Typography>Tanding! Point</Typography>
              </Box>
              <NumericFormat
                style={{ fontWeight: 600 }}
                displayType="text"
                thousandSeparator="."
                decimalSeparator=","
                value={data[2].total_point}
              />
            </Box>
          </Card>
        </Grid>
      )}
      {data.length === 0 && (
        <Grid size={{ xs: 12 }}>
          <Typography align="center">Tidak ada data</Typography>
        </Grid>
      )}
    </Grid>
  );
}
