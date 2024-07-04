import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Button,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useTheme } from '../../../components/themes';
type Props = {
    navigation: NativeStackNavigationProp;
    //   route: RouteProp<RootStackParamsList, 'NewsDetails'>;
};
const LoginScene = ({ navigation }) => {
    const { theme } = useTheme();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    console.log('==============data', JSON.stringify(data));

    useEffect(() => {
        fetchItemList();
    }, []);

    const fetchItemList = async () => {
        try {
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/posts',
            );
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    const DUMMY_EXPENSES = [
        {
            id: 'e1',
            title: 'Toilet Paper',
            amount: 94.12,
            date: new Date(2020, 7, 14),
        },
        { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
        {
            id: 'e3',
            title: 'Car Insurance',
            amount: 294.67,
            date: new Date(2021, 2, 28),
        },
        {
            id: 'e4',
            title: 'New Desk (Wooden)',
            amount: 450,
            date: new Date(2021, 5, 12),
        },
    ];
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text
                style={{
                    fontSize: 50,
                    textAlign: 'center',
                    fontStyle: 'italic',
                    fontWeight: '900',
                    color: 'red',
                }}>
                MY APP
            </Text>
            {/* <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: theme === 'light' ? '#FFF' : '#000', paddingHorizontal: 14
                }}>
                <Spacer size={6} />
                <View
                    style={{
                        backgroundColor: '#FFF',
                        width: '100%',
                        borderRadius: 20,
                        paddingHorizontal: 10, elevation: 8, borderTopColor: "#cccc", borderTopWidth: 5
                    }}>
                    <TextInput placeholder="Phone/Email" />
                </View>
                {isError && <Text style={{ fontSize: 12, color: "red", marginLeft: 8 }}>Wrong Way</Text>}
                <Spacer size={10} />
                <View
                    style={{
                        backgroundColor: '#FFF',
                        width: '100%',
                        borderRadius: 20,
                        paddingHorizontal: 10, elevation: 8, borderTopColor: "#cccc", borderTopWidth: 5
                    }}>
                    <TextInput placeholder="Password" />
                </View>
                {isError && <Text style={{ fontSize: 12, color: "red", marginLeft: 8 }}>Wrong Way</Text>}
                <Spacer size={3} />
                <Text style={{ textAlign: 'left', marginLeft: 8 }}>Forgot Password</Text>
                <Button title='LOGIN ' onPress={() => navigation.navigate("HomePage")} />
            </View> */}
            {/* <Button title='Calculater Open ' onPress={() => navigation.navigate("Calculator")} /> */}
            <Button title="Button" />

            <FlatList
                data={data}
                renderItem={({ item, index }) => (
                    <View
                        key={index}
                        style={{
                            padding: 4,
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: 'red',
                            margin: 2,
                        }}>
                        {console.log('=========item', item)}
                        <Text style={{ color: 'red' }}>{item.title}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default LoginScene;
const styles = StyleSheet.create({});
