export const GetSlug = (string) => {
  const checkedString = string.includes("%") ? string.replace("%", "") : string
  const splitedString = checkedString.split(" ");
  const joinedString = splitedString.join("-");
  return joinedString
};

export const GetString = (slug) => {
  const splitedString = slug.split("-");
  const joinedString = splitedString.join(" ");
  return joinedString;
};

export const GetCapitalize = (name) => {
  const stringArray = name.split(" ");
  const firstLetters = stringArray.map((item) =>
    item.slice(0, 1).toUpperCase()
  );
  const otherLetters = stringArray.map((item) => item.slice(1));
  let words = [];
  for (let i = 0; i < stringArray.length; i++) {
    const capitalizedWords = firstLetters[i] + otherLetters[i];
    words = [...words, capitalizedWords];
  }
  return words.join(" ");
};

export const GetTitleRecipe = (titlePathname) => {
  if (titlePathname.endsWith("/")) {
    return titlePathname.replace("/", "");
  } else {
    return titlePathname;
  }
};

export const DynamicSort = (property) => {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      var result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}