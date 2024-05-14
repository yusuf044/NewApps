import React from 'react';
import { View } from 'react-native';


type Props = {
  type?: 'Horizontal' | 'Vertical';
  size?: number | string;
};

const Spacer = ({ type, size = 2 }: Props) => {
  return type === 'Horizontal' ? (
    <View style={{ width: size, height: 2 }} />
  ) : (
    <View style={{ width: 2, height: size }} />
  );
};

export default Spacer;
