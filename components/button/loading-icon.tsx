import { css, keyframes } from '@emotion/react';
import { LoadingFour } from '@icon-park/react';
import { FC } from 'react';

interface LoadingIconProps {}

const LoadingIcon: FC<LoadingIconProps> = () => {
  return <LoadingFour css={styles} />;
};

export default LoadingIcon;

const loadingCircle = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const styles = css`
  display: inline-block;
  margin-right: 6px;
  animation: ${loadingCircle} 1s linear infinite;
`;
