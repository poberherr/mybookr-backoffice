import { Edit, FileInput, SimpleForm, TextInput } from "react-admin";

import MediaAside from "../aside/MediaAside";

export const MediaEdit = () => (
  <Edit mutationMode="pessimistic" aside={<MediaAside />}>
    <SimpleForm>
      <TextInput source="title" />
      <FileInput source="media" />
      <strong>
        Sorry, for now, image uploading / changing doesnt work. Its complicated
        #later
      </strong>
    </SimpleForm>
  </Edit>
);
