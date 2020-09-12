export const addClip = ({ clip }: { clip: any }) => {
  return {
    type: 'ADD_CLIP',
    clip,
  };
};

export const deleteClip = ({ clip }: { clip: any }) => {
  return {
    type: 'DELETE_CLIP',
    clip,
  };
};
