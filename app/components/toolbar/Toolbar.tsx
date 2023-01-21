"use client";
import { useState } from "react";
import Image from "next/image";

import LeftArrow from "@/app/assets/left.svg";
import ColorMode from "@/app/assets/mode.svg";
import Settings from "@/app/assets/settings.svg";
import Plus from "@/app/assets/plus.svg";
import { Modal } from "@/app/components/modal/Modal";
import { Button } from "@/app/components/button/Button";
import { classNames } from "@/utils/classNames";

import styles from "./Toolbar.module.css";

export function Toolbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={classNames(styles.toolbarSide, styles.right)}>
        <Button icon={<LeftArrow />} variant="secondary" />
      </div>
      <div className={styles.toolbarContent}>
        <h1>Contacts</h1>
        <div className={styles.toolbarButtons}>
          <Button icon={<Settings />} variant="secondary" />
          <Button
            icon={<Image src="/user.png" alt="User" height={20} width={20} />}
            variant="secondary"
          />
          <Button
            className={styles.onlyDesktop}
            variant="special"
            icon={<Plus />}
            onClick={() => setOpen(true)}
          >
            Add new
          </Button>
          <Button
            className={styles.onlyMobile}
            variant="special"
            icon={<Plus />}
            onClick={() => setOpen(true)}
          />
          {open && <Modal onClose={() => setOpen(false)} />}
        </div>
      </div>
      <div className={styles.toolbarSide}>
        <Button icon={<ColorMode />} variant="secondary" />
      </div>
    </>
  );
}
