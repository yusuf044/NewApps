import React from 'react';
import { Image, ImageProps, ViewProps } from 'react-native';

import { Theme, useTheme } from '@react-navigation/native';
import { Sizes } from '../../../common';
import Icons from '../../../common/icons';



type Props = {
    icon?: keyof typeof Icons;
    tintColor?: keyof Theme['colors'];
    resizeMode?: ImageProps['resizeMode'];
    style?: ViewProps['style'];
    sourceType?: 'local' | 'url';
    source?: string;
    size?: keyof typeof Sizes;
};

const ImageIcon = ({
    icon,
    tintColor,
    style,
    resizeMode = 'contain',
    sourceType = 'local',
    source,
    size = 'l',
}: Props) => {
    const { colors } = useTheme();

    return (
        <>
            <Image
                resizeMode={resizeMode}
                tintColor={tintColor}
                style={[
                    size && { height: Sizes[size], width: Sizes[size] },
                    style,
                ]}
                source={sourceType === 'local' ? Icons[icon] : { uri: source }}
                index={0}
            />
        </>
    );
};

export default ImageIcon;
