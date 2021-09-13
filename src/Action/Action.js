export const add = (data) => ({
  type: "ADD",
  payload: data,
});

export const remove = (data) => ({
  type: "REMOVE",
  payload: data,
});

export const done = (data) => ({
  type: "done",
  payload: data,
});
