const ProgressBar = ({ progress, total }) => {
  const percent = (progress / total) * 100;
  return (
    <div className="outerbar">
      <div className="innerbar" style={{ height: `${percent}%` }}></div>
    </div>
  );
};

export default ProgressBar;
