import { Stack, styled } from '@mui/material'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'

const StyledStack = styled(Stack)({
  width: '300px',
})

const StyledSlider = styled(Slider)({
  marginTop: '0.5em',
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function ImageParametersControls(props: {
  onFormChange: (args: any) => void
}) {
  const handleRChange = (event: Event) => {
    props.onFormChange({
      r: +(event.target as HTMLInputElement).value,
    })
  }

  const handleInitialPointsChange = (event: Event) => {
    props.onFormChange({
      initialPoints: +(event.target as HTMLInputElement).value,
    })
  }

  const handleSpeedChange = (event: Event) => {
    props.onFormChange({
      speed: +(event.target as HTMLInputElement).value,
    })
  }

  const handleFramesColorChange = (event: Event) => {
    props.onFormChange({
      framesColor: +(event.target as HTMLInputElement).value,
    })
  }

  return (
    <StyledStack>
      <Typography>Distance between shapes</Typography>
      <StyledSlider
        min={4}
        max={100}
        defaultValue={7}
        aria-label="Default"
        valueLabelDisplay="auto"
        size="small"
        onChange={handleRChange}
      />

      <Typography>Number of initial points</Typography>
      <StyledSlider
        min={1}
        max={15}
        defaultValue={3}
        aria-label="Default"
        valueLabelDisplay="auto"
        size="small"
        onChange={handleInitialPointsChange}
      />

      <Typography>Speed of animation</Typography>
      <StyledSlider
        min={1}
        max={500}
        defaultValue={25}
        aria-label="Default"
        valueLabelDisplay="auto"
        size="small"
        onChange={handleSpeedChange}
      />

      <Typography>Frames for Color change</Typography>
      <StyledSlider
        min={1}
        max={500}
        defaultValue={25}
        aria-label="Default"
        valueLabelDisplay="auto"
        size="small"
        onChange={handleFramesColorChange}
      />
    </StyledStack>
  )
}
