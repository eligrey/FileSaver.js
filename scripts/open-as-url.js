export default ({ view, objectUrl, isOctetStream }) => {
  if (isOctetStream) {
    view.location.assign(objectUrl);
    return Promise.resolve(true);
  }
  if (!view.open(objectUrl, '_blank')) {
    // Apple does not allow window.open
    // see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
    view.location.assign(objectUrl);
  }
  return Promise.resolve(true);
};
