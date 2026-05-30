"use client";

import dynamic from "next/dynamic";
import { HEMINGWAYS_TO_WILSON } from "@/data/groundTransfers";

const GroundTransferMap = dynamic(
  () => import("@/components/GroundTransferMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-safari-sand/80 bg-safari-ivory/50">
        <p className="text-sm text-safari-charcoal/50">Loading map…</p>
      </div>
    ),
  },
);

export default function HemingwaysWilsonTransfer() {
  return <GroundTransferMap transfer={HEMINGWAYS_TO_WILSON} />;
}
