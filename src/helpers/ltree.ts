import { useMemo } from "react";

import { Category } from "@/gql/graphql";

import { decodeGlobalId } from "./global-ids";

export interface TreeNode {
  id: number;
  name: string;
  weight: number;
  value: number;
  children: TreeNode[];
}

interface TreeMap {
  [key: string]: TreeNode;
}

function buildTree(categories: Category[]): TreeNode {
  const tree: TreeMap = {};

  categories.forEach((category) => {
    const segments = category.path.split(".");
    let current = tree;

    segments.forEach((segment, index) => {
      if (!current[segment]) {
        current[segment] = {
          id: decodeGlobalId(category.id).id,
          name: segment,
          weight: 0, // Temporary, will be overridden if not the last segment
          children: [],
          value: 1,
        };
      }

      if (index === segments.length - 1) {
        current[segment].id = decodeGlobalId(category.id).id;
        current[segment].name = category.name;
        current[segment].weight = category.weight;
      }

      current = current[segment].children as unknown as TreeMap;
    });
  });

  const convertTreeToArray = (node: TreeNode) => {
    if (node.children) {
      node.children = Object.values(node.children).sort(
        (a, b) => a.weight - b.weight || a.name.localeCompare(b.name),
      );
      node.children.forEach(convertTreeToArray);
    }
  };

  const rootNodes = Object.values(tree);
  if (rootNodes.length > 0) {
    convertTreeToArray(rootNodes[0]);
    return rootNodes[0];
  }

  throw new Error("Tree structure could not be built.");
}

export const useTreeData = (categories: Category[] | undefined) => {
  const treeData = useMemo(() => {
    if (!categories) {
      return undefined;
    }
    return buildTree(categories);
  }, [categories]);

  return treeData;
};
