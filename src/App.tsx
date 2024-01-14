import { Button, ColorPicker, InputLabel, Stack, Switch } from '@mantine/core';
import { useCallback, useEffect } from 'react';
import { IoRefresh } from 'react-icons/io5';
import { useChromeSyncStorageState } from './hooks';
import { Style, defaultStyle, applyStyle, styleStorageKey, isOnStorageKey, defaultIsOn } from './modules';

const mantinePaddingMd: number = 16;
const colorPickerWidth: number = 200;
const containerMinWidth: number = mantinePaddingMd + colorPickerWidth + mantinePaddingMd;
const defaultIconSize = 18;

export function App() {
  const [isOn, setIsOn] = useChromeSyncStorageState<boolean>(isOnStorageKey, defaultIsOn);
  const [style, setStyle] = useChromeSyncStorageState<Style>(styleStorageKey, defaultStyle);

  const handleChangeOnOff = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsOn(e.currentTarget.checked);
    },
    [setIsOn]
  );

  const handleChangeTextColor = useCallback(
    (value: string) => {
      setStyle((prev) => ({ ...prev, textColor: value }));
    },
    [setStyle]
  );

  const handleChangeBgColor = useCallback(
    (value: string) => {
      setStyle((prev) => ({ ...prev, backgroundColor: value }));
    },
    [setStyle]
  );

  const handleClickReset = useCallback(() => {
    setStyle(defaultStyle);
  }, [setStyle]);

  useEffect(() => {
    if (isOn) {
      applyStyle(style);
    }
  }, [isOn, style]);

  return (
    <Stack miw={containerMinWidth} p="md">
      <Stack>
        <Switch onLabel="On" offLabel="Off" color="green" size="md" checked={isOn} onChange={handleChangeOnOff} />
      </Stack>
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
      <Stack>
        <Button leftSection={<IoRefresh size={defaultIconSize} />} onClick={handleClickReset}>
          Reset
        </Button>
      </Stack>
    </Stack>
  );
}

export default App;
