export const sortingBy = (order, FieldName, todoList) => {
  const sortedTodoList = [...todoList];
  sortedTodoList.sort((objectA, objectB) => {
    const valA =
      FieldName === "createdTime"
        ? objectA[FieldName]
        : FieldName === "done" && objectA.fields[FieldName] === undefined
        ? (objectA.fields[FieldName] = false)
        : objectA.fields[FieldName];
    const valB =
      FieldName === "createdTime"
        ? objectB[FieldName]
        : FieldName === "done" && objectB.fields[FieldName] === undefined
        ? (objectB.fields[FieldName] = false)
        : objectB.fields[FieldName];
    if (order === "asc") {
      return valA < valB ? -1 : valA > valB ? 1 : 0;
    } else {
      return valA < valB ? 1 : valA > valB ? -1 : 0;
    }
  });
  return sortedTodoList;
};
