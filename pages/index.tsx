import type { NextPage } from "next";
import { useState, HtmlHTMLAttributes } from "react";
import { useEffectOnce, useUpdateEffect } from "react-use";

import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

import { faAdd, faMinus, faRefresh } from "@fortawesome/free-solid-svg-icons";

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
    <div className="flex h-full w-full flex-col items-center justify-center gap-28 p-6">
      <h1 className="text-5xl">Arrow counter</h1>

      <div className="flex w-full items-center justify-center gap-1">
        {digits.map((digit, index) => (
          <Digit key={index}>{digit}</Digit>
        ))}
      </div>

      <div className="flex w-full flex-wrap items-center justify-center gap-6">
        <Button title="add" onClick={handleSum}>
          <Icon icon={faAdd} />
        </Button>
        <Button title="remove" onClick={handleMinus}>
          <Icon icon={faMinus} />
        </Button>
        <Button title="reset" onClick={handleReset}>
          <Icon icon={faRefresh} />
        </Button>
      </div>
    </div>
  );
};

type DigitProps = HtmlHTMLAttributes<HTMLSpanElement>;

function Digit({ className, children }: DigitProps) {
  return (
    <span
      className={`${className} flex items-center justify-center bg-zinc-700 p-6 text-6xl font-bold leading-relaxed first:rounded-l-xl last:rounded-r-xl`}
    >
      {children}
    </span>
  );
}

type ButtonProps = HtmlHTMLAttributes<HTMLButtonElement>;

function Button({ className, children, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={`flex h-16 w-16 items-center justify-center rounded-full bg-zinc-700 p-6 hover:bg-purple-700 hover:text-white ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

type IconProps = FontAwesomeIconProps;

function Icon({ className, ...rest }: IconProps) {
  return <FontAwesomeIcon className={`h-8 w-8 ${className}`} {...rest} />;
}

export default Home;
