/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';

const StyledSlider = styled(Slider)({
  marginTop: '0.5em',
});

const SliderWrapper = (props) => {
  return (
    <>
      <Typography>{props.label}</Typography>
      <StyledSlider
        min={props.min}
        max={props.max}
        defaultValue={props.defaultValue}
        aria-label="Default"
        valueLabelDisplay="auto"
        size="small"
        onChange={props.onChange}
      />
    </>
  );
};

export default SliderWrapper;
