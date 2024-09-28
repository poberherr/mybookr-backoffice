import { Suspense } from "react";

import { NextPage } from "next";
import dynamic from "next/dynamic";

const AdminApp = dynamic(() => import("@/components/AdminApp"), { ssr: false });

const Home: NextPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <AdminApp />
  </Suspense>
);

export default Home;
