import {FormControl, FormHelperText, InputLabel, OutlinedInput} from "@material-ui/core";
import {ErrorMessage, Field} from "formik";
import {useTranslation} from "react-i18next";

const OutlinedFormikInput = ({name, label, error, placeholder = "Type...", ...props}) => {
    const {t, i18n} = useTranslation()

    return (
        <FormControl error={error} fullWidth variant="outlined" margin="normal" key={i18n.language}>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <Field id={name} name={name} label={label}
                   placeholder={placeholder} {...props} as={OutlinedInput}/>
            <ErrorMessage name={name} component={FormHelperText}>
                {
                    (msg) => <FormHelperText>{t(msg)}</FormHelperText>
                }
            </ErrorMessage>
        </FormControl>
    )
}

export default OutlinedFormikInput;