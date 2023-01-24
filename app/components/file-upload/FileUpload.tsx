import {
  ChangeEventHandler,
  CSSProperties,
  forwardRef,
  PropsWithChildren,
  ReactNode,
} from "react";
import { classNames } from "@/utils/classNames";

interface FileUploadProps extends PropsWithChildren {
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  icon?: ReactNode;
  style?: CSSProperties;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ name, icon, onChange, children, style }, ref) => {
    const classes: string[] = ["fileUploadButton"];
    if (!children) classes.push("icon");
    else if (icon) classes.push("iconText");
    return (
      <>
        <label className={classNames(...classes)} htmlFor={name} style={style}>
          <input
            ref={ref}
            type="file"
            accept="image/*"
            id={name}
            onInput={onChange}
          />
          {icon && <div className="iconWrapper">{icon}</div>}
          {children}
        </label>
      </>
    );
  }
);

FileUpload.displayName = "FileUpload";

export { FileUpload };
