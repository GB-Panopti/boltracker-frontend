import { TableRoot } from "@/components/Table";
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "@tremor/react";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { t } from "i18next";
import {
  RiClipboardLine,
  RiUserAddLine,
  RiUserForbidLine,
  RiUserHeartLine,
  RiUserLine,
  RiUserStarLine,
} from "@remixicon/react";
import { Input } from "@/components/Input";

const ReferralsTable = () => {
  const data: Array<{
    id: number;
    email: string;
    date_added: string;
    status: string;
    subscription_time: number | string;
  }> = [
    {
      id: 1,
      email: "harry.potter@hogwarts.com",
      date_added: "2024-01-15",
      status: "Subscribed",
      subscription_time: 8,
    },
    {
      id: 2,
      email: "frodo.baggins@shire.org",
      date_added: "2024-02-10",
      status: "Invited",
      subscription_time: "-",
    },
    {
      id: 3,
      email: "tony.stark@starkindustries.com",
      date_added: "2024-03-22",
      status: "Newly subscribed",
      subscription_time: 2,
    },
    {
      id: 4,
      email: "hermione.granger@hogwarts.com",
      date_added: "2024-04-08",
      status: "Canceled",
      subscription_time: "-",
    },
    {
      id: 5,
      email: "luke.skywalker@rebellion.org",
      date_added: "2024-05-18",
      status: "Subscribed",
      subscription_time: 6,
    },
    {
      id: 6,
      email: "peter.parker@dailybugle.com",
      date_added: "2024-06-01",
      status: "Invited",
      subscription_time: "-",
    },
    {
      id: 7,
      email: "darth.vader@empire.com",
      date_added: "2024-07-14",
      status: "Canceled",
      subscription_time: "-",
    },
    {
      id: 8,
      email: "bruce.wayne@wayneenterprises.com",
      date_added: "2024-08-05",
      status: "Subscribed",
      subscription_time: 3,
    },
    {
      id: 9,
      email: "clark.kent@dailyplanet.com",
      date_added: "2024-09-23",
      status: "Newly subscribed",
      subscription_time: 1,
    },
    {
      id: 10,
      email: "bilbo.baggins@shire.org",
      date_added: "2024-10-07",
      status: "Subscribed",
      subscription_time: 5,
    },
  ];

  const getBadgeColor = (status: string) => {
    switch (status) {
      case "Subscribed":
        return <Badge variant="success">{status}</Badge>;
      case "Newly subscribed":
        return <Badge>{status}</Badge>;
      case "Invited":
        return <Badge variant="neutral">{status}</Badge>;
      case "Canceled":
        return <Badge variant="error">{status}</Badge>;
      default:
        return <Badge variant="warning">{status}</Badge>;
    }
  };

  const getIconType = (status: string) => {
    switch (status) {
      case "Subscribed":
        return <RiUserHeartLine className="size-6 mr-2" />;
      case "Newly subscribed":
        return <RiUserStarLine className="size-6 mr-2" />;
      case "Invited":
        return <RiUserAddLine className="size-6 mr-2" />;
      case "Canceled":
        return <RiUserForbidLine className="size-6 mr-2" />;
      default:
        return <RiUserLine className="size-6 mr-2" />;
    }
  }

  return (
    <>
      <div>
        <div className="flex justify-between items-start">
          <p className="text-gray-900 text-lg font-bold ml-0">Referred users</p>

          <div className="flex items-center">
            <Input type= "text" value={data.referralCode} roundedRightNone placeholder="referral not available" disabled readOnly />
            <Button className="rounded-l-none border-2 border-l-0" variant="accent">
              Copy referral code
              <RiClipboardLine className="size-4 ml-2 mb-0.5" />
            </Button>
          </div>
        </div>

        <TableRoot>
          <Table>
            {/* <TableCaption>{t('referrals.table_title')}</TableCaption> */}
            <TableHead>
              <TableRow>
                <TableHeaderCell>Email</TableHeaderCell>
                {/* <TableHeaderCell>Date added</TableHeaderCell> */}
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Months subscribed</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex">
                      {getIconType(item.status)}
                      {item.email}
                    </div>
                  </TableCell>
                  {/* <TableCell className="text-right">
                    {item.date_added}
                  </TableCell> */}
                  <TableCell>{getBadgeColor(item.status)}</TableCell>
                  <TableCell className="text-right text-lg">{item.subscription_time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableRoot>
      </div>
    </>
  );
};

export default ReferralsTable;
