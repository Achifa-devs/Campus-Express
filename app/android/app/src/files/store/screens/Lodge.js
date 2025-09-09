import React, { useRef, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, RefreshControl, Image, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 24;
const VIDEO_HEIGHT = CARD_WIDTH * 9/16; // 16:9 aspect ratio like YouTube

const LodgeCard = ({ item }) => {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(true); // Start paused like YouTube
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const navigation = useNavigation();

  const togglePlay = () => setPaused(!paused);
  const toggleMute = () => setMuted(!muted);
  const toggleControls = () => setShowControls(!showControls);

  return (
    <View style={styles.cardContainer}>
      {/* Video Thumbnail Container */}
      <TouchableOpacity 
        activeOpacity={1}
        onPress={togglePlay}
        onLongPress={toggleControls}
      >
        <View style={styles.videoContainer}>
          {/* Video Player */}
          <Video
            ref={videoRef}
            source={{ uri: item.videoUrl }}
            style={styles.video}
            resizeMode="cover"
            muted={muted}
            paused={paused}
            repeat
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
          />
          
          {/* Thumbnail Overlay (shown when paused) */}
          {paused && (
            <Image 
              source={{ uri: item.thumbnail }} 
              style={styles.thumbnail}
              blurRadius={2}
            />
          )}
          
          {/* Loading Indicator */}
          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#FF0000" />
            </View>
          )}
          
          {/* Play Button (shown when paused) */}
          {paused && (
            <View style={styles.playButton}>
              <Icon name="play" size={48} color="#FFF" />
            </View>
          )}
          
          {/* Video Controls (shown on long press) */}
          {showControls && (
            <View style={styles.controlsOverlay}>
              <TouchableOpacity onPress={toggleMute} style={styles.controlButton}>
                <Icon 
                  name={muted ? 'volume-mute' : 'volume-high'} 
                  size={24} 
                  color="#FFF" 
                />
              </TouchableOpacity>
            </View>
          )}
          
          {/* Video Duration */}
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>12:34</Text>
          </View>
        </View>
        {isPromoted && (
          <View style={styles.boostBadge}>
            <Icon name="rocket" size={12} color="#FFF" />
            <Text style={styles.boostBadgeText}>Sponsored</Text>
          </View>
        )} 
      </TouchableOpacity>

      {/* Lodge Details - YouTube Style */}
      <View style={styles.detailsContainer}>
        <Image 
          source={{ uri: item.channelLogo }} 
          style={styles.channelLogo}
        />
        
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.channelName}>{item.lodgeName}</Text>
          <Text style={styles.meta}>
            {item.views} views • {item.timestamp}
          </Text>
        </View>
        
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="ellipsis-vertical" size={16} color="#606060" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LodgeList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([
    {
      id: '1',
      title: 'Luxury Student Accommodation Tour - Witness Lodge',
      videoUrl: 'https://res.cloudinary.com/...',
      thumbnail: 'https://example.com/thumbnail1.jpg',
      channelLogo: 'https://example.com/channel1.jpg',
      price: 2300000,
      lodgeName: 'Witness Lodge',
      location: 'Lagos, Nigeria',
      views: '12K',
      timestamp: '2 weeks ago',
      duration: '4:32'
    },
    {
      id: '2',
      title: 'Premium Suite with Amazing Amenities | Elite Residences',
      videoUrl: 'https://example.com/video2.mp4',
      thumbnail: 'https://example.com/thumbnail2.jpg',
      channelLogo: 'https://example.com/channel2.jpg',
      price: 3500000,
      lodgeName: 'Elite Residences',
      location: 'Abuja, Nigeria',
      views: '24K',
      timestamp: '1 month ago',
      duration: '6:15'
    }
  ]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const renderItem = ({ item }) => <LodgeCard item={item} />;

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#FF0000"
          colors={['#FF0000']}
        />
      }
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  boostBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    // width: '100%',
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    gap: 4,
  },
  boostBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  listContainer: {
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  cardContainer: {
    marginBottom: 16,
    marginHorizontal: 12,
  },
  videoContainer: {
    width: CARD_WIDTH,
    height: VIDEO_HEIGHT,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  thumbnail: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.7,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  playButton: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 16,
  },
  controlButton: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 8,
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  durationText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
  detailsContainer: {
    flexDirection: 'row',
    paddingTop: 12,
  },
  channelLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#030303',
    lineHeight: 20,
    marginBottom: 4,
  },
  channelName: {
    fontSize: 13,
    color: '#606060',
    marginBottom: 2,
  },
  meta: {
    fontSize: 13,
    color: '#606060',
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LodgeList;