const Button = ({ label, value, pour, disabled }) => {
  return (
    <div className="button-container">
      <button type="button" onClick={pour} disabled={disabled}>
        {label}
      </button>
      <h2>{value}</h2>
    </div>
  );
};

export default Button;
