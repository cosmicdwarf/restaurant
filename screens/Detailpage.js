import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';


const Detailpage = ({ route }) => {
    const item = route.params;
    const width = Dimensions.get('window').width;
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} />
                </View>
                <View style={styles.heading}>
                    <View style={styles.title}>
                        <Text style={styles.header}>{item.name}</Text>
                        <Text style={styles.header}>{'\u20B9'} {item.price}</Text>
                    </View>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </ScrollView>
            <Button onPress={() => s = console.log(item)}
                buttonStyle={{ backgroundColor: 'black', borderRadius: 30, height: 45, width: '100%', }}
                title="ADD TO CART  " titleStyle={{ fontSize: 12, color: 'white' }} containerStyle={{ borderRadius: 30, marginHorizontal: 30, marginBottom: 10 }}
                icon={<MaterialIcons name='add-shopping-cart' color={'white'} size={15} />} iconRight
            />
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 200
    },
    heading: {
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 20,
        marginTop: 40
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    header: {
        fontSize: 25,
        fontWeight: '500',
        marginRight: 20
    },
    description: {
        fontSize: 16
    }
})

export default Detailpage;