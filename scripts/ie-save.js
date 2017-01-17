export default ({ view, name, blob }) => {
  if (view.navigator && view.navigator.msSaveOrOpenBlob) {
    view.navigator.msSaveOrOpenBlob(blob, name);
    return Promise.resolve(true);
  }
  return Promise.resolve(false);
};
