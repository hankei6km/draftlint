export function pruneClasses(
  classes: { [key: string]: string } | undefined,
  classNames: string[]
) {
  const ret: { [key: string]: string } = {};
  if (classes) {
    classNames.forEach((className) => {
      if (className in classes) {
        ret[className] = classes[className];
      }
    });
  }
  return ret;
}

export function classNameFromConfigField(
  classes: { [key: string]: string } | undefined,
  className: string
): string {
  if (classes === undefined) {
    return '';
  }
  const names = Object.entries(classes).filter((kv) => kv[0] === className);
  if (names.length > 0) {
    return names[0][1];
  }
  return '';
}

export function classNamesFromConfigField(
  classes: { [key: string]: string } | undefined,
  className: string
): string {
  if (classes === undefined) {
    return '';
  }
  const r = new RegExp(`^${className}|^${className}-.+`);
  const names = Object.entries(classes).filter((kv) => r.test(kv[0]));
  if (names.length > 0) {
    return names.map((kv) => kv[1]).join(' ');
  }
  return '';
}

export function wrapStyle(name: string, style: { [key: string]: any }) {
  const s: { [key: string]: { [key: string]: any } } = {};
  s[name] = { ...style };
  return s;
}
