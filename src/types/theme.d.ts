import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    textColor : {
      primary: string;
      secondary?: string;
    },
    [key:string]:{
      primary: string;
      secondary?: string;
    },

  }

  interface PaletteOptions {
    textColor: {
      primary: string;
      secondary?: string;
    },
    [key:string]: {
      primary: string;
      secondary?: string;
    },
  }
}