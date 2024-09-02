import { Box, Tabs as MuiTabs, Tab } from '@mui/material';
import { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TabPanel } from './tab-panel';

export type Tab<T> = { label: string; value: T; tabComponent: ReactNode };

type Props<T> = {
  tabs: Array<Tab<T>>;
  defaultTab: T;
  separateComponent?: ReactNode;
};

export const Tabs = <T extends string>({ tabs, defaultTab, separateComponent }: Props<T>) => {
  const [searchparams, setSearchParams] = useSearchParams();
  const activeTab = (searchparams.get('tab') ?? defaultTab) as T;

  const handleChange = (_event: React.SyntheticEvent, newValue: T) => {
    searchparams.set('tab', newValue);
    setSearchParams(searchparams);
  };

  const tabWidth = `${100 / tabs.length}%`;

  return (
    <>
      <Box
        sx={{
          width: 1,
          border: 1,
          borderColor: 'primary.main',
          borderRadius: '13px',
          mb: 3,
        }}
      >
        <MuiTabs
          value={activeTab}
          onChange={handleChange}
          sx={{
            bgcolor: 'transparent',
            width: 1,
            height: 40,
            minHeight: 40,
          }}
          TabIndicatorProps={{
            sx: {
              bgcolor: 'primary.main',
              height: 1,
              zIndex: 0,
              // This will work only for tab with two item!!!
              ...(activeTab === tabs[0]?.value
                ? {
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                  }
                : {
                    borderTopRightRadius: '10px',
                    borderBottomRightRadius: '10px',
                  }),
            },
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
              disableRipple
              sx={{
                width: tabWidth,
                maxWidth: tabWidth,
                zIndex: 1,
                fontWeight: 600,
                minHeight: 40,
                color: 'primary.main',
                '&.Mui-selected': {
                  minHeight: 40,
                  fontWeight: 600,
                  color: 'white',
                },
              }}
            />
          ))}
        </MuiTabs>
      </Box>
      {separateComponent}
      {tabs.map((tab) => (
        <TabPanel<T> key={tab.value} value={tab.value} activeTab={activeTab}>
          {tab.tabComponent}
        </TabPanel>
      ))}
    </>
  );
};
