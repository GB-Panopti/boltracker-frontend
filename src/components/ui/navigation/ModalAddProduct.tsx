import React from "react";
import { Button } from "@/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { RiRadarLine } from "@remixicon/react";
import ProductService from "@/services/ProductService";
import { Product } from "@/data/schema";
import { useAppData } from "@/app/contexts/AppProvider";
import { useTranslation } from "react-i18next";

export type ModalProps = {
  itemName: string;
  onSelect: () => void;
  onOpenChange: (open: boolean) => void;
};

export function ModalAddProduct({
  itemName,
  onSelect,
  onOpenChange,
}: ModalProps) {
  const { user } = useAppData();
  const [name, setName] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const { t } = useTranslation();

  async function handleProductAdd() {
    try {
      setError("Adding product..");
      const product: Product = {
        id: "",
        name: name,
        url: url,
        createdAt: new Date(),
      };
      const response = await ProductService.addProduct(product);

      if (response.status === 200) {
        window.location.reload();
      } else if (response.status === 400) {
        setError(t("track_product.wrong_url"));
      } else if (response.status === 409) {
        setError(t("track_product.already_exists"));
      } else if (response.status === 500) {
        setError(t("track_product.server_error"));
      }
    } catch (error) {
      setError(t("track_product.unexpected_error"));
    }
  }

  return (
    <>
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger>
          <div
            onSelect={(event) => {
              event.preventDefault();
              onSelect();
            }}
          >
            {itemName}
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <form onSubmit={handleProductAdd}>
            <DialogHeader>
              <DialogTitle>
                <RiRadarLine
                  aria-hidden="true"
                  className="mb-1 ml-1 mr-1 size-6 shrink-0 inline-block text-gray-800 dark:text-gray-200"
                />
                {t("track_product.header")}
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm leading-6">
                {/* With free plan, you can track up to 10 products. */}
              </DialogDescription>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="product-name" className="font-medium">
                    {t("track_product.product_name")}
                  </Label>
                  <Input
                    id="product-name"
                    name="product-name"
                    value={name}
                    placeholder="LEGO set"
                    className="mt-2"
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="product-url" className="font-medium">
                    {t("track_product.url")}
                  </Label>
                  <Input
                    id="product-url"
                    name="product-url"
                    value={url}
                    placeholder="https://www.bol.com/nl/nl/f/turtles-termites-traffic-jams-explorations-in-massively-parallel-microworlds/38232707/"
                    className="mt-2"
                    onChange={(event) => setUrl(event.target.value)}
                  />
                </div>
              </div>
            </DialogHeader>
            <DialogFooter className="mt-6">
              {error && <div className="text-red-500 mt-2">{error}</div>}
              <DialogClose asChild>
                <Button
                  className="mt-2 w-full sm:mt-0 sm:w-fit"
                  variant="secondary"
                >
                  {t("back")}
                </Button>
              </DialogClose>
              {(() => {
                if (user && user.subscription === 0) {
                  return (
                    <Button className="w-full sm:w-fit" variant="light">
                      <s>{t("track_product.add")}</s>
                    </Button>
                  );
                } else {
                  return (
                    <Button
                      onClick={handleProductAdd}
                      type="submit"
                      className="w-full sm:w-fit"
                    >
                      {t("track_product.add")}
                    </Button>
                  );
                }
              })()}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
