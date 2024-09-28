import React from "react";

import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ListIcon from "@mui/icons-material/List";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import {
  ChipField,
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceArrayField,
  ReferenceField,
  TextField,
} from "react-admin";

import GlobalIdTextField from "../fields/GlobalIdTextField";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const CategoryList = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            icon={<DonutLargeIcon />}
            iconPosition="start"
            label="Sunburst Chart"
          />
          <Tab
            icon={<AccountTreeIcon />}
            iconPosition="start"
            label="Tree Chart"
          />
          <Tab
            icon={<ListIcon />}
            iconPosition="start"
            label="List of Categories"
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <List>
          <Datagrid>
            <GlobalIdTextField source="id" />
            <TextField source="path" />
            <NumberField source="depth" />
            <NumberField source="weight" />
            <TextField source="name" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <DateField source="deletedAt" />
            <ReferenceField
              source="parent.id"
              reference="Category"
              label="Parent"
            >
              <ChipField source="name" />
            </ReferenceField>
            <ReferenceArrayField
              source="children"
              reference="Category"
              label="Categories"
            />
          </Datagrid>
        </List>
      </CustomTabPanel>
    </>
  );
};
