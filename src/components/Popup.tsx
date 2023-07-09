interface Props {
  arrow?: boolean;
  setArrow?: any;
  isActive?: boolean;
  setIsActive?: any;
  reference?: any;
  isDiscount?: boolean;
  setIsDiscount?: any;
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
