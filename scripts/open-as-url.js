export default ({ view, objectUrl, isOctetStream }) => {
  const oUrl = objectUrl.create();
  if (isOctetStream) {
    view.location.assign(oUrl);
  } else if (!view.open(oUrl, '_blank')) {
    // Apple does not allow window.open
    // see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
    view.location.assign(oUrl);
  }
  return Promise.resolve(true);
};
