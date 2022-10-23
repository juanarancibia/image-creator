import { Stack } from '@mui/material';
import SliderWrapper from 'components/Generic/SliderWrapper';
import { MuiColorInput } from 'mui-color-input';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import styled from 'styled-components';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { COLOR_PALETTES } from 'shared/constants/color-palettes.const';

const StyledStack = styled(Stack)`
  width: '300px';
`;

const StyledColorPicker = styled(MuiColorInput)`
  input {
    background-color: #070707;
    color: white;
  }
`;

const StyledSelect = styled(Select)`
  color: white;
  border: 1px solid #ffffff24;
`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function ImageParametersControls(props: {
  onFormChange: (args: any) => void;
}) {
  const [bgColor, setBgColor] = useState('#fff1db');
  const [colorPalette, setColorPalette] = useState('repetition');

  const handleRChange = (event: Event) => {
    props.onFormChange({
      r: +(event.target as HTMLInputElement).value,
    });
  };

  const handleInitialPointsChange = (event: Event) => {
    props.onFormChange({
      initialPoints: +(event.target as HTMLInputElement).value,
    });
  };

  const handleSpeedChange = (event: Event) => {
    props.onFormChange({
      speed: +(event.target as HTMLInputElement).value,
    });
  };

  const handleFramesColorChange = (event: Event) => {
    props.onFormChange({
      framesColor: +(event.target as HTMLInputElement).value,
    });
  };

  const handleBgColorChange = (value: string) => {
    setBgColor(value);
    props.onFormChange({
      bgColor: value,
    });
  };

  const handleColorPaletteChange = (event: SelectChangeEvent<string>) => {
    setColorPalette(event.target.value);
    props.onFormChange({
      colorPalette: COLOR_PALETTES[event.target.value],
    });
  };

  return (
    <StyledStack>
      <SliderWrapper
        label="Distance between shapes"
        min={4}
        max={100}
        defaultValue={7}
        onChange={handleRChange}
      />
      <SliderWrapper
        label="Number of initial points"
        min={1}
        max={50}
        defaultValue={3}
        onChange={handleInitialPointsChange}
      />

      <SliderWrapper
        label="Speed of animation"
        min={1}
        max={500}
        defaultValue={25}
        onChange={handleSpeedChange}
      />
      <SliderWrapper
        label="Frames for Color change"
        min={1}
        max={500}
        defaultValue={25}
        onChange={handleFramesColorChange}
      />

      <Typography className="my-2">Background color</Typography>
      <StyledColorPicker
        format="hex8"
        value={bgColor}
        variant="outlined"
        onChange={handleBgColorChange}
      />

      <Typography className="my-2">Color Palette</Typography>
      <StyledSelect
        labelId="color-palette-label"
        label="Color palette"
        value={colorPalette}
        onChange={handleColorPaletteChange}
        style={{ marginBottom: '1em' }}
      >
        {Object.keys(COLOR_PALETTES).map((palette) => (
          <MenuItem key={palette} value={palette}>
            {palette}
          </MenuItem>
        ))}
      </StyledSelect>
    </StyledStack>
  );
}
