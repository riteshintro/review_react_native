import { Image, StyleSheet, Platform, View, FlatList,StatusBar,Animated, RefreshControl } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useRef, useState } from 'react';
import { getAllReview } from '../../../services';
import { Avatar, Button, Card,Text } from 'react-native-paper';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { AntDesign } from '@expo/vector-icons';
import ViewShot from "react-native-view-shot";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const [reviews, setReviews]=useState([])
  const [rating, setRating] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const ref = useRef();
  const params = useLocalSearchParams()
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showSimmer, setShowSimmer]=useState(true)
  const [refreshing, setRefreshing] = useState(false);
  // const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

  const searchInputHeight = scrollY.interpolate({
    inputRange: [0, 40],
    outputRange: [40, 0],
    extrapolate: 'clamp',
  });
  StatusBar.setBarStyle('dark-content'); 

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

const debouncedSearchQuery = useDebounce(searchQuery, 2000);

const fetchData = async (pageNum = 1, isRefreshing = false) => {
  try {
    const res = await getAllReview({ 
      page: pageNum, 
      source: debouncedSearchQuery, 
      rating: params.rating, 
      type: params.selectedType 
    });
    setShowSimmer(false);
    setRefreshing(false);
    // setLoading(false)
    if (res?.data?.data.length > 0) {
      if (isRefreshing) {
        setReviews(res?.data?.data);
      } else {
        setReviews((prevData) => [...prevData, ...res?.data?.data]);
      }
      setPage(pageNum + 1);
    } else {
      setHasMore(false);
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
    setRefreshing(false);
  }
};

  useEffect(() => {
    if(searchQuery){
    fetchData(1,true)
    }else{
     fetchData(page);
    }

  }, [debouncedSearchQuery,params.rating]);

  const renderFooter = () => {
    // if (!loading) return null;
    return  <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
    <ActivityIndicator animating={true} color={MD2Colors.red800} />
  </View>;
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      fetchData(page);
      // setLoading(true)
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1); // Reset page to 1
    fetchData(1, true); // Pass true to indicate refresh
  };
const renderSimmer = () => (
  <View style={{ alignSelf: "center", width: "90%", marginVertical: 10 }}>
    {[...Array(5)].map((_, index) => (
      <ShimmerPlaceholder
        key={index}
        LinearGradient={LinearGradient}
        duration={2000}
        style={styles.placeholder}
      />
    ))}
  </View>
);

  const renderItem = ({ item }) => (
<ViewShot ref={ref} options={{ fileName: "Your-File-Name", format: "jpg", quality: 0.9 }}>
<Card style={styles.listContainer}>
  <View style={{flexDirection:"row"}}>
    <View style={{ flex: 1, flexDirection: "row" }}>
      {item.image?<Avatar.Image size={34} source={{ uri: `${item.image}` }} />:<Avatar.Image size={34} source={{ uri: 'https://images.pexels.com/photos/23483900/pexels-photo-23483900/free-photo-of-a-woman-in-a-white-dress-and-boots-standing-in-a-field.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' }} />}
      <View style={{ marginLeft: 15 }}>
        <Text variant="titleSmall" style={{ fontWeight: "bold" }}>{item.author_name}</Text>
        <Rating
          type="star"
          fractions={1}
          startingValue={item.rating}
          imageSize={20}
          onFinishRating={handleRatingChange}
        />
      </View>
    </View>
    <View><Text style={{fontWeight:"bold",textTransform:"capitalize"}}>{item.source}</Text></View>
    </View>
    <View><Text variant="titleSmall">{item.text}</Text></View>
     <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", borderTopColor: '#ff6347' }}>
      <TouchableOpacity style={{ padding: 1 }}>
        <FontAwesome5 name="share-square" size={20} color="black"
         onPress={() => router.push({ pathname: '/review-share', params: item })}
         />
      </TouchableOpacity>
    </View>
  </Card>
</ViewShot>

  );

  return (
<View  style={styles.container}>
<Animated.View style={{ height: searchInputHeight, overflow: 'hidden' }}>
        <Searchbar
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchBar}
          inputStyle={styles.input} 
        />
      </Animated.View>
      {/* <ShimmerPlaceHolder /> */}
{/* <ShimmerPlaceHolder visible={isFetched}>
  <Text>
    Wow, awesome here.
  </Text>
</ShimmerPlaceHolder> */}

{/* <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
      theme={{ colors: { primary: 'blue' } }}
      style={{backgroundColor:"white",width:"95%",alignSelf:"center",}}
    /> */}
{/* <FlatList
      data={reviews}
      renderItem={renderItem}
      keyExtractor={item => item.id} // Extract a unique key for each item
      showsVerticalScrollIndicator={false}
    /> */}
    { showSimmer?
  //    <View style={{alignSelf:"center",width:"90%",marginVertical:10}}>
  // {[...Array(5)].map((_, index) => (
  //           <ShimmerPlaceholder
  //             key={index}
  //             LinearGradient={LinearGradient}
  //             duration={2000}
  //             style={styles.placeholder}
  //           />
  //         ))}
  //     </View>   
  <>{renderSimmer()}</>
    : <Animated.FlatList
       data={reviews}
       renderItem={renderItem}
       keyExtractor={(item,index) => index} // Extract a unique key for each item
       showsVerticalScrollIndicator={false}
       ListFooterComponent={renderFooter}
       onEndReached={handleLoadMore}
       onEndReachedThreshold={0.5}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      />}
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor:"#f6efe0"
  },
  listContainer:{
margin:10,
  padding: 10,
  backgroundColor:"#fff"
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  searchBar: {
    // marginHorizontal: 10,
    height: 40, // Adjust height here
    width: '95%', // Adjust width here or use a fixed value like 300
    alignSelf: 'center', // Center the search bar
    backgroundColor:"white"
  },
  input: {
    fontSize: 12, // Adjust font size if necessary
    padding: 0, // Remove default padding
    marginTop: -7, // Adjust margin to fine-tune vertical alignment
  },
  placeholder: {
    borderRadius: 10,
    height:150,
    width:"100%",
    marginBottom:5
    // padding: 20,
  },
  // placeholderContent: {
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'flex-start',
  // },
  // placeholderLine: {
  //   height: 20,
  //   marginBottom: 10,
  //   backgroundColor: '#e6e6e6',
  //   borderRadius: 5,
  // },
});
