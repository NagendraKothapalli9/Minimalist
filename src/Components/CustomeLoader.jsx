import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
export default function CustomLoader({ open, message = "Loading..." }) {
    return (
        <Backdrop
            open={open}
            sx={(theme) => ({
                color: '#fff',
                zIndex: theme.zIndex.drawer + 999,
                backgroundColor: "rgba(0,0,0,0.5)",
                flexDirection: "column",
            })}
        >
            <Box textAlign="center">
                <CircularProgress />
                <Typography mt={2}>{message}</Typography>
            </Box>
        </Backdrop>
    );
}