import { z } from 'zod';
import { getActiveTab } from '../libs';

export const styleSchema = z.object({
  textColor: z.string(),
  backgroundColor: z.string(),
});

export type Style = z.infer<typeof styleSchema>;

export const styleStorageKey: string = 'style';

export const defaultStyle: Style = {
  textColor: 'rgba(255, 255, 255, 1)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
};

export function getPlatformOverrideCss(url: string, style: Style) {
  //
  // Netflix
  //
  if (url.startsWith('https://www.netflix.com/watch/')) {
    return `
      .player-timedtext > .player-timedtext-text-container > span > span {
        color: ${style.textColor} !important;
        background-color: ${style.backgroundColor} !important;
      }
    `;
  }

  //
  // Other will append below
  //
}

export async function applyStyle(style: Style) {
  const activeTab = await getActiveTab();

  if (!activeTab.id) {
    console.error("don't have active tab id");
    return;
  }

  if (!activeTab.url) {
    console.error("don't have active tab url");
    return;
  }

  const css = getPlatformOverrideCss(activeTab.url, style);
  if (!css) {
    console.error('this platform not support');
    return;
  }

  await chrome.scripting.insertCSS({
    target: { tabId: activeTab.id },
    css: css,
  });
}

export async function removeStyle(style: Style) {
  const activeTab = await getActiveTab();

  if (!activeTab.id) {
    console.error("don't have active tab id");
    return;
  }

  if (!activeTab.url) {
    console.error("don't have active tab url");
    return;
  }

  const css = getPlatformOverrideCss(activeTab.url, style);
  if (!css) {
    console.error('this platform not support');
    return;
  }

  await chrome.scripting.removeCSS({
    target: { tabId: activeTab.id },
    css: css,
  });
}
