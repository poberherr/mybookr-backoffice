import React from "react";

import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ListIcon from "@mui/icons-material/List";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { MouseHandler, ResponsiveSunburst } from "@nivo/sunburst";
import { NodeMouseEventHandler, ResponsiveTree } from "@nivo/tree";
import {
  ChipField,
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceArrayField,
  ReferenceField,
  TextField,
  useGetList,
} from "react-admin";
import { useNavigate } from "react-router-dom";

import { encodeGlobalId } from "@/helpers/global-ids";
import { Category, TreeNode, useTreeData } from "@/helpers/ltree";

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
  const navigate = useNavigate();
  const theme = useTheme();
  const { data } = useGetList<Category>("Category");

  const treeData = useTreeData(data);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleNodeClick: NodeMouseEventHandler<TreeNode> = (event) => {
    navigate(
      `/Category/${encodeURIComponent(encodeGlobalId("Category", event.data.id))}`,
    );
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab icon={<ListIcon />} iconPosition="start" label="List" />
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
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
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
      <CustomTabPanel value={value} index={1}>
        <div style={{ height: "69vh" }}>
          {treeData && (
            <ResponsiveSunburst
              data={treeData}
              value="value"
              colors={{ scheme: "paired" }}
              enableArcLabels={true}
              arcLabel={"data.name"}
              onClick={handleNodeClick as unknown as MouseHandler<TreeNode>}
              borderColor={theme.palette.text.primary}
            />
          )}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div style={{ height: "69vh" }}>
          {treeData && (
            // @ts-expect-error TS definitions are broken in upstream nivo package.. sooo..
            <ResponsiveTree
              data={treeData}
              label="data.name" // Custom label rendering
              enableLabel={true}
              mode="tree"
              activeNodeSize={24}
              inactiveNodeSize={12}
              nodeColor={{ scheme: "tableau10" }}
              fixNodeColorAtDepth={1}
              linkThickness={2}
              activeLinkThickness={6}
              inactiveLinkThickness={2}
              linkColor={{
                from: "target.color",
                modifiers: [["opacity", 0.4]],
              }}
              margin={{ top: 50, right: 90, bottom: 50, left: 90 }}
              motionConfig="stiff"
              meshDetectionRadius={80}
              onNodeClick={handleNodeClick}
              orientLabel={false}
              theme={{
                labels: { text: { fill: theme.palette.text.primary } },
              }}
            />
          )}
        </div>
      </CustomTabPanel>
    </>
  );
};
