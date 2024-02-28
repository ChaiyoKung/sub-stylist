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

export async function sendChangeStyleMessage(isOn: boolean, style: Style) {
  console.log('send "changeStyle" message');
  const activeTab = await getActiveTab();

  if (!activeTab.id) {
    console.error("don't have active tab id");
    return;
  }

  await chrome.tabs.sendMessage(activeTab.id, { action: 'changeStyle', payload: { isOn, style } });
}
