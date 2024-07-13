import { Group, NativeSelect, TextInput, Text } from "@mantine/core";
import countryCodes from "@snlacks-fe/user/country-code-data.json";
import { UseFormReturnType } from "@mantine/form";
import { getCountryPrefix } from "@snlacks-fe/user";
import { HasPhoneNumbers } from "@snlacks-fe/user/types";

export const PhoneNumberInput: <T extends HasPhoneNumbers>(props: {
  form: UseFormReturnType<T, () => T>;
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
        withAsterisk
        label="Phone Number"
        type="string"
        leftSection={
          <Text px="sm" w={76} fz="xs">
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
