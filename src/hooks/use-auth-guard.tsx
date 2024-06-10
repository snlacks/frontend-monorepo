"use client";
import { useRouter } from "next/navigation";
import { Role } from "../types";
import useUser from "./use-user";
import { PropsWithChildren, useState } from "react";
import {
  Container,
  ContainerProps,
  Flex,
  Loader,
  LoaderProps,
  LoadingOverlay,
  Skeleton,
  SkeletonProps,
} from "@mantine/core";

/**
 *
 * @param eligibleRoles if present, checks for role. Otherwise, checks user exists.
 * @returns
 */
export const useAuthGuard = (redirect?: boolean, eligibleRoles?: Role[]) => {
  const { user, isInitial } = useUser();
  const router = useRouter();
  const hasRole = !!user?.roles.some(({ roleId }) => {
    return eligibleRoles?.some((el) => roleId === el.roleId);
  });
  if (!redirect) {
    return { isInitial };
  }
  if (!isInitial) {
    if (!user) {
      router.push("/login");
    }
    if (eligibleRoles && !hasRole) {
      router.push("/login");
    }
  }
  return { isInitial, user };
};

export const AuthGuardWrapper = ({
  eligibleRoles,
  redirect,
  children,
}: PropsWithChildren<{
  eligibleRoles?: Role[];
  redirect?: boolean;
  Fallback?: null | (() => JSX.Element);
}>) => {
  const { isInitial } = useAuthGuard(redirect, eligibleRoles);

  return (
    <>
      {isInitial && (
        <LoadingOverlay
          visible
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      )}
      {children}
    </>
  );
};

export const AuthGuardPlaceholder = ({
  eligibleRoles,
  loaderProps = {},
  containerProps = {},
  redirect,
  children,
}: PropsWithChildren<{
  eligibleRoles?: Role[];
  loaderProps?: LoaderProps;
  containerProps?: ContainerProps;
  redirect?: boolean;
}>) => {
  const { isInitial } = useAuthGuard(redirect, eligibleRoles);
  return (
    <>
      {isInitial ? (
        <Container {...containerProps}>
          <Flex align="center" justify="center" h="100%">
            <Loader {...loaderProps} />
          </Flex>
        </Container>
      ) : (
        children
      )}
    </>
  );
};

export const AuthGuardSkeleton = ({
  eligibleRoles,
  skeletonLines = 1,
  skeletonProps = {},
  redirect,
  children,
}: PropsWithChildren<{
  eligibleRoles?: Role[];
  loaderProps?: LoaderProps;
  containerProps?: ContainerProps;
  skeletonProps?: SkeletonProps;
  skeletonLines?: number;
  redirect?: boolean;
}>) => {
  const [lines] = useState(() => {
    const temp = [];
    for (let i = 0; i < skeletonLines; i++) {
      temp[i] = Math.random();
    }
    return temp;
  });
  const { isInitial } = useAuthGuard(redirect, eligibleRoles);

  return (
    <>
      {isInitial
        ? lines.map((v) => (
            <Skeleton h={10} {...skeletonProps} key={`ag-${v}`} />
          ))
        : children}
    </>
  );
};
