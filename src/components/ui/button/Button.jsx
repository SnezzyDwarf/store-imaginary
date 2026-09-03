import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
