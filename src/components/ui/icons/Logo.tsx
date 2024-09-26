import Image from "next/image";
import React from "react";

export function Logo({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <a href="/">
      <div className={`flex items-center ${className}`} {...props}>
        <Image src="/img/logo.svg" alt="Panopti Logo" width={50} height={50} />
        <span className="ml-2 text-2xl font-bold text-gray-100 hidden min-[430px]:inline">
          Panopti
        </span>
      </div>
    </a>
  );
}
