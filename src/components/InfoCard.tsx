import { Card } from "@tremor/react";


export type InfoCardProps = {
    title: string;
    value: string;
    };

export function InfoCard({
    title, 
    value
}: InfoCardProps) {


    return (
        <Card
          className="mx-auto my-2 max-w-xs rounded-md ring-1 ring-gray-200 p-2 pl-4"
          decoration="left"
          decorationColor="emerald"
        >
          <p className="text-gray-500 text-sm text-tremor-content dark:text-dark-tremor-content">{title}</p>
          <p className="text-xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{value}</p>
        </Card>
    );
      
}