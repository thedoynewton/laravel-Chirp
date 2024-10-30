// resources/js/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Your primary color
        },
        secondary: {
            main: '#dc004e', // Your secondary color
        },
        background: {
            default: '#f4f6f8', // Default background color
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
        },
    },
    spacing: 4, // Base spacing unit, for padding/margins
});

export default theme;
