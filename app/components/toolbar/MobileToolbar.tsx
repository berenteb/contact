import { Button } from "@/app/components/button/Button";

import LeftArrow from "@/app/assets/left.svg";
import ColorMode from "@/app/assets/mode.svg";

import styles from "./Toolbar.module.css";

export function MobileToolbar() {
  return (
    <div className={styles.mobileToolbar}>
      <Button icon={<LeftArrow />} variant="secondary" />
      <Button icon={<ColorMode />} variant="secondary" />
    </div>
  );
}
