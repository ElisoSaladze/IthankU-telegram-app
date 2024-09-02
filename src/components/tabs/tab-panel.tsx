import { Box } from "@mui/material";

type TabPanelProps<T> = {
  children?: React.ReactNode;
  activeTab: T;
  value: T;
};

export const TabPanel = <T,>(props: TabPanelProps<T>) => {
  const { children, value, activeTab } = props;

  return (
    <Box
      component="div"
      role="tabpanel"
      hidden={value !== activeTab}
      id={`full-width-tabpanel-${activeTab}`}
      aria-labelledby={`full-width-tab-${activeTab}`}
    >
      {value === activeTab && <Box>{children}</Box>}
    </Box>
  );
};
