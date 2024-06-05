import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (num = 0) =>
  Number(num)?.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }) ?? "0";

export const suffixNumber = (num: number) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1_000, symbol: "k" },
    { value: 1_000_000, symbol: "M" },
  ];
  const regexp = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = [...lookup].reverse().find((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(2).replace(regexp, "$1") + item.symbol
    : "0";
};

export function debounce<T extends unknown[], U>(
  callback: (...args: T) => PromiseLike<U> | U,
  wait: number
) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: T): Promise<U> => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(callback(...args)), wait);
    });
  };
}

export const formatDate = (date?: string | Date) =>
  date && `${format(date, "MMM d")} at ${format(date, "hh:mm a")} UTC`;
