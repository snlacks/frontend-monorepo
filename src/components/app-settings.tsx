import {
  SegmentedControl,
  MantineColorScheme,
  InputLabel,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";

export const AppSettings = () => {
  const colorScheme = useComputedColorScheme();
  const { setColorScheme } = useMantineColorScheme();
  return (
    <>
      <InputLabel htmlFor="colorSchemeToggle">Color Scheme</InputLabel>
      <SegmentedControl
        id="colorSchemeToggle"
        aria-labelledby="colorSchemeToggleLabel"
        p="lg"
        onChange={(value) => setColorScheme(value as MantineColorScheme)}
        value={colorScheme}
        data={["dark", "light"] as MantineColorScheme[]}
      />
    </>
  );
};
