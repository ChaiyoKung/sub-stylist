import { ColorPicker, InputLabel, Stack } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { Style } from './types';

const mantinePaddingMd: number = 16;
const colorPickerWidth: number = 200;
const containerMinWidth: number = mantinePaddingMd + colorPickerWidth + mantinePaddingMd;

const defaultStyle: Style = {
  textColor: 'rgba(255, 255, 255, 1)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
};

export function App() {
  const [style, setStyle] = useState<Style>(defaultStyle);

  const handleChangeTextColor = useCallback((value: string) => {
    setStyle((prev) => ({ ...prev, textColor: value }));
  }, []);

  const handleChangeBgColor = useCallback((value: string) => {
    setStyle((prev) => ({ ...prev, backgroundColor: value }));
  }, []);

  useEffect(() => {
    const applyStyle = async () => {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

      const activeTab = tabs[0];
      if (!activeTab.id) {
        console.error('active tab id is none');
        return;
      }
      console.debug('activeTab:', activeTab);

      let css: string = '';
      const isNetflix = activeTab.url?.startsWith('https://www.netflix.com/watch/');
      if (isNetflix) {
        css = `
          .player-timedtext > .player-timedtext-text-container > span > span {
            color: ${style.textColor} !important;
            background-color: ${style.backgroundColor} !important;
          }
        `;
      }
      await chrome.scripting.insertCSS({
        target: { tabId: activeTab.id },
        css: css,
      });
    };

    applyStyle();
  }, [style]);

  return (
    <Stack miw={containerMinWidth} p="md">
      <Stack gap="xs">
        <InputLabel htmlFor="text-color-picker">Text Color</InputLabel>
        <ColorPicker id="text-color-picker" format="rgba" value={style.textColor} onChange={handleChangeTextColor} />
      </Stack>
      <Stack gap="xs">
        <InputLabel htmlFor="background-color-picker">Background Color</InputLabel>
        <ColorPicker
          id="background-color-picker"
          format="rgba"
          value={style.backgroundColor}
          onChange={handleChangeBgColor}
        />
      </Stack>
    </Stack>
  );
}

export default App;
