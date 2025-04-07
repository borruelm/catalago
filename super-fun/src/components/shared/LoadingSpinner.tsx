import { ReactElement } from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner = (): ReactElement => {
    return <>
        <Box sx={{ display: 'flex' }}>
            <CircularProgress style={{
                textAlign: 'center', display: 'block',
                margin: 'auto'
            }} />
        </Box>
    </>;
}

export default LoadingSpinner;