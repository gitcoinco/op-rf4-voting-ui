export const projects = Array(100)
  .fill(0)
  .map((_, i) => ({
    label: `Project ${i}`,
    value: String(i * 12),
    avatar: "",
    isOpenSource: Math.random() > 0.8,
  }));
export const _projects = [
  {
    label: "Zora",
    avatar: "",
    value: "20%",
  },
  {
    label: "Brownie",
    avatar: "",
    value: "19%",
  },
  {
    label: "Open Ethereum",
    avatar: "",
    value: "15%",
    isOpenSource: true,
  },
];
