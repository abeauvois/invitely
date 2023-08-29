export const breakPoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};

const xxlarge = `@media (min-width: ${breakPoints.xxl}px)`;
const xlarge = `@media (min-width: ${breakPoints.xl}px)`;
const large = `@media (min-width: ${breakPoints.lg}px)`;
const medium = `@media (min-width: ${breakPoints.md}px)`;
const small = `@media (min-width: ${breakPoints.sm}px)`;

export const mq = {
  xxlarge,
  xlarge,
  large,
  medium,
  small,
};
