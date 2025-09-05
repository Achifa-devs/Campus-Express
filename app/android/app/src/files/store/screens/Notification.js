import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import WebView from 'react-native-webview';

export default function NotificationDetailsScreen({ route }) {
  let { data } = route?.params;

  return ( 
    <ScrollView style={styles.container}>
      <Image source={{ uri: data.thumbnail }} style={styles.image} />

      <View style={styles.contentWrapper}>
        <Text style={styles.title}>{data.title}</Text>

        <View style={styles.timeRow}>
          <Icon name="time-outline" size={16} color="#666" />
          <Text style={styles.timeText}>{data.date}</Text>
        </View>

        <Text style={styles.description}>{data.description}</Text>

        {/* WebView moved outside of Text component */}
        <View style={styles.webViewContainer}>
          <WebView 
            originWhitelist={['*']}
            source={{ html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                    body { 
                      font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
                      font-size: 15px;
                      color: #555;
                      line-height: 22px;
                      padding: 0;
                      margin: 0;
                    }
                    img { max-width: 100%; height: auto; }
                  </style>
                </head>
                <body>
                  ${data.content}
                </body>
              </html>
            ` }}
            style={styles.webView}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  image: {
    width: '100%',
    height: 220,
  },
  contentWrapper: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeText: {
    fontSize: 13,
    marginLeft: 6,
    color: '#888',
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    color: '#444',
  },
  webViewContainer: {
    height: 900, // You might need to adjust this
    marginTop: 12,
  },
  webView: {
    flex: 1,
  },
});