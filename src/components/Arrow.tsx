export default function Arrow({ arrow, setArrow }: { arrow: boolean; setArrow: (bool: boolean) => void }) {
  return (
    <span
      className={!arrow ? "arrow inactive" : "arrow active"}
      onClick={() => {
        setArrow(!arrow);
      }}
    ></span>
  );
}
