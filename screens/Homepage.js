import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Image, TextInput, StyleSheet } from 'react-native';
import { TouchableRipple, IconButton } from 'react-native-paper';
import { restaurantData } from '../assets/Data/restaurant';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, Octicons, MaterialIcons } from '@expo/vector-icons';
import { Menu, } from 'react-native-paper';

const Homepage = () => {
    const navigation = useNavigation();

    const [visible, setVisible] = useState(false);
    const [sortBy, setSortBy] = useState('rating');
    const [showVeg, setShowVeg] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const sortedAndFilteredData = restaurantData
        .filter(item => !showVeg || item.type === 'Veg')
        .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())) // Search filter
        .sort((a, b) => {
            if (sortBy === 'rating') {
                return b.rating - a.rating;
            } else if (sortBy === 'price') {
                return a.price - b.price;
            }
            return 0;
        });

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />


            <View style={styles.scrollContainer}>
                <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                    <Text style={styles.header}>Restaurant</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Search...'
                            style={styles.input}
                            onChangeText={(text) => setSearchQuery(text)}
                            value={searchQuery}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginRight: 5 }}>
                            <Menu
                                visible={visible}
                                onDismiss={() => setVisible(false)} style={{ marginTop: 20 }}
                                anchor={<IconButton onPress={() => setVisible(true)} icon={() => <MaterialCommunityIcons name='filter-variant' size={30} />} />}>
                                <Menu.Item onPress={() => { setShowVeg(!showVeg); setVisible(false) }} title={showVeg ? 'Show All' : 'Show Veg'} />
                                <Menu.Item onPress={() => { setSortBy('rating'); setVisible(false) }} title="Sort by Rating" />
                                <Menu.Item onPress={() => { setSortBy('price'), setVisible(false) }} title="Sort by Price" />
                            </Menu>
                        </View>
                    </View>
                    <View style={{ margin: 20 }}>
                        {sortedAndFilteredData.map((item, index) => (
                            <TouchableRipple style={styles.cardContainer} borderless key={index} onPress={() => navigation.navigate('Detailpage', item)}>
                                <View>
                                    <Image source={item.image} style={styles.image} />
                                    <View style={styles.caption}>
                                        <View>
                                            <Text style={styles.cardHeader}>{item.name}</Text>
                                            <Text style={styles.rating}>{item.rating}<MaterialCommunityIcons name='star' size={17} color="gold" /></Text>
                                        </View>
                                        <View >
                                            <Text style={styles.cardHeader}>{'\u20B9'} {item.price}</Text>
                                            <Text style={{ marginTop: 5 }}><MaterialCommunityIcons name='square-circle' color={item.type === 'Veg' ? 'green' : 'red'} /> {item.type}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableRipple>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 20
    },
    inputContainer: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        backgroundColor: '#f2f2f2',
        height: 45,
        borderRadius: 10,
        width: '80%',
        paddingLeft: 15
    },
    cardContainer: {
        borderRadius: 10, marginBottom: 10
    },
    image: {
        width: '100%',
        height: 200,
    },
    cardHeader: {
        fontSize: 20,
        fontWeight: '400',
    },
    rating: {
        fontSize: 17,
        marginTop: 5
    },
    caption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    }
})

export default Homepage;