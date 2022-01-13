interface Object {
  [x: string]: any;
}

export const flattenObject = (
  obj: Object,
  parent?: string,
  res: Object = {}
) => {
  for (let key in obj) {
    let propName = parent ? parent + '.' + key : key;
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      flattenObject(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
};
