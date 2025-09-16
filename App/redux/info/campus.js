import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  campus: 'All campus',
}

export const campus_slice = createSlice({
  name: 'campus',
  initialState,
  reducers: {
    set_campus: (state, action) => {
      state.campus = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set_campus } = campus_slice.actions

export default campus_slice.reducer





// export default function SearchBtn() {
//   const navigation = useNavigation();
//   const [isFocused, setIsFocused] = useState(false);
//   const [searchText, setSearchText] = useState('');
//   const scaleAnim = useRef(new Animated.Value(1)).current;
//   const opacityAnim = useRef(new Animated.Value(0.8)).current;

//   return (
    // <View style={styles.searchContainer}>
     
      {/* Recent searches suggestions (appears when focused) */}
      // {isFocused && (
      //   <Animated.View style={styles.suggestionsContainer}>
      //     <View style={styles.suggestionHeader}>
      //       <Text style={styles.suggestionTitle}>Recent Searches</Text>
      //       <TouchableOpacity>
      //         <Text style={styles.clearAllText}>Clear all</Text>
      //       </TouchableOpacity>
      //     </View>
          
      //     <View style={styles.suggestionList}>
      //       <TouchableOpacity style={styles.suggestionItem}>
      //         <Icon name="time-outline" size={16} color="#666" />
      //         <Text style={styles.suggestionText}>Restaurants nearby</Text>
      //       </TouchableOpacity>
            
      //       <TouchableOpacity style={styles.suggestionItem}>
      //         <Icon name="time-outline" size={16} color="#666" />
      //         <Text style={styles.suggestionText}>Coffee shops</Text>
      //       </TouchableOpacity>
            
      //       <TouchableOpacity style={styles.suggestionItem}>
      //         <Icon name="time-outline" size={16} color="#666" />
      //         <Text style={styles.suggestionText}>Hair salon</Text>
      //       </TouchableOpacity>
      //     </View>
      //   </Animated.View>
      // )}
    // </View>
//   );
// }

// const styles = StyleSheet.create({
//   searchContainer: {
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#f5f5f5',
//   },
//   searchContent: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     borderWidth: 1.5,
//     shadowColor: '#000',
//     // shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   searchInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     height: 52,
//   },
//   searchIcon: {
//     marginRight: 12,
//   },
//   searchTextContainer: {
//     flex: 1,
//     height: 45,
//     justifyContent: 'center',
//   },
//   placeholderText: {
//     fontSize: 16,
//     color: '#888',
//     fontWeight: '400',
//   },
//   clearButton: {
//     padding: 4,
//     marginRight: 8,
//   },
//   divider: {
//     width: 1,
//     height: 24,
//     backgroundColor: '#e0e0e0',
//     marginHorizontal: 12,
//   },
//   filterButton: {
//     padding: 4,
//   },
//   suggestionsContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     marginTop: 8,
//     padding: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     // position: 'absolute',
//     // top: 55,
//     // width: '100%',
//     // left: 10,
//     // zIndex: 10000
//   },
//   suggestionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   suggestionTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//   },
//   clearAllText: {
//     fontSize: 14,
//     color: '#FF4500',
//     fontWeight: '500',
//   },
//   suggestionList: {
//     // Suggestions list styling
//   },
//   suggestionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f5f5f5',
//   },
//   suggestionText: {
//     fontSize: 15,
//     color: '#333',
//     marginLeft: 10,
//   },
// });

  
  