export default function Arrow({ arrow, setArrow }: { arrow: boolean; setArrow: any }) {
  return (
    <span
      className={!arrow ? "arrow inactive" : "arrow active"}
      onClick={() => {
        setArrow(!arrow);
      }}
    ></span>
  );
}
