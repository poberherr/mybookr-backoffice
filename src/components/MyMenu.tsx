import * as React from "react";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import PersonIcon from "@mui/icons-material/Person";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import PlaceIcon from "@mui/icons-material/Place";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import Divider from "@mui/material/Divider";

import { DashboardMenuItem, MenuItemLink } from "react-admin";

export const MyMenu: React.FC = () => {
  return (
    <div style={{ minWidth: "240px", padding: "2.65rem 0" }}>
      <DashboardMenuItem />
      <Divider />
      <MenuItemLink
        to="/Booking"
        primaryText={"Bookings"}
        leftIcon={<ReceiptIcon />}
      />
      <MenuItemLink
        to="/Payment"
        primaryText={"Payments"}
        leftIcon={<CreditCardIcon />}
      />
      <Divider />
      <MenuItemLink
        to="/Experience"
        primaryText={"Experiences"}
        leftIcon={<Diversity2Icon />}
      />
      <MenuItemLink
        to="/Activity"
        primaryText={"Activities"}
        leftIcon={<LocalActivityIcon />}
      />
      <Divider />
      <MenuItemLink
        to="/User"
        primaryText={"Users"}
        leftIcon={<PersonIcon />}
      />
      <MenuItemLink
        to="/Operator"
        primaryText={"Operators"}
        leftIcon={<SettingsAccessibilityIcon />}
      />
      <Divider />
      <MenuItemLink
        to="/Media"
        primaryText={"Media"}
        leftIcon={<PhotoLibraryIcon />}
      />
      <MenuItemLink
        to="/Location"
        primaryText={"Locations"}
        leftIcon={<PlaceIcon />}
      />
      <MenuItemLink
        to="/Category"
        primaryText={"Categories"}
        leftIcon={<FolderSpecialIcon />}
      />
    </div>
  );
};
