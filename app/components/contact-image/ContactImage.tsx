import Image from "next/image";

import styles from "./ContactImage.module.css";

interface ContactImageProps {
  imageUrl: string | undefined | null;
  size?: number;
}

export function ContactImage({ imageUrl, size = 88 }: ContactImageProps) {
  return (
    <div>
      <Image
        className={styles.imagePreview}
        src={imageUrl || "/placeholder.png"}
        alt="Preview"
        width={size}
        height={size}
      />
    </div>
  );
}
