import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ImageIcon from '../atoms/imageIcon';
import { Sizes } from '../../common';
type Props = {
    navigation?: NativeStackNavigationProp<RootStackParamsList>;

}
const Header = ({ navigation }: Props) => {
    return (
        <TouchableOpacity
            style={{ backgroundColor: 'red', padding: Sizes.s, width: 20 }}
            onPress={() => {
                Alert.alert("back")
                navigation?.goBack();

            }}>
            <ImageIcon icon="goBack" />
        </TouchableOpacity>
    );
};

export default Header;

const styles = StyleSheet.create({});
