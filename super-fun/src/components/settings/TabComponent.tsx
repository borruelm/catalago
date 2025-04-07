import { ReactElement, useState } from "react";
import { Box, Tab } from "@mui/material";
import {TabContext, TabList, TabPanel} from '@mui/lab';
import ActiveArticles from "../articles/ActiveArticles";
import InactiveArticles from "../articles/InactiveArticles";

const TabComponent = (): ReactElement => {
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
      };

    return <>
         <Box sx={{ width: '100%', minWidth:280, typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Active Articles" value="1" />
            <Tab label="Delete Articles" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><ActiveArticles /></TabPanel>
        <TabPanel value="2"><InactiveArticles /></TabPanel>
      </TabContext>
    </Box>
    </>

}

export default TabComponent;