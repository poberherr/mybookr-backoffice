import * as React from "react";
import { AppBar, TitlePortal } from "react-admin";
import Box from "@mui/material/Box";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import Logo from "@/assets/mybookr.svg";

export const MyAppBar = () => (
  <AppBar>
    <TitlePortal />
    <Logo style={{ width: 160 }} />
    <Box flex="1" />
    <SignedOut>
      <SignInButton />
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
    <Box width={8} />
  </AppBar>
);
