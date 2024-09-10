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
import { RiDeleteBack2Line, RiDeleteBackLine, RiDeleteBin2Line, RiHammerLine, RiSave2Line } from "@remixicon/react";
import ProductService from "@/services/ProductService";
import { ArrowAnimated } from "../icons/ArrowAnimated";
import { useAppData } from "@/app/contexts/AppProvider";

export type ModalProps = {
  _name: string;
  _id: string;
  _url: string;
  onSelect: () => void;
};

const ModalEditProduct: React.FC<ModalProps> = ({
  _name,
  _id,
  _url,
}: ModalProps) => {
  const [name, setName] = useState("");
  const [isOpen, onOpenChange] = useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { user, setProducts } = useAppData();

  useEffect(() => {
    setName(_name);
  }, [_name]);

  function handleOpenChange(open: boolean): void {
    if (!open) {
      setName(_name);
    }
    onOpenChange(open);
  }

  const refreshProducts = async () => {
    try {
      const productResponse = await ProductService.getProducts();
      setProducts(productResponse.data);
    } catch (error) {}
  };

  async function handleProductEdit() {
    try {
      setError("Saving new name..");
      console.log("Setting ", _name, " to ", name);
      await ProductService.editProduct(_id, name);
      console.log("Product edited successfully:", name);
      refreshProducts();
      onOpenChange(false);
      setError(null);
    } catch (error) {
      console.error("Failed to edit product:", error);
      setError("Something went wrong. Please try again.");
    }
  }

  async function handleProductDelete() {
    try {
      if (window.confirm("Are you sure you want to delete this product? You can add it again later if you have the same URL.")) {
        setError('Deleting product..');
        await ProductService.deleteProduct(_id);
        setError('Product deleted successfully');
        refreshProducts();
        onOpenChange(false);
        setError(null);
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <li className="ml-1 p-1 flex rounded-md hover:bg-gb-secondary-200 hover:dark:bg-gb-primary-900 text-gb-primarylite-50 hover:text-gray-900 dark:text-gb-primarylite-100 hover:dark:text-gray-50 ">
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
            <Button
              className="group mt-0 mr-auto overflow-hidden w-full"
              variant="ghost"
              asChild
            >
              <div className="flex items-center w-full">
                <ArrowAnimated
                  className="stroke-gray-900 dark:stroke-gray-50 mr-2 flex-shrink-0"
                  aria-hidden="true"
                />
                <a
                  className="text-xs text-gb-secondary-400 truncate overflow-hidden"
                  style={{ maxWidth: "calc(100% - 24px)" }}
                  href={_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {_url}
                </a>
              </div>
            </Button>

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
            {error && <div className="text-red-500 mt-2">{error}</div>}
            <DialogClose asChild>
              <Button
                className="mt-2 w-full sm:mt-0 sm:w-fit"
                variant="secondary"
                onClick={() => {
                  onOpenChange(false);
                  refreshProducts();
                }}
              >
                Go back
              </Button>
            </DialogClose>
            {
              (() => {
                if (user && user.subscription === 0) {
                  return (
                    <div>
                      <Button
                        variant="light"
                        className="w-full sm:w-fit mr-2 mb-2 sm:mb-0"
                      >
                        <RiDeleteBin2Line className="size-5 mr-1"/>
                        <s><p className="flex">Delete</p> </s>
                      </Button>
                      <Button
                        variant="light"
                        className="w-full sm:w-fit"
                      >
                        <RiSave2Line className="size-5 mr-1"/>
                        <s>Save</s>
                      </Button>
                    </div>
                  );
                }
                else {
                  return (
                    <div>
                      <Button
                        onClick={() => handleProductDelete()}
                        variant="destructive"
                        className="w-full sm:w-fit mr-2 mb-2 sm:mb-0"
                      >
                        <RiDeleteBin2Line className="size-5 mr-1"/>
                        <p className="flex">Delete</p> 
                      </Button>
                      <Button
                        onClick={() => handleProductEdit()}
                        type="submit"
                        className="w-full sm:w-fit"
                      >
                        <RiSave2Line className="size-5 mr-1"/>
                        Save
                      </Button>
                    </div>
                  );
                }
              })()
            }
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalEditProduct;
