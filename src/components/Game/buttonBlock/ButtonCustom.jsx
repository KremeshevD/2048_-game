export const ButtonCustom = ({ text, handler, style, disabled, cost, isOn }) => {
  let classes = ['bonus-btn', style, isOn ? 'cancel' : '']
  return (
    <div className="bonus">
      <button className={classes.join(' ')} onClick={handler} disabled={disabled}>
        {text}
      </button>
      {(cost && !isOn) && <span className="bonusPrice">{cost}</span>}
    </div>
  );
};
