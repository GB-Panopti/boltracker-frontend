import React, { useEffect, useState } from "react";
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
import { RiHammerLine } from "@remixicon/react";
import ProductService from "@/services/ProductService";

export type ModalProps = {
  _name: string;
  _id: number;
  onSelect: () => void;
  onOpenChange: (open: boolean) => void;
};

const ModalEditProduct: React.FC<ModalProps> = ({ _name, _id, onOpenChange }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(_name);
  }, [_name]);

  function handleOpenChange(open: boolean): void {
    if (!open) {
      setName(_name);
    }
    onOpenChange(open);
  }

  async function handleProductEdit() {
    try {
      console.log('Setting ', _name, ' to ', name, ' with id ', _id);
      const response = await ProductService.editProduct(_id, name);
      console.log('Product edited successfully:', name);
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to edit product:', error);
      // show a user-friendly error message here
    }
  }

  async function handleProductDelete() {
    try {
      console.log('Setting ', _name, ' to ', name, ' with id ', _id);
      const response = await ProductService.deleteProduct(_id);
      console.log('Product deleted successfully:', response.data);
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to edit product:', error);
      // show a user-friendly error message here
    }
  }

  return (
    <>
      <Dialog onOpenChange={handleOpenChange}>
        <li className='ml-1 p-1 flex rounded-md hover:bg-gb-secondary-200 hover:dark:bg-gb-primary-900 text-gb-primarylite-50 hover:text-gray-900 dark:text-gb-primarylite-100 hover:dark:text-gray-50 '>
          <DialogTrigger className="gap-x-2.5 text-left px-2 py-1.5 text-xs font-medium mr-3 w-full">
            {name}
          </DialogTrigger>
        </li>
        <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                <RiHammerLine
                  aria-hidden="true"
                  className="mb-1 ml-1 mr-1 size-6 shrink-0 inline-block text-gray-800 dark:text-gray-200"
                />
                Edit {name}
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm leading-6">
                {/* With free plan, you can track up to 10 products. */}
              </DialogDescription>
              <div className="mt-4 grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="product-name" className="font-medium">
                    Product name
                  </Label>
                  <Input
                    id="product-name"
                    name="product-name"
                    value={name}
                    placeholder="Turtles, Termites, Traffic Jams"
                    className="mt-2"
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
              </div>
            </DialogHeader>
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button
                  className="mt-2 w-full sm:mt-0 sm:w-fit"
                  variant="secondary"
                  onClick={() => onOpenChange(false)}
                >
                  Go back
                </Button>
              </DialogClose>
              <Button onClick={() => handleProductDelete()} variant="destructive" className="w-full sm:w-fit">
                Delete
              </Button>
              <Button onClick={() => handleProductEdit()} type="submit" className="w-full sm:w-fit">
                Save
              </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalEditProduct;