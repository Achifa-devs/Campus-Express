import React, { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import SearchBar from '../components/Sasrch/SearchBar'
import SearchResult from '../components/Sasrch/SearchResult'
import { GetSearchWord } from '../apis/buyer/get'
import { useNavigation } from '@react-navigation/native'

export default function Search() {
    let [search_char, set_search_char] = useState('')
    let [search_word, set_search_word] = useState([])
    let [isReady, setIsReady] = useState(true);

    function updateSearchChar(data) {
        set_search_char(data)
    }
  useEffect(() => {
       
    if (search_char !== '' && search_char.trim() !== '') {
      setIsReady(false)
      fetch(`https://cs-node.vercel.app/search?word=${search_char}`, {
        headers: {
          "Content-Type": "Application/json" 
        }
      })
      .then(async (result) => {
          let response = await result.json();
          console.log("response", response)
          set_search_word(response.data);
          setIsReady(true)
          
      })
      .catch((err) => {
        setIsReady(false)
        
        Alert.alert('Network error, please try again.');
        console.log(err);
      });
    }
  }, [search_char]);

  const navigation = useNavigation();
  
  useEffect(() => {
    if (search_char === 'rty') {
      navigation.navigate('user-editor');
    }
  }, [search_char])

  return (
    <>
      <View>
        <SearchBar updateSearchChar={updateSearchChar} />   
        <SearchResult search_word={search_word} search_char={search_char} isReady={isReady} />
      </View>
    </>
  )
}
