import { PropsWithChildren, useCallback, useEffect, useState } from "react";

import { classNames } from "@/utils/classNames";
import { Button } from "@/app/components/button/Button";

import Dots from "@/app/assets/dots.svg";

import styles from "./Popover.module.css";

interface PopoverProps extends PropsWithChildren {}

export function Popover({ children }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const clickListener = useCallback(
    (evt: MouseEvent) => {
      if (!(evt.target as Element).closest("button.popoverOpen"))
        setOpen(false);
    },
    [setOpen]
  );
  useEffect(() => {
    document.addEventListener("click", clickListener);
    return () => {
      document.removeEventListener("click", clickListener);
    };
  }, [clickListener]);
  return (
    <div className={styles.popover}>
      <Button
        className={classNames("popoverOpen")}
        variant="secondary"
        icon={<Dots />}
        onClick={() => setOpen(!open)}
      />

      {open && <div className={styles.popoverContent}>{children}</div>}
    </div>
  );
}
