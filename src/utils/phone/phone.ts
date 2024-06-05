
import { PhoneNumberUtil } from "google-libphonenumber";
import { defaultTo } from "ramda";
import countryCodes from './country-code-data.json'


export const phoneUtility = PhoneNumberUtil.getInstance();

export const getCountryPrefix = (countryCode: string) => `+${defaultTo(
    "",
    countryCodes
        .find((el) => el.label.match(countryCode))
        ?.label.split(" ")[1]
)}`;
