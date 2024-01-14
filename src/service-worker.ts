import { applyStyle, defaultStyle, isOnStorageKey, styleStorageKey } from './modules';

async function loadAndApplyStyle() {
  const states = await chrome.storage.sync.get([isOnStorageKey, styleStorageKey]);
  const isOn = states[isOnStorageKey];
  if (!isOn) {
    console.warn('now off');
    return;
  }

  const style = states[styleStorageKey];
  if (style !== undefined) {
    await applyStyle(style);
  } else {
    await applyStyle(defaultStyle);
  }
}

chrome.tabs.onUpdated.addListener(() => {
  loadAndApplyStyle();
});
