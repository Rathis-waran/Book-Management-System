interface ButtonProps {
  text: string;
  onClick: () => void;
  variant: "primary" | "danger" | "success" | "addtocart";
  disabled?: boolean;
}

const Button = ({ text, onClick, variant, disabled = false }: ButtonProps) => {
  return (
    <button
      className={`button button-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
