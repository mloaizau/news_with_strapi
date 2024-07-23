import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, SafeAreaView, Text } from "react-native";
import { getNewsApi } from "./src/api/news.api";
import { map } from "lodash";
import { New } from "./src/components/New";

const App = () => {

  const [news, setNews] = useState(null);

  useEffect(() => {
    getNewsApi().then((resp) => {
      console.log(news)
      setNews(resp);
    })
  }, [])
  
  if (!news) return null;

  return (
    <SafeAreaView>
      <Text style={styles.title} >
        Últimas Noticias
      </Text>
      <ScrollView style={styles.scrollview} >
        {
          map(news, (data: any) => (
            <New key={data.id} data={data} />
          ))
        }
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    title:{
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 25,
      paddingVertical: 10
    },
    scrollview: {
      height: "100%"
    }
});

export default App;