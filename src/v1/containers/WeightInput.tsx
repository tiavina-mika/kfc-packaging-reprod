import Typography from '@mui/material/Typography';
import { Box, Stack, styled, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { COLORS } from '../utils/constants';

const primaryColor = COLORS.primary
const errorColor = COLORS.error
const activeColor = COLORS.active
const grayColor = COLORS.gray

const StyledWeightInput = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "isPositiveNumber"
})(({ isPositiveNumber = false, isTouched = false }: { isPositiveNumber: boolean; isTouched: boolean }) => {
  const styles: Record<string, any> = {
    flex: 1,
    padding: 0,
    '& .MuiOutlinedInput-notchedOutline': {
      textAlign: 'center',
      border: 'none'
    },
    '& .MuiInputBase-input': {
      fontSize: '40px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '120%',
      padding: 0,
      minWidth: 48,
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      // remove arrows for chrome, safari, edge
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
      },
      // remove arrows for firefox
      '&[type=number]': {
        '-moz-appearance': 'textfield'
      }
    }
  }

  if (isPositiveNumber) {
    styles['& .MuiInputBase-input'] = {
      ...styles['& .MuiInputBase-input'],
      color: activeColor
    }
  } else if (!isTouched) {
    styles['& .MuiInputBase-input'] = {
      ...styles['& .MuiInputBase-input'],
      color: "#ccc"
    }
  }

  return styles
})

const StyledWeightInputBorderBottom = styled("div", {
  shouldForwardProp: (prop) => prop !== "isPositiveNumber" && prop !== "hasError"
})(({ isPositiveNumber = false, hasError = false }: { isPositiveNumber: boolean; hasError: boolean }) => {
  const styles: Record<string, any> = {
    height: 2,
    width: 68,
    backgroundColor: grayColor
  }

  if (isPositiveNumber) {
    styles.backgroundColor = activeColor
  }

  if (hasError) {
    styles.backgroundColor = errorColor
  }

  return styles
})

const sx = {
  weightContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weightColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    width: 120
  },
  weightLabel: {
    color: primaryColor,
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '140%',
    textAlign: 'center',
    flex: 1
  },
  weightValueContainer: {
    height: 46, // important to keep the height of the card
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 0
  },
  weightValue: {
    color: primaryColor,
    fontSize: '40px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '120%',
  },
  weightUnit: {
    color: grayColor,
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '100%',
  },
  reasonLabel: {
    color: primaryColor,
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '157.1%',
  },
  weightInput: {
    flex: 1,
    padding: 0,
    '& .MuiOutlinedInput-notchedOutline': {
      textAlign: 'center',
      border: 'none'
    },
    '& .MuiInputBase-input': {
      fontSize: '40px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '120%',
      padding: 0,
      minWidth: 48,
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
    }
  },
};

type Props = {
  value: number
  hasError: boolean
  label: string
  valueLabel: string | number
  subtitle: string
  inputLabel: string
  onChange: (value: number) => void
  sxColumn?: Record<string, any>
  sxRoot?: Record<string, any>
  isTouched?: boolean
}

const WeightInput = ({
  value,
  hasError,
  onChange,
  label,
  valueLabel,
  subtitle,
  inputLabel,
  sxColumn,
  sxRoot,
  isTouched = false
}: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(+event.target.value)
  }

  return (
    <Box sx={{ ...sx.weightContainer, ...sxRoot }}>
      <Stack direction="row" sx={{ gap: "96px" }}>
        {/* label */}
        <Box sx={{ ...sx.weightColumn, ...sxColumn }}>
          <Typography sx={sx.weightLabel}>
            {label}
          </Typography>
          <Box sx={sx.weightValueContainer}>
            <Typography sx={sx.weightValue}>
              {valueLabel}
            </Typography>
          </Box>
          <Typography sx={sx.weightUnit}>
            {subtitle}
          </Typography>
        </Box>
        {/* value */}
        <Box sx={{ ...sx.weightColumn, ...sxColumn }}>
          <Typography sx={sx.weightLabel}>
            {inputLabel}
          </Typography>
          <Box sx={sx.weightValueContainer}>
            <StyledWeightInput
              type="number"
              value={value}
              onChange={handleChange}
              isPositiveNumber={value > 0}
              isTouched={isTouched}
            />
            <StyledWeightInputBorderBottom
              hasError={hasError}
              isPositiveNumber={value > 0}
            />
          </Box>
          <Typography sx={sx.weightUnit}>
            {subtitle}
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}

export default WeightInput; 