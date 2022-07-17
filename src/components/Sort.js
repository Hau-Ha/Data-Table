/* eslint-disable eqeqeq */

export function isString(value) {
  return typeof value === "string" || value instanceof String;
}

export function isNumber(value) {
  return typeof value == "number" && !isNaN(value);
}

export function isBoolean(value) {
  return value === true || value === false;
}

export function isNil(value) {
  return typeof value === "undefined" || value === null;
}

export function isDateString(value) {
  if (!isString(value)) return false;

  return value.match(/^\d{2}-\d{2}-\d{4}$/);
}

export function convertDateString(value) {
  return value.substr(6, 4) + value.substr(3, 2) + value.substr(0, 2);
}

export function toLower(value) {
  if (isString(value)) {
    return value.toLowerCase();
  }
  return value;
}

export function convertType(value) {
  if (isNumber(value)) {
    return value.toString();
  }

  if (isDateString(value)) {
    return convertDateString(value);
  }

  if (isBoolean(value)) {
    return value ? "1" : "-1";
  }

  return value;
}

export function Sort(rows, sort) {
  return rows.sort((a, b) => {
    const { order, orderBy } = sort;

    if (isNil(a[orderBy])) return 1;

    if (isNil(b[orderBy])) return -1;

    const aLocale = convertType(a[orderBy]);
    const bLocale = convertType(b[orderBy]);

    if (order === "asc") {
      return aLocale.localeCompare(bLocale, "en", {
        numeric: isNumber(b[orderBy]),
      });
    } else {
      return bLocale.localeCompare(aLocale, "en", {
        numeric: isNumber(a[orderBy]),
      });
    }
  });
}

export function paginateRows(sortedRows, activePage, rowsPerPage) {
  return [...sortedRows].slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage
  );
}
