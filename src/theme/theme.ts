import { createTheme } from '@mui/material/styles';
import typography from "./typography"
import customPalette from './palette';

const themePack = createTheme({
    typography,
    palette: customPalette
})


export default themePack
