import { useAppData } from '@/app/contexts/AppProvider';
import { RiLoader2Line, RiErrorWarningLine, RiAlertLine, RiCheckboxCircleLine } from '@remixicon/react';
import { Badge } from '@tremor/react';
import React from 'react';
import { useTranslation } from 'react-i18next';


export function Indicator({ id }: { id: string }) {
    const { t } = useTranslation(); 
    const { rawStockData, products } = useAppData();
    const index = products.findIndex((product) => product.id === id);
    
    if (new Date(products[index].createdAt) > new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)) {
        return <Badge color="blue" icon={RiLoader2Line}>
                    {t("indicator.new")}
                </Badge>;
    }

    const data = rawStockData[id as keyof typeof rawStockData];

    if (!data) {
        return <Badge color="red" icon={RiErrorWarningLine}>
                    {t("indicator.error")}
                </Badge>;
    }

    if (Array.isArray(data) && data.every((datum) => datum.stock === 500)) {
        return <Badge color="yellow" icon={RiAlertLine}>
                    {t("indicator.uncertain")}
                </Badge>;
    }

    return <Badge color="emerald" icon={RiCheckboxCircleLine}>
             {t("indicator.accurate")}
            </Badge>;
}