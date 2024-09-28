import * as React from "react";
import Logo from "@/assets/mybookr.svg";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Box from "@mui/material/Box";
import { AppBar, Link, TitlePortal } from "react-admin";

export const MyAppBar = () => (
  <AppBar>
    <TitlePortal />
    <Link
      to={"/"}
      style={{ color: "inherit", display: "inline-block", lineHeight: "0" }}
    >
      <Logo style={{ width: 160 }} />
    </Link>
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
