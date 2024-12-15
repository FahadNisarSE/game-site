import React from "react";

interface ButtonProps {
  id: string;
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClass?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  id,
  title,
  leftIcon,
  rightIcon,
  containerClass,
  onClick,
}) => {
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
      onClick={onClick}
    >
      {leftIcon}
      <span className="relative inline-flex text-xs uppercase overflow-hidden font-general">
        <div>{title}</div>
        {rightIcon}
      </span>
    </button>
  );
};

export default Button;
