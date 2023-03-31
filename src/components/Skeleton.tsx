import "./Skeleton.css";
const Skeleton = () => {
  return (
    <div data-testid="skeleton" className="skeleton__card">
      <div className="skeleton__img"></div>
      <div className="skeleton__info"></div>
    </div>
  );
};

export default Skeleton;
