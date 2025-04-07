import { ReactElement, useEffect, useState } from "react";
import LoadingSpinner from "../shared/LoadingSpinner";
import TabComponent from "./TabComponent";
import { Card, Typography } from "@mui/material";

const MainDashboard = (): ReactElement => {
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        isLoading && setTimeout(() => { setIsLoading(false); }, 800)
    }, [isLoading])
    return <>
    <Typography variant="h4">Main Dashboard</Typography>
        <Card>
            {isLoading ? <LoadingSpinner /> : <TabComponent />}
        </Card>
    </>

}

export default MainDashboard;