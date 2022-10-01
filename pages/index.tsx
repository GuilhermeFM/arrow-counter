import type { NextPage } from "next";
import { useState, HtmlHTMLAttributes } from "react";
import { useEffectOnce, useUpdateEffect } from "react-use";

import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

import { faAdd, faMinus } from "@fortawesome/free-solid-svg-icons";

const Home: NextPage = () => {
  const [arrows, setArrows] = useState<number>(0);

  const digits = arrows.toString().padStart(4, "0").split("").map(Number);

  const handleSum = () => {
    setArrows((prev) => {
      if (prev + 1 > 9999) {
        return prev;
      }

      return prev + 1;
    });
  };

  const handleMinus = () => {
    setArrows((prev) => {
      if (prev - 1 <= 0) {
        return prev;
      }

      return prev - 1;
    });
  };

  const handleReset = () => {
    setArrows(0);
    localStorage.removeItem("arrows");
  };

  useEffectOnce(() => {
    const savedArrowCounter = localStorage.getItem("arrows");
    setArrows(Number(savedArrowCounter));
  });

  useUpdateEffect(() => {
    localStorage.setItem("arrows", arrows.toString());
  }, [arrows]);

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-10">
      <h1 className="mb-26 text-8xl">Arrow counter</h1>
      <div className="flex items-center justify-center gap-3">
        {digits.map((digit, index) => (
          <Digit key={index}>{digit}</Digit>
        ))}
      </div>
      <div className="flex items-center justify-center gap-5">
        <Button
          className="flex items-center justify-center"
          onClick={handleSum}
        >
          <Icon icon={faAdd} />
        </Button>
        <Button
          className="flex items-center justify-center"
          onClick={handleMinus}
        >
          <Icon icon={faMinus} />
        </Button>
        <Button
          className="flex w-full items-center justify-center"
          onClick={handleReset}
        >
          reset
        </Button>
      </div>
    </div>
  );
};

type DigitProps = HtmlHTMLAttributes<HTMLSpanElement>;

function Digit({ className, children }: DigitProps) {
  return (
    <span
      className={`${className} flex items-center justify-center rounded-xl bg-zinc-700 p-6 text-8xl font-bold leading-snug`}
    >
      {children}
    </span>
  );
}

type ButtonProps = HtmlHTMLAttributes<HTMLButtonElement>;

function Button({ className, children, ...rest }: ButtonProps) {
  return (
    <button
      className={`h-16 w-16 rounded bg-purple-600 p-6 font-medium text-white transition-all duration-200 ease-in-out hover:bg-purple-800 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

type IconProps = FontAwesomeIconProps;

function Icon({ className, ...rest }: IconProps) {
  return <FontAwesomeIcon className={`${className}`} {...rest} />;
}

export default Home;
