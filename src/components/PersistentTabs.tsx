import React, { useEffect, useState } from "react";

import { Box, SvgIcon, Tab, Tabs } from "@mui/material";

interface PersistentTabsProps {
  children: React.ReactNode;
  localStorageKey: string;
  tabLabels: Array<{ icon?: React.ReactNode | typeof SvgIcon; label: string }>;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const PersistentTabs: React.FC<PersistentTabsProps> = ({
  children,
  localStorageKey,
  tabLabels,
}) => {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    const storedTab = localStorage.getItem(localStorageKey);
    if (storedTab !== null) {
      setValue(Number(storedTab));
    }
  }, [localStorageKey]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    localStorage.setItem(localStorageKey, String(newValue));
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="persistent tabs"
        >
          {tabLabels.map((tab, index) => (
            <Tab
              key={index}
              icon={tab.icon as string}
              iconPosition="start"
              label={tab.label}
            />
          ))}
        </Tabs>
      </Box>
      {React.Children.map(children, (child, index) => (
        <TabPanel value={value} index={index}>
          {child}
        </TabPanel>
      ))}
    </>
  );
};

export default PersistentTabs;
