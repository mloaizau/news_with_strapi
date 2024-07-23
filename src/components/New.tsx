import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import moment from 'moment';
import urlParse from "url-parse";
import es from "moment/locale/es";
import InAppBrowser from 'react-native-inappbrowser-reborn';

export const New = (props: any) => {

    const { data } = props;
    const { attributes: { title, url, createdAt } } = data;

    const openUrlExtern = () => {
        //en navegador externo
        Linking.openURL(url);
    }

    const openUrlIntern = async () => {
        try {
            if (await InAppBrowser.isAvailable()) {
                const result = await InAppBrowser.open(url, {
                    // iOS Properties
                    dismissButtonStyle: 'cancel',
                    preferredBarTintColor: '#000',
                    preferredControlTintColor: 'white',
                    readerMode: false,
                    animated: true,
                    modalPresentationStyle: 'fullScreen',
                    modalTransitionStyle: 'coverVertical',
                    modalEnabled: true,
                    enableBarCollapsing: false,
                    // Android Properties
                    showTitle: true,
                    toolbarColor: '#000',
                    secondaryToolbarColor: 'black',
                    navigationBarColor: 'black',
                    navigationBarDividerColor: 'white',
                    enableUrlBarHiding: true,
                    enableDefaultShare: true,
                    forceCloseOnRedirection: false,
                    // Specify full animation resource identifier(package:anim/name)
                    // or only resource name(in case of animation bundled with app).
                    animations: {
                        startEnter: 'slide_in_right',
                        startExit: 'slide_out_left',
                        endEnter: 'slide_in_left',
                        endExit: 'slide_out_right'
                    },
                    headers: {
                        'my-custom-header': 'my custom header value'
                    }
                })
            }
            else Linking.openURL(url)
        } catch (error) {
        }
    }

    return (
        <TouchableOpacity onPress={openUrlIntern} >
            <View style={styles.new} >
                <Text style={styles.url} > {urlParse(url).host} </Text>
                <Text style={styles.title} > {title} </Text>
                <Text style={styles.time} > {moment(createdAt).local(es).startOf().fromNow()} </Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    new: {
        padding: 20,
        borderBottomColor: "grey",
        borderBottomWidth: 1
    },
    url: {
        paddingBottom: 5,
        color: "grey"
    },
    title: {
        fontWeight: "bold",
        fontSize: 18
    },
    time: {
        paddingTop: 10,
        color: "grey"
    }
});