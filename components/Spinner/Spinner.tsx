import css from "./Spinner.module.css";

interface SpinnerProps {
  fullScreen?: boolean;
}

export const Spinner = ({ fullScreen = false }: SpinnerProps) => {
  return (
    <div className={`${css.overlay} ${fullScreen ? css.fullScreen : ""}`}>
      <div className={css.flower}>
        {[...Array(12)].map((_, i) => (
          <div key={i} />
        ))}
      </div>
    </div>
  );
};
