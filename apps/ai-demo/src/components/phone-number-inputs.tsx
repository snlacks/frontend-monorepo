import { Group, NativeSelect, TextInput, Text } from "@mantine/core";
import countryCodes from "@/utils/phone/country-code-data.json";
import { getCountryPrefix } from "@/utils/phone/phone";
import {
  FormValuesWithPhoneNumber,
  FormWithPhoneNumber,
} from "@/utils/phone/types";

export const PhoneNumberInput: <T extends FormValuesWithPhoneNumber>(props: {
  form: FormWithPhoneNumber<T>;
}) => JSX.Element = ({ form }) => {
  const prefix = getCountryPrefix(form.values.countryCode);
  return (
    <Group align="start" justify="space-between" grow>
      <NativeSelect
        label="Country Code"
        data={countryCodes}
        key={form.key("countryCode")}
        {...form.getInputProps("countryCode")}
        flex="shrink"
        maw={{ base: "100%", md: 95 }}
      />
      <TextInput
        flex="grow"
        label="Phone Number"
        type="string"
        leftSection={
          <Text px="sm" w={78} fz="xs">
            {prefix}
          </Text>
        }
        key={form.key("regionalPhoneNumber")}
        placeholder="555-555-5555"
        {...form.getInputProps("regionalPhoneNumber")}
        maw={{ base: "100%", md: 167 }}
      />
    </Group>
  );
};
