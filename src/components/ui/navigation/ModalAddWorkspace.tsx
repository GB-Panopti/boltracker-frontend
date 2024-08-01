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
import { DropdownMenuItem } from "@/components/Dropdown";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { RiRadarLine } from "@remixicon/react";

export type ModalProps = {
  itemName: string;
  onSelect: () => void;
  onOpenChange: (open: boolean) => void;
};

export function ModalAddWorkspace({
  itemName,
  onSelect,
  onOpenChange,
}: ModalProps) {
  const [name, setName] = React.useState('');
  const [url, setUrl] = React.useState('');

  function handleProductAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Product added", name, url);
    onOpenChange(false);
  }

  return (
    <>
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger className="w-full text-left">
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault();
              onSelect && onSelect();
            }}
          >
            {itemName}
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <form onSubmit={handleProductAdd}>
            <DialogHeader>
              <DialogTitle>
                <RiRadarLine
                  aria-hidden="true"
                  className="mb-1 ml-1 mr-1 size-6 shrink-0 inline-block text-gray-800"
                />
                Track new product
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm leading-6">
                {/* With free plan, you can track up to 10 products. */}
              </DialogDescription>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="product-name" className="font-medium">
                    Product name
                  </Label>
                  <Input
                    id="product-name"
                    name="product-name"
                    placeholder="Turtles, Termites, Traffic Jams"
                    className="mt-2"
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="product-url" className="font-medium">
                    Bol.com url
                  </Label>
                  <Input
                    id="product-url"
                    name="product-url"
                    placeholder="https://www.bol.com/nl/nl/f/turtles-termites-traffic-jams-explorations-in-massively-parallel-microworlds/38232707/"
                    className="mt-2"
                    onChange={(event) => setUrl(event.target.value)}
                  />
                </div>
              </div>
            </DialogHeader>
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button
                  className="mt-2 w-full sm:mt-0 sm:w-fit"
                  variant="secondary"
                >
                  Go back
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit" className="w-full sm:w-fit">
                  Add product
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}