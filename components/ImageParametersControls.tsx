import { Stack } from '@mui/material';
import SliderWrapper from 'components/Generic/SliderWrapper';
import { MuiColorInput } from 'mui-color-input';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import styled from 'styled-components';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { COLOR_PALETTES } from 'shared/constants/color-palettes.const';
import { SHAPES } from 'shared/constants/shapes.const';

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
  text-transform: capitalize;
`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function ImageParametersControls(props: {
  onFormChange: (args: any) => void;
}) {
  const [bgColor, setBgColor] = useState('#fff1db');
  const [colorPalette, setColorPalette] = useState('repetition');
  const [shape, setShape] = useState(SHAPES.LINE);

  const handleRChange = (event: Event) => {
    props.onFormChange({
      r: +(event.target as HTMLInputElement).value,
    });
  };

  const handleOverlappingFactorChange = (event: Event) => {
    props.onFormChange({
      overlappingFactor: +(event.target as HTMLInputElement).value,
    });
  };

  const handleInitialPointsChange = (event: Event) => {
    props.onFormChange({
      initialPoints: +(event.target as HTMLInputElement).value,
    });
  };

  const handleStrokeWeightChange = (event: Event) => {
    props.onFormChange({
      strokeWeight: +(event.target as HTMLInputElement).value,
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

  const handleAlphaChange = (event: Event) => {
    const hexValue = (+(event.target as HTMLInputElement).value).toString(16);
    props.onFormChange({
      alpha:
        +(event.target as HTMLInputElement).value < 16
          ? '0' + hexValue
          : hexValue,
    });
  };

  const handleShapeChange = (event: SelectChangeEvent<string>) => {
    setShape(event.target.value);
    props.onFormChange({
      shape: event.target.value,
    });
  };

  const handleLineAngleChange = (event: Event) => {
    props.onFormChange({
      lineAngle: +(event.target as HTMLInputElement).value,
    });
  };

  const handleCircleSizeChange = (event: Event) => {
    props.onFormChange({
      circleSize: +(event.target as HTMLInputElement).value,
    });
  };

  const handleCircleLayersChange = (event: Event) => {
    props.onFormChange({
      circleLayers: +(event.target as HTMLInputElement).value,
    });
  };

  return (
    <StyledStack>
      <SliderWrapper
        label="Distance between shapes"
        min={1}
        max={100}
        defaultValue={7}
        onChange={handleRChange}
      />
      <SliderWrapper
        label="Overlapping factor"
        min={0}
        max={7}
        defaultValue={0}
        onChange={handleOverlappingFactorChange}
      />

      <SliderWrapper
        label="Number of initial points"
        min={1}
        max={50}
        defaultValue={3}
        onChange={handleInitialPointsChange}
      />

      <SliderWrapper
        label="Stroke weight"
        min={1}
        max={10}
        defaultValue={2}
        onChange={handleStrokeWeightChange}
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

      <SliderWrapper
        label="Color palette opacity"
        min={0}
        max={255}
        defaultValue={255}
        onChange={handleAlphaChange}
      />

      <Typography className="my-2">Shape</Typography>
      <StyledSelect
        value={shape}
        onChange={handleShapeChange}
        style={{ marginBottom: '1em' }}
      >
        {Object.values(SHAPES).map((shape) => (
          <MenuItem key={shape} value={shape}>
            {shape}
          </MenuItem>
        ))}
      </StyledSelect>

      {shape === SHAPES.LINE && (
        <SliderWrapper
          label="Line angle"
          min={-1}
          max={180}
          defaultValue={45}
          onChange={handleLineAngleChange}
        />
      )}

      {shape === SHAPES.CIRCLES && (
        <>
          <SliderWrapper
            label="Max circle size"
            min={10}
            max={1500}
            defaultValue={200}
            onChange={handleCircleSizeChange}
          />
          <SliderWrapper
            label="Number of layers"
            min={1}
            max={1000}
            defaultValue={7}
            onChange={handleCircleLayersChange}
          />
        </>
      )}
    </StyledStack>
  );
}
