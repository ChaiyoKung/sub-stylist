import { ColorPicker, InputLabel, Stack } from '@mantine/core';
import { useCallback, useState } from 'react';
import { Style } from './types';

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

  return (
    <Stack miw={232} p="md">
      <Stack gap="xs">
        <InputLabel htmlFor="text-color-picker">Text Color</InputLabel>
        <ColorPicker
          id="text-color-picker"
          format="rgba"
          value={style.textColor}
          onChange={handleChangeTextColor}
        />
      </Stack>
      <Stack gap="xs">
        <InputLabel htmlFor="background-color-picker">
          Background Color
        </InputLabel>
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
