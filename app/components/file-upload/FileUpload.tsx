import {
  ChangeEventHandler,
  CSSProperties,
  forwardRef,
  PropsWithChildren,
  ReactNode,
} from "react";

interface FileUploadProps extends PropsWithChildren {
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  icon?: ReactNode;
  style?: CSSProperties;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ name, icon, onChange, style, children }, ref) => {
    return (
      <>
        <label
          className="fileUploadButton"
          htmlFor={name}
          style={{ paddingLeft: icon ? "12px" : undefined, ...style }}
        >
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
