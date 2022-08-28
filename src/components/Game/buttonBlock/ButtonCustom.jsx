export const ButtonCustom = ({ text, handler, style, disabled, cost }) => {
  return (
    <div className="">
      <button className={style} onClick={handler} disabled={disabled}>
        {text}
      </button>
      {cost && <span>{cost}</span>}
    </div>
  );
};
