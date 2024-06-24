
import { PhoneNumberUtil } from "google-libphonenumber";
import { defaultTo } from "ramda";
import countryCodes from './country-code-data.json'
import { FormValuesWithPhoneNumber, FormWithPhoneNumber } from "./types";
import * as yup from 'yup';
import { requiredMessage } from "@/constants";


export const phoneUtility = PhoneNumberUtil.getInstance();

export const getCountryPrefix = (countryCode: string) => `+${defaultTo(
    "",
    countryCodes
        .find((el) => el.label.match(countryCode))
        ?.label.split(" ")[1]
)}`;

export const getPhoneNumberFromForm = <T extends FormValuesWithPhoneNumber>(form: FormWithPhoneNumber<T>) => phoneUtility.formatOutOfCountryCallingNumber(
    phoneUtility.parse(
        form.values.regionalPhoneNumber,
        form.values.countryCode
    )
)


export const withPhoneValidationSchema = () => ({
    countryCode: yup.string().required(requiredMessage),
    regionalPhoneNumber: yup
        .string()
        .required(requiredMessage)
        .test(
            "regionalPhoneNumber",
            ({ value }) => `${value} is not a valid phone number`,
            (regionalPhoneNumber, ctx: { parent: FormValuesWithPhoneNumber }) => {
                try {
                    return (
                        !regionalPhoneNumber ||
                        phoneUtility.isValidNumberForRegion(
                            phoneUtility.parseAndKeepRawInput(
                                regionalPhoneNumber,
                                ctx.parent.countryCode
                            ),
                            ctx.parent.countryCode
                        )
                    );
                } catch {
                    return false;
                }
            }
        ),
})