import * as yup from "yup"
import libPhone from "google-libphonenumber";
import { useForm, yupResolver } from "@mantine/form";

const phone = libPhone.PhoneNumberUtil.getInstance();

export type RequestOTPForm = {
    username: string;
    phoneNumber: string;
};

export type LoginForm = {
    username: string;
    oneTimePassword: string;
};


const otpSchema = yup.object<RequestOTPForm>({
    username: yup.string().email().required(),
    phoneNumber: yup
        .string()
        .required()
        .test({
            name: "phonenumber, usually something like +13332223333 (working on having country be selectable)",
            test: (phonenumber, ctx) => {
                phone.parseAndKeepRawInput(phonenumber);
            },
        }),
});

const loginSchema = yup.object<LoginForm>({
    username: yup.string().email().required(),
    oneTimePassword: yup.string().required(),
});

const initialOTP = { username: "", phoneNumber: "" }
const initialLogin = { username: "", oneTimePassword: "" }


export const useAuthForms = () => {
    const otpFormContext = useForm({
        mode: "controlled",
        initialValues: initialOTP,
        validate: yupResolver(otpSchema),
    });
    const loginFormContext = useForm({
        mode: "controlled",
        initialValues: initialLogin,
        validate: yupResolver(loginSchema),
    });
    return { otpFormContext, loginFormContext };
}