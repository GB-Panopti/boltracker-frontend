import React, { useState } from "react";
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
import { RiRotateLockLine } from "@remixicon/react";
import loginServiceInstance from "@/services/LoginService";
import { useTranslation } from "react-i18next";

export type ModalProps = {
  // _name: string;
  // _id: string;
  // _url: string;
  onSelect: () => void;
};

const ModalEditPassword: React.FC<ModalProps> = ({

}: ModalProps) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOpen, onOpenChange] = useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { t } = useTranslation();



  function handleOpenChange(open: boolean): void {
    onOpenChange(open);
  }


  async function handleChangePassword() {
    setError(null)
    if (newPassword === confirmPassword) {
      const response = await loginServiceInstance.changePassword(newPassword)

      if (response.status === 200){
        onOpenChange(false)

      } else {
        setError("Something went wrong!")
      }
    } else {
      setError("Passwords are not equal!")
    }

  }


  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger>
              {t("password.title")}
          </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              <RiRotateLockLine
                aria-hidden="true"
                className="mb-1 ml-1 mr-1 size-6 shrink-0 inline-block text-gray-800 dark:text-gray-200"
              />
              {t("password.title")}
            </DialogTitle>
            <Button
              className="group mt-0 mr-auto overflow-hidden w-full"
              variant="ghost"
              asChild
            >
            </Button>

            <DialogDescription className="mt-1 text-sm leading-6">
              {/* With free plan, you can track up to 10 products. */}
            </DialogDescription>
            <div className="mt-4 grid grid-cols-1 gap-4">
              <div>
                <Input
                  type="password"
                  id="product-name"
                  name="product-name"
                  placeholder={t("password.new_password")}
                  className="mt-2"
                  onChange={(event) => setNewPassword(event.target.value)}
                />                
                <Input
                  type="password"
                  id="product-name"
                  name="product-name"
                  placeholder={t("password.confirm_password")}
                  className="mt-2"
                  onChange={(event) => setConfirmPassword(event.target.value)}
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
                }}
              >
                {t("back")}
                </Button>
            </DialogClose>
            <Button
              onClick={() => handleChangePassword()}
              type="submit"
              className="w-full sm:w-fit"
            >
            {t("save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalEditPassword;
