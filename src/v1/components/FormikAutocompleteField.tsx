import { useState } from "react"

import { Field } from "formik"
import {
  Autocomplete,
  CircularProgress,
  styled,
  TextField
} from "@mui/material"
import { debounce } from "lodash"

const autocompleteSx = {
  textField: {
    "& .MuiInput-input": {
      cursor: "pointer"
    }
  }
}

export const StyledAutocompleteTextField = styled(TextField)({
  "& .MuiAutocomplete-inputRoot.MuiInputBase-root": {
    "&:before": {
      borderBottom: "none",
      "&:hover": {
        borderBottom: "none"
      }
    },
    "& .MuiAutocomplete-input": {
      padding: 4
    }
  },
  "& .MuiInput-input": {
    fontWeight: 600,
    fontSize: 14,
    color: "#414141"
  }
})

type FormikAutocomplete = {
  form: any
  loading: boolean
  label: string
  field: any
  key?: string
  readOnly?: boolean
  options: any[]
}
const FormikAutocomplete = ({
  form,
  loading,
  label,
  field,
  key = "1",
  readOnly = false,
  options = [],
  ...props
}: FormikAutocomplete) => {
  const { value } = field
  const { handleChange } = form

  return (
    <Autocomplete
      {...props}
      sx={{ flex: 1, pointer: "cursor" }}
      options={options}
      value={value}
      key={key}
      renderInput={(params: any) => (
        <TextField
          {...params}
          variant="standard"
          fullWidth
          label={label}
          sx={readOnly ? autocompleteSx.textField : null}
          onChange={handleChange}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
    />
  )
}

type FormikAutocompleteFieldProps = {
  setFieldValue: any
  name: string
  label?: string
  options: any[]
  getOptionLabel: (option: any) => string
  onSearch: (value: string) => Promise<void> | void
  key?: string
  onChange?: () => void
  [key: string]: any
}
const FormikAutocompleteField = ({
  setFieldValue,
  name,
  label,
  options,
  getOptionLabel, // { value (ex: objectId), data (parse object json)}
  onSearch,
  onChange,
  key,
  ...rest
}: FormikAutocompleteFieldProps) => {
  const [loading, setLoading] = useState(false)

  const handleChange = (_: any, newValue: Record<string, any>) => {
    setFieldValue(name, newValue.data)
    if (onChange) {
      onChange()
    }
  }

  const handleInputChange = debounce(
    (event: any, newValue: string) => {
      if (newValue && event?.type === "change") {
        setLoading(true)
        onSearch(newValue)
        setLoading(false)
      }
    },
    700
  )

  return (
    <Field
      name={name}
      label={label}
      loading={loading}
      component={FormikAutocomplete}
      options={options}
      isOptionEqualToValue={(option: Record<string, any>, value: Record<string, any>) =>
        value && option.value === value.objectId
      }
      getOptionLabel={(option: Record<string, any>) => getOptionLabel(option.data || option)}
      onChange={handleChange}
      onInputChange={handleInputChange}
      disableClearable
      key={key}
      {...rest}
    />
  )
}

export default FormikAutocompleteField
