import { Button, NavLink, Text } from "@mantine/core";
import { NavChevron } from "./nav-chevron";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { axiosPost } from "@/utils/fetch/axios-post";
import useSWRMutation from "swr/mutation";
import useUser from "@/hooks/use-user";
import { AuthGuardPlaceholder } from "../hooks/use-auth-guard";

export const NavLinksExternal = ({
  onLinkClick,
}: {
  onLinkClick: () => void;
}) => {
  const { user } = useUser();
  const { isMutating, trigger } = useSWRMutation(
    "/auth/sign-out",
    axiosPost<undefined, undefined>
  );
  return (
    <>
      <AuthGuardPlaceholder containerProps={{ h: "200px" }}>
        {user ? (
          <Text p="lg">
            {user?.username}{" "}
            <Button
              onClick={async () => {
                try {
                  await trigger();
                  window.location.reload();
                } finally {
                  return;
                }
              }}
              variant="outline"
              color="red.8"
              disabled={isMutating}
            >
              Sign out
            </Button>
          </Text>
        ) : (
          <>
            <NavLink
              p="lg"
              href="/login"
              label="Log in"
              rightSection={<NavChevron />}
              onClick={onLinkClick}
            />
            <NavLink
              p="lg"
              href="/sign-up"
              label="Sign up"
              rightSection={<NavChevron />}
              onClick={onLinkClick}
            />
          </>
        )}
      </AuthGuardPlaceholder>
      <NavLink
        p="lg"
        href="https://www.linkedin.com/in/stevenlacks/"
        label="LinkedIn"
        target="_blank"
        rightSection={<NavChevron />}
        leftSection={<IconBrandLinkedin stroke="1" />}
      />
      <NavLink
        p="lg"
        href="https://github.com/snlacks"
        label="Github"
        target="_blank"
        rightSection={<NavChevron />}
        leftSection={<IconBrandGithub stroke="1" />}
      />
    </>
  );
};
