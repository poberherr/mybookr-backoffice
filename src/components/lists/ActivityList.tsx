import {
    List,
    Datagrid,
    TextField,
    NumberField,
    ReferenceField,
    ReferenceArrayField,
  } from "react-admin";
  
  import GlobalIdTextField from "../fields/GlobalIdTextField";
  import MarkdownTextField from "../fields/MarkdownField";
import PriceField from "../fields/PriceField";
  
  export const ActivityList = () => (
    <List>
      <Datagrid>
        <GlobalIdTextField source="id" />
        <ReferenceField source="experience.id" reference="Experience">
          <TextField source="title" />
        </ReferenceField>
        <TextField source="title" />
        <TextField source="slug" />
        <PriceField source="price" />
        <MarkdownTextField source="description" maxLength={69} />
        <NumberField source="guestMax" />
      </Datagrid>
    </List>
  );
  