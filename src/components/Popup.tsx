interface Props {
  arrow?: boolean;
  setArrow?: (bool: boolean) => void;
  isActive?: boolean;
  setIsActive?: (bool: boolean) => void;
  reference?: React.MutableRefObject<null>;
  isDiscount?: boolean;
  setIsDiscount?: (bool: boolean) => void;
  children?: any;
  popupClass?: string;
}

export default function Popup({ reference, popupClass, children }: Props) {
  return (
    <div className={popupClass} ref={reference}>
      <ul>{children}</ul>
    </div>
  );
}
