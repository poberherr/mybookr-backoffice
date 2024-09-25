import { Layout } from "react-admin";

import { MyAppBar } from "./MyAppBar";
import { MyMenu } from "./MyMenu";

export const MyLayout = ({ children }: { children: React.ReactNode }) => (
  <Layout appBar={MyAppBar} menu={MyMenu}>
    {children}
  </Layout>
);
