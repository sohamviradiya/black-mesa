import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#2c3e50",
        },
        secondary: {
            main: "#ecf0f1",
        },
    },
    typography: {
        fontFamily: "Poppins",
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
    },
});


const responsiveTheme = responsiveFontSizes(theme);

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
    return <ThemeProvider theme={responsiveTheme}>{children}</ThemeProvider>;
}