export const sortingBy = (order, FieldName, todoList) => {
  const newisChecke = JSON.parse(localStorage.getItem("isChecked")) || false; // Get from local storage or 'false' by default
  const newSortingFieldName =
    localStorage.getItem("sortingFieldName") || "createdTime"; // Get from local storage or 'createdTime' by default

  order = order !== null ? order : newisChecke ? "asc" : "desc";
  FieldName = FieldName !== null ? FieldName : newSortingFieldName;

  console.log(order, FieldName);

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
  console.log(JSON.stringify(sortedTodoList));
  return sortedTodoList;
};
