import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";

export type allowedRoles = "Admin" | "Editor";
interface PermissionProps {
  children: ReactNode;
  allowedRoles: allowedRoles[];
}

const Permission = ({ children, allowedRoles }: PermissionProps) => {
  const { data } = useSession();
  if (!data) return;
  return (
    <>
      {data.user?.roles.find(
        (role) => allowedRoles.includes(role) && { children }
      )}
    </>
  );
};

export default Permission;
