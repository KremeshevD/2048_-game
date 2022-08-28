export const ButtonCustom = ({ text, handler, style, disabled, cost }) => {
  return (
    <div className="bonus">
      <button className={`bonus-btn ${style}`} onClick={handler} disabled={disabled}>
        {text}
      </button>
      {cost && <span className="bonusPrice">{cost}</span>}
    </div>
  );
};
