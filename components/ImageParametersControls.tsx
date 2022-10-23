import { Stack, styled } from '@mui/material';
import SliderWrapper from 'components/Generic/SliderWrapper';
import { MuiColorInput } from 'mui-color-input';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const StyledStack = styled(Stack)({
  width: '300px',
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function ImageParametersControls(props: {
  onFormChange: (args: any) => void;
}) {
  const [bgColor, setBgColor] = useState('#fff1db');

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
      <MuiColorInput
        format="hex8"
        value={bgColor}
        onChange={handleBgColorChange}
      />
    </StyledStack>
  );
}
