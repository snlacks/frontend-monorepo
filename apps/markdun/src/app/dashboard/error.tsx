"use client";

import { useEffect } from "react";

export default function Error({ error }: any) {
  useEffect(() => console.error(error), [error]);
  return <div>Error</div>;
}
