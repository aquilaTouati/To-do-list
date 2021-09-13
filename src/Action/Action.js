export const add = (data) => ({
  type: "ADD",
  payload: data,
});

export const supprimer = (data) => ({
  type: "SUPPRIMER",
  payload: data,
});

export const done = (data) => ({
  type: "done",
  payload: data,
});
