import { NavLink, Text } from "@mantine/core";
import { NavChevron } from "./nav-chevron";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

export const NavLinksExternal = () => {
  return (
    <>
      <Text p="lg" fz="sm">
        My Links
      </Text>
      <NavLink
        p="lg"
        pl="xl"
        href="https://www.linkedin.com/in/stevenlacks/"
        label="LinkedIn"
        target="_blank"
        rightSection={<NavChevron />}
        leftSection={<IconBrandLinkedin stroke="1" />}
      />
      <NavLink
        p="lg"
        pl="xl"
        href="https://github.com/snlacks"
        label="Github"
        target="_blank"
        rightSection={<NavChevron />}
        leftSection={<IconBrandGithub stroke="1" />}
      />
    </>
  );
};
