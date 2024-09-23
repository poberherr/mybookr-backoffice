import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    ChipField,
} from "react-admin";

import GlobalIdTextField from "../fields/GlobalIdTextField";
import BookingStatusField from "../fields/BookingStatusField";
import PriceField from "../fields/PriceField";
export const BookingList = () => (
    <List>
        <Datagrid>
            <GlobalIdTextField source="id" />
            <ReferenceField source="activity.id" reference="Activity" label="Activity Title">
                <TextField source="title" />
            </ReferenceField>
            <TextField source="referenceCode" label="Booking Reference Code" />
            <BookingStatusField source="status" />
            <ReferenceField source="booker.id" reference="User" label="Booking User">
                <TextField source="name" />
            </ReferenceField>
            <PriceField source="totalCost" />
        </Datagrid>
    </List>
);