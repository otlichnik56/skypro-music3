import styles from "./Volume.module.css";

type VolumeProps = {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Volume({ value, onChange }: VolumeProps) {
  return (
    <div className={styles.volume}>
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage}>
          <svg className={styles.volumeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
          </svg>
        </div>
        <div className={styles.volumeProgress}>
          <input
            className={styles.volumeProgressLine}
            type="range"
            name="range"
            min={0}
            max={1}
            step={0.01}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}
