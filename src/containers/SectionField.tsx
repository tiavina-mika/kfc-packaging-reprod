import Typography from '@mui/material/Typography';
import { Button, Card, Stack, styled } from '@mui/material';
import { FormikErrors } from 'formik';
import { COLORS } from '../utils/constants';
import WeightInput from './WeightInput';

const primaryColor = COLORS.primary
const errorColor = COLORS.error
const activeColor = COLORS.active

const StyleCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "hasError"
})(({ isSelected = false, hasError = false }: { isSelected: boolean; hasError: boolean }) => {
  const styles: Record<string, any> = {
    padding: '0px 16px',
    borderRadius: '6px',
    border: '1px solid #E6E6E6',
    background: '#FFF',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    cursor: 'pointer',
    boxShadow: 'none',
    flex: 1,
    height: '140px',
    '& img': {
      width: '32px',
      height: '32px',
    },
  }

  if (isSelected && !hasError) {
    styles.border = '2px solid ' + activeColor
  } else if (hasError) {
    styles.border = '1px solid ' + errorColor
  }

  return styles
})

const sx = {
  weightContainer: {
    padding: '32px 0px',
    gap: '16px'
  },
  reasonLabel: {
    color: primaryColor,
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '157.1%',
  },
};

const reasons = [
  { value: 'broken', label: 'Casse', icon: 'packaging-broken' },
  { value: 'weighing-regularization', label: 'Manquant', icon: 'packaging-weighing-regularization' },
  { value: 'other', label: 'Autre', icon: 'packaging-help' },
]

export type SectionFieldProps = {
  values: Record<string, any>[]
  setFieldValue: (field: string, value: any) => void
  errors?: Record<string, any>[] | string | undefined | string[] | FormikErrors<any> | FormikErrors<any>[],
  sectionIndex: number
  section: Record<string, any>
  setFieldTouched?: (field: string) => void
  touched?: Record<string, any>
}

const SectionField = ({
  values = [],
  errors,
  setFieldValue,
  sectionIndex,
  section,
  setFieldTouched,
  touched,
}: SectionFieldProps) => {
  const handleSelectReason = (reason: Record<string, any>, sectionIndex: number) => {
    setFieldValue(`sections[${sectionIndex}].counterWeighing.reason`, reason.value)
  }

  const handleChangeWeight = (sectionIndex: number) => (value: number) => {
    setFieldValue(`sections[${sectionIndex}].counterWeighing.weight`, value)
    if (!setFieldTouched) return
    setFieldTouched(`sections[${sectionIndex}].counterWeighing.weight`);
  }

  const handleResetSection = (section: Record<string, any>, sectionIndex: number) => {
    const prevSection = { ...section }
    delete prevSection.counterWeighing
    setFieldValue(`sections[${sectionIndex}]`, prevSection)
  }

  const hasGlobalError = errors && typeof errors === 'string'

  return (
    <Stack alignItems="center" spacing={16 / 6}>
      {/* ------- top: weight ------- */}
      <WeightInput
        value={values[sectionIndex]?.counterWeighing?.weight || 0}
        onChange={handleChangeWeight(sectionIndex)}
        label="Poids initiale"
        valueLabel={125}
        subtitle="kg"
        inputLabel="Poids de la contre-pesée"
        hasError={
          // individual section error: when weight is not defined
          !!(errors && (errors as any)[sectionIndex]?.counterWeighing?.weight)
          // global error: for all sections
          || !!hasGlobalError
        }
        sxRoot={sx.weightContainer}
        isTouched={touched?.sections && touched.sections[sectionIndex]?.counterWeighing?.weight}
      />
      {/* -------- bottom: reason -------- */}
      <Stack spacing={16 / 6} sx={{ alignSelf: "stretch" }}>
        {/* list of reasons */}
        <Stack direction="row" sx={{ gap: "16px", alignSelf: "stretch" }}>
          {reasons.map((reason: Record<string, any>, reasonIndex: number) => {
            const isSelectedReason = values[sectionIndex]?.counterWeighing?.reason === reason.value
            return (
              <StyleCard
                key={reason.value + reasonIndex}
                onClick={() => handleSelectReason(reason, sectionIndex)}
                isSelected={isSelectedReason}
                hasError={
                  // individual section error: when weight is defined but reason is not
                  !!errors && (errors as any)[sectionIndex]?.counterWeighing?.reason
                  // global error: for all sections
                  || !!hasGlobalError
                }
              >
                <img alt={reason.label} src={`/icons/${reason.icon}${isSelectedReason ? '-active' : ''}.svg`} />
                <Typography sx={sx.reasonLabel}>
                  {reason.label}
                </Typography>
              </StyleCard>
            )
          })}
        </Stack>
        {/* reset button */}
        {section.counterWeighing && (
          <div>
            <Button variant="outlined" color="primary" onClick={() => handleResetSection(section, sectionIndex)}>
              Faire une nouvelle contre-pesée
            </Button>
          </div>
        )}
        {/* reason error message */}
        {errors && (errors as any)[sectionIndex]?.counterWeighing?.reason && (
          <Typography color="error" variant="caption">
            {(errors as any)[sectionIndex]?.counterWeighing.reason}
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}

export default SectionField; 