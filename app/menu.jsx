import { StyleSheet, Appearance, Platform, SafeAreaView, ScrollView, FlatList, View, Text, Image } from "react-native";

import { Colors } from "@/constants/Colors";

import { MENU_ITEMS } from '@/constants/MenuItems'
import MENU_IMAGES from '@/constants/MenuImages'

export default function MenuScreen() {
    const colorScheme = Appearance.getColorScheme()

    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light

    const styles = createStyles(theme, colorScheme)

    const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView 

    const seperatorComponent = <View style={styles.seperator}></View>

    const headerComp = <Text>Top of list</Text>
    const footerComp = <Text>End of list</Text>

    return (
        <Container>
            <FlatList
                data={MENU_ITEMS}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
                ItemSeparatorComponent={seperatorComponent}
                // ListHeaderComponent={headerComp}
                ListFooterComponent={footerComp}
                ListFooterComponentStyle = { styles.footerComp}
                ListEmptyComponent={ <Text>No Items</Text> }
                renderItem={({ item }) => {
                    return (<View style={styles.row}>
                        <View style={ styles.menuTextRow}>
                            <Text style = {[styles.menuItemTitle, styles.menuItemText]}>{item.title}</Text>
                            <Text style={ styles.menuItemText}>{item.description}</Text>
                        </View>
                        <Image
                            source={MENU_IMAGES[item.id - 1]}
                            style={styles.menuImage}
                        />
                    </View>)
                }}
            />
        </Container>
    )
}

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        contentContainer: {
            paddingTop: 10,
            paddingBottom: 20,
            paddingHorizontal: 12,
            backgroundColor: theme.background
        },
        separator: {
            height: 1,
            backgroundColor: colorScheme === 'dark' ? 'papayawhip' : "#000",
            width: '50%',
            maxWidth: 300, // number not string
            alignSelf: 'center', // works on mobile and web
            marginBottom: 10,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
        },
        menuTextRow: {
            flex: 1,
            paddingRight: 10,
        },
        menuItemTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 4,
            color: theme.text
        },
        menuItemText: {
            fontSize: 14,
            color: theme.text,
        },
        menuImage: {
            width: 60,
            height: 60,
            borderRadius: 10,
            resizeMode: 'cover',
        },
        footerComp: {
            alignSelf: 'center',
            marginTop: 10,
        },
        footerText: {
            fontSize: 14,
            color: theme.text,
            marginVertical: 10,
        },
        emptyText: {
            textAlign: 'center',
            fontSize: 16,
            color: theme.text,
            marginTop: 20,
        }
    })
}