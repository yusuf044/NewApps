import {Dimensions} from 'react-native';
const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const Sizes = {
  x: 1,
  xs: 2,
  s: 4,
  sx: 6,
  xm: 8,
  xms: 10,
  m: 12,
  mx: 14,
  l: 16,
  xx: 18,
  xl: 20,
  xsl: 22,
  xxl: 24,
  xxxl: 28,
  x3l: 30,
  x4l: 32,
  xx4l: 38,
  x5l: 36,
  x6l: 40,
  x7l: 48,
  x8l: 50,
  x9l: 64,
  ex: 80,
  exl: 100,
  ex0: 120,
  ex1: 150,
  ex2l: 200,
  ex3l: 300,
  ex4l: 400,
  windowWidth: window.width,
  screenWidth: screen.width,
  screenHeight: screen.height,
};

export default Sizes;
