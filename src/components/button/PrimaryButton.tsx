import styles from './styles.module.css';
type PrimaryButtonProps = {
  type: 'submit' | 'button';
  children: string | JSX.Element;
  onClick?: () => void;
  width: string;
  disabled?: boolean;
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  type,
  children,
  onClick,
  width,
  disabled,
}) => {
  switch (width) {
    case 'full':
      return (
        <button
          disabled={disabled}
          type={type}
          onClick={onClick}
          className={`${styles.primary_hover__state}  bg-custom-primary inter-semi-bold text-white w-full py-2 rounded-sm`}
        >
          {children}
        </button>
      );

    case 'auto':
      return (
        <button
          disabled={disabled}
          type={type}
          onClick={onClick}
          className={`${styles.primary_hover__state}  bg-custom-primary inter-semi-bold text-white w-auto py-2 px-4 rounded-sm`}
        >
          {children}
        </button>
      );
  }
};
