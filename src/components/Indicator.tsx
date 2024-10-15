import { useAppData } from "@/app/contexts/AppProvider";
import {
  RiLoader2Line,
  RiErrorWarningLine,
  RiAlertLine,
  RiCheckboxCircleLine,
} from "@remixicon/react";
import { Badge } from "@tremor/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@/components/Tooltip";

export function Indicator({ id }: { id: string }) {
  const { t } = useTranslation();
  const { rawStockData, products } = useAppData();
  const index = products.findIndex((product) => product.id === id);

  if (
    new Date(products[index].createdAt) >
    new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  ) {
    return (
      <Tooltip side="left" content={t("indicator.new_tooltip")}>
      <Badge color="blue" icon={RiLoader2Line}>
        {t("indicator.new")}
      </Badge>
      </Tooltip>
    );
  }

  const data = rawStockData[id as keyof typeof rawStockData];

  if (!data) {
    return (
      <Tooltip side="left" content={t("indicator.error_tooltip")}>
      <Badge color="red" icon={RiErrorWarningLine}>
        {t("indicator.error")}
      </Badge>
      </Tooltip>
    );
  }

  if (Array.isArray(data) && data.some((datum) => datum.stock === 500)) {
    return (
      <Tooltip side="left" content={t("indicator.uncertain_tooltip")}>
      <Badge color="yellow" icon={RiAlertLine}>
        {t("indicator.uncertain")}
      </Badge>
      </Tooltip>
    );
  }

  return (
    <Tooltip side="left" content={t("indicator.accurate_tooltip")}>
    <Badge color="emerald" icon={RiCheckboxCircleLine}>
      {t("indicator.accurate")}
    </Badge>
    </Tooltip>
  );
}
