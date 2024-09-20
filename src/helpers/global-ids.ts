export const encodeGlobalId = (type: string, id: number | string) => {
  return btoa(`${type}:${id}`);
};

export const decodeGlobalId = (globalId: string) => {
  const decodedFragments = atob(globalId).split(":");
  if (decodedFragments.length !== 2) {
    throw new Error(`Global ID ${globalId} is invalid.`);
  }
  return {
    typename: decodedFragments[0],
    id: parseInt(decodedFragments[1], 10),
  };
};
