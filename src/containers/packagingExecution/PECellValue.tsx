import { Stack } from "@mui/material";

type Props = {
  value1: any;
  value2?: any;
  unit: string;
  style: Record<string, any>;
}
const PECellValue = ({
  value1,
  value2,
  unit,
  style
}: Props) => {
  if (!value1 && !value2) {
    return "-"
  }
  if (value1 && value2) {
    return (
      <Stack gap={1} direction="row" alignItems="center">
        {value1} / {value2} <span style={style}>{unit}</span>
      </Stack>
    )
  }
  return (
    <Stack gap={1} direction="row" alignItems="center">
      {value1 || value2} <span style={style}>{unit}</span>
    </Stack>
  )
}

export default PECellValue
