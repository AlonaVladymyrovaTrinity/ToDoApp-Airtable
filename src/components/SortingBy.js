import PropTypes from "prop-types";

export const sortingBy = (order, FieldName, todoList) => {
  const newisChecke = JSON.parse(localStorage.getItem("isAscending")) || false; // Get from local storage or 'false' by default
  const newSortingFieldName =
    localStorage.getItem("sortingFieldName") || "createdTime"; // Get from local storage or 'createdTime' by default

  order = order !== null ? order : newisChecke ? "asc" : "desc";
  FieldName = FieldName !== null ? FieldName : newSortingFieldName;
  const sortedTodoList = [...todoList];
  // The function is sorting an array of objects, 'sortedTodoList', based on the value of the 'FieldName' parameter.
  // It compares the values of two objects, 'objectA' and 'objectB', using the values of the field specified by 'FieldName'.
  // The sorting direction is determined by the 'order' parameter, which can be either "asc" (ascending) or "desc" (descending).
  // The function returns the sorted array 'sortedTodoList'.
  sortedTodoList.sort((objectA, objectB) => {
    const valA =
      FieldName === "createdTime"
        ? objectA[FieldName]
        : FieldName === "Title" && objectA[FieldName]
        ? objectA[FieldName]
        : FieldName === "done" && objectA.fields[FieldName] === undefined
        ? (objectA.fields[FieldName] = false)
        : objectA.fields[FieldName];
    const valB =
      FieldName === "createdTime"
        ? objectB[FieldName]
        : FieldName === "Title" && objectB[FieldName]
        ? objectB[FieldName]
        : FieldName === "done" && objectB.fields[FieldName] === undefined
        ? (objectB.fields[FieldName] = false)
        : objectB.fields[FieldName];
    // If the FieldName is "Title", the function uses the localeCompare() method to compare the two string values
    // valA and valB, taking into account locale-specific sorting rules and options such as sensitivity: 'base',
    // which means that it will perform a case-insensitive comparison.
    if (order === "asc") {
      if (FieldName === "Title") {
        return valA.localeCompare(valB, undefined, { sensitivity: "base" });
      } else {
        return valA < valB ? -1 : valA > valB ? 1 : 0;
      }
    } else {
      if (FieldName === "Title") {
        return valB.localeCompare(valA, undefined, { sensitivity: "base" });
      } else {
        return valA < valB ? 1 : valA > valB ? -1 : 0;
      }
    }
  });
  // console.log(JSON.stringify(sortedTodoList));
  return sortedTodoList;
};

sortingBy.propTypes = {
  order: PropTypes.string,
  FieldName: PropTypes.string,
  todoList: PropTypes.array,
};
