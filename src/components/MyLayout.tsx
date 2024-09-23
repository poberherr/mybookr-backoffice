import { Layout } from "react-admin";

import { MyAppBar } from "./MyAppBar";

export const MyLayout = ({ children }: { children: React.ReactNode }) => (
  <Layout appBar={MyAppBar}>{children}</Layout>
);
