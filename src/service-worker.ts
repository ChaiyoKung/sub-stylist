import { applyStyle, defaultStyle, isOnSchema, isOnStorageKey, styleSchema, styleStorageKey } from './modules';

async function loadAndApplyStyle() {
  const states = await chrome.storage.sync.get([isOnStorageKey, styleStorageKey]);
  const isOn = isOnSchema.optional().parse(states[isOnStorageKey]);
  if (!isOn) {
    console.warn('now off');
    return;
  }

  const style = styleSchema.optional().parse(states[styleStorageKey]);
  if (style !== undefined) {
    await applyStyle(style);
  } else {
    await applyStyle(defaultStyle);
  }
}

chrome.tabs.onUpdated.addListener(() => {
  loadAndApplyStyle();
});
