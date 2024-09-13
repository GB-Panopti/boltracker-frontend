import Image from "next/image";
import React from "react";

export function Logo({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex items-center ${className}`} {...props}>
      <Image src="/img/logo.svg" alt="Panopti Logo" width={50} height={50} />

      <span className="ml-2 text-2xl font-bold text-gray-100">Panopti</span>
    </div>
  );
}
