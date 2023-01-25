import styled from 'styled-components';
import {
  CloudFill,
  CloudDrizzleFill,
  SunFill,
  CloudSunFill,
  CloudSnowFill,
  SunriseFill,
  SunsetFill,
} from '@styled-icons/bootstrap';
import { MyLocation } from '@styled-icons/fluentui-system-regular';

export const Sunrise = styled(SunriseFill)`
  color: #ff3c00;
  width: 20px;
  height: 20px;
`;

export const Sunset = styled(SunsetFill)`
  color: #ff3c00;
  width: 20px;
  height: 20px;
`;

export const Cloudy = styled(CloudFill)`
  color: #fff;
  width: 30px;
  height: 30px;
`;

export const LittleCloudy = styled(CloudSunFill)`
  color: #fff;
  width: 30px;
  height: 30px;
`;

export const Snowy = styled(CloudSnowFill)`
  color: #fff;
  width: 30px;
  height: 30px;
`;

export const Rainy = styled(CloudDrizzleFill)`
  color: #fff;
  width: 30px;
  height: 30px;
`;

export const Sunny = styled(SunFill)`
  color: #fff;
  width: 30px;
  height: 30px;
`;

export const SubmitIcon = styled(MyLocation)`
  color: grey;
  width: 20px;
  height: 20px;
  opacity: 0.7;
`;
