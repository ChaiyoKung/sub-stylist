import { Button, ColorPicker, InputLabel, Stack, Switch } from '@mantine/core';
import { useCallback } from 'react';
import { IoRefresh } from 'react-icons/io5';
import { useChromeSyncStorageState } from './hooks';
import {
  Style,
  defaultStyle,
  styleStorageKey,
  isOnStorageKey,
  defaultIsOn,
  IsOn,
  sendChangeStyleMessage,
} from './modules';

const mantinePaddingMd: number = 16;
const colorPickerWidth: number = 200;
const containerMinWidth: number = mantinePaddingMd + colorPickerWidth + mantinePaddingMd;
const defaultIconSize = 18;

export function App() {
  const [isOn, setIsOn] = useChromeSyncStorageState<IsOn>(isOnStorageKey, defaultIsOn);
  const [style, setStyle] = useChromeSyncStorageState<Style>(styleStorageKey, defaultStyle);

  const handleChangeOnOff = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsOn(() => {
        const checked = e.target.checked;
        sendChangeStyleMessage(checked, style);
        return checked;
      });
    },
    [setIsOn, style]
  );

  const handleChangeColor = useCallback(
    (property: keyof Style, value: string) => {
      setStyle((prev) => {
        const style = { ...prev, [property]: value };
        sendChangeStyleMessage(isOn, style);
        return style;
      });
    },
    [isOn, setStyle]
  );

  const handleChangeTextColor = useCallback(
    (value: string) => handleChangeColor('textColor', value),
    [handleChangeColor]
  );

  const handleChangeBgColor = useCallback(
    (value: string) => handleChangeColor('backgroundColor', value),
    [handleChangeColor]
  );

  const handleClickReset = useCallback(() => {
    setStyle(() => {
      sendChangeStyleMessage(isOn, defaultStyle);
      return defaultStyle;
    });
  }, [isOn, setStyle]);

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
