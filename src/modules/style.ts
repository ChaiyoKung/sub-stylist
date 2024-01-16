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

export async function applyStyle(style: Style) {
  const activeTab = await getActiveTab();
  if (!activeTab.id) {
    console.error("don't have active tab id");
    return;
  }

  const startWith = (url: string): boolean => {
    if (!activeTab.url) {
      console.error("don't have active tab url");
      return false;
    }
    return activeTab.url.startsWith(url);
  };

  let css: string = '';
  if (startWith('https://www.netflix.com/watch/')) {
    css = `
      .player-timedtext > .player-timedtext-text-container > span > span {
        color: ${style.textColor} !important;
        background-color: ${style.backgroundColor} !important;
      }
    `;
  }

  if (css) {
    await chrome.scripting.insertCSS({
      target: { tabId: activeTab.id },
      css: css,
    });
  }
}

export async function removeStyle(style: Style) {
  const activeTab = await getActiveTab();
  if (!activeTab.id) {
    console.error("don't have active tab id");
    return;
  }

  const startWith = (url: string): boolean => {
    if (!activeTab.url) {
      console.error("don't have active tab url");
      return false;
    }
    return activeTab.url.startsWith(url);
  };

  let css: string = '';
  if (startWith('https://www.netflix.com/watch/')) {
    css = `
      .player-timedtext > .player-timedtext-text-container > span > span {
        color: ${style.textColor} !important;
        background-color: ${style.backgroundColor} !important;
      }
    `;
  }

  if (css) {
    await chrome.scripting.removeCSS({
      target: { tabId: activeTab.id },
      css: css,
    });
  }
}
