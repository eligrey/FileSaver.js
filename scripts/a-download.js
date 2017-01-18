/* global MouseEvent */

const click = node => {
  const event = new MouseEvent('click');
  node.dispatchEvent(event);
};

export default ({ view, name, objectUrl }) => new Promise(resolve => {
  const anchor = view.document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
  if (anchor.download === undefined) resolve(false);
  setTimeout(() => {
    anchor.href = objectUrl.create();
    anchor.download = name;
    click(anchor);
    resolve(true);
  });
});
