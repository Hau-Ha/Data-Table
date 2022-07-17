/* eslint-disable eqeqeq */
import React from "react";
export function isEmpty(obj = {}) {
  return Object.keys(obj).length === 0;
}

export function isString(value) {
  return typeof value === "string" || value instanceof String;
}

export function isDateString(value) {
  if (!isString(value)) return false;

  return value.match(/^\d{2}-\d{2}-\d{4}$/);
}

export function toLower(value) {
  if (isString(value)) {
    return value.toLowerCase();
  }
  return value;
}

export function isNumber(value) {
  return typeof value == "number" && !isNaN(value);
}

export function isBoolean(value) {
  return value === true || value === false;
}

export function Filter(rows, filters) {
  if (isEmpty(filters)) return rows;

  return rows.filter((row) => {
    return Object.keys(filters).every((accessor) => {
      const value = row[accessor];
      const searchValue = filters[accessor];

      if (isString(value)) {
        return toLower(value).includes(toLower(searchValue));
      }

      if (isBoolean(value)) {
        return (
          (searchValue === "true" && value) ||
          (searchValue === "false" && !value)
        );
      }

      if (isNumber(value)) {
        return value == searchValue;
      }

      return false;
    });
  });
}
