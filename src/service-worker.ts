import { applyStyle, defaultStyle, styleStorageKey } from './modules';

async function loadAndApplyStyle() {
  const states = await chrome.storage.sync.get(styleStorageKey);
  const state = states[styleStorageKey];
  if (state !== undefined) {
    await applyStyle(state);
  } else {
    await applyStyle(defaultStyle);
  }
}

chrome.tabs.onUpdated.addListener(() => {
  loadAndApplyStyle();
});
