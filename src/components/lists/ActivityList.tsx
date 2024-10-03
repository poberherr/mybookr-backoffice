import {
  CreateButton,
  Datagrid,
  ExportButton,
  FilterButton,
  List,
  ReferenceField,
  SearchInput,
  TextField,
  TopToolbar,
} from "react-admin";

import GlobalIdTextField from "../fields/GlobalIdTextField";
import MarkdownTextField from "../fields/MarkdownField";
import PriceField from "../fields/PriceField";
import { SmartDateField } from "../fields/SmartDateField";

const activityFilters = [<SearchInput source="q" alwaysOn key="q" />];

const ActivityListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const ActivityList = () => (
  <List
    actions={<ActivityListActions />}
    filters={activityFilters}
    sort={{ field: "path", order: "ASC" }}
  >
    <Datagrid>
      <GlobalIdTextField source="id" />
      <TextField source="title" />
      <ReferenceField
        source="experience.id"
        reference="Experience"
        label="Experience"
      >
        <TextField source="title" /> by{" "}
        <ReferenceField
          source="operator.id"
          reference="User"
          label="Operator"
          sortable={false}
        >
          <TextField source="name" />
        </ReferenceField>
      </ReferenceField>
      <PriceField source="price" />
      <MarkdownTextField source="description" maxLength={42} />
      <SmartDateField label="Updated" sortBy="updatedAt" />
    </Datagrid>
  </List>
);
