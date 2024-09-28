import { CodegenConfig } from "@graphql-codegen/cli";

if (!process.env.NEXT_PUBLIC_GRAPHQL_URL) {
  throw new Error("GraphQL endpoint env var not provided");
}

const config: CodegenConfig = {
  schema: `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`,
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
