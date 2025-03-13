import { Stack } from "@mui/material"
import Typography from "@mui/material/Typography"
import { COLORS } from "../../utils/constants"
import { ReactNode } from "react"

const sx = {
		title: {
			fontSize: "14px",
			lineHeight: 1.571,
			color: COLORS.BLACK800,
			fontWeight: 500,
		}
}

type Props = {
	icon: string;
	title: string;
	description?: string;
	children: ReactNode;
}
const PEReprodTableContainer = ({
	icon,
	title,
	description,
	children
}: Props) => {

	return (
    <>
      <Stack spacing={1} direction="row">
        <img src={`img/packagingExecutions/${icon}`} alt={icon} />
        <Typography variant="h6" sx={sx.title}>
          {title}
        </Typography>
      </Stack>
			{description && (
				<Typography sx={{ fontSize:"16px", lineHeight:"24px", color:"#7C7C7C"}}>
					{description}
			</Typography>
			)}
      {children}
    </>
	)
}


export default PEReprodTableContainer
