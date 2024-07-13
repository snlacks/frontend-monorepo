"use client";
import {
  LoadingOverlay,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
} from "@mantine/core";
import { AppHeader } from "@/components/app-header";
import {
  User,
  LoginPasswordDTO,
  LoginPasswordForm,
  UserResponse,
} from "@snlacks-fe/user";
import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { userAtom } from "@/store/user";

import {} from "@snlacks-fe/user";
import { axiosInstance } from "@/store/axios-instance";
import useSWRMutation from "swr/mutation";
import { ApiError } from "@/types";
import { useRouter } from "next/navigation";

export const logoutFetcher = async (
  path: string
): Promise<boolean | ApiError> => {
  try {
    const res = await axiosInstance.post(path);

    if (res.status < 200 && res.status > 400) {
      return res.data as ApiError;
    }
  } catch {
    return false;
  }
  return true;
};

export const DashboardHeader = ({ user }: { user?: User }) => {
  const setUser = useSetAtom(userAtom);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { trigger, isMutating } = useSWRMutation(
    "/auth/sign-out",
    logoutFetcher
  );

  useEffect(() => {
    setUser(user);
  }, []);
  return (
    <AppHeader>
      {loading && <LoadingOverlay />}
      <Menu>
        <MenuTarget>
          <button>{user?.username}</button>
        </MenuTarget>
        <MenuDropdown>
          <MenuItem
            onClick={async () => {
              setLoading(true);
              const result = await trigger();
              setLoading(false);
              if (result === true) {
                router.push("/");
              }
            }}
          >
            Sign out
          </MenuItem>
        </MenuDropdown>
      </Menu>
    </AppHeader>
  );
};
