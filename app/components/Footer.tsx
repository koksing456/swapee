"use client";

import * as React from "react";
import { Separator } from "@/app/components/ui/separator";

export default function Footer() {
  return (
    <>
      <Separator className="my-32" />
      <p className="text-sm text-muted-foreground">Built by koksing.</p>
    </>
  );
}
