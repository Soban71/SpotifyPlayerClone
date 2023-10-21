import {
  View,
  Text,
  StatusBar,
  Image,
  Touchable,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {songsList} from './SongList/Song';
import TrackPlayer, {
  Capability,
  usePlaybackState,
  State,
  useProgress
} from 'react-native-track-player';
import SongPlayer from './SongPlayer';

export default function App() {
  const [currentIndex, setcurrentIndex] = useState(2);
  const [IsVisBle,setIsVisible]=useState(false);

  const playbackState = usePlaybackState();
  const progress = useProgress();


  useEffect(() => {
    setupPlayer();
  }, []);

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],

        // Capabilities that will show up when the notification is in the compact form on Android
        compactCapabilities: [Capability.Play, Capability.Pause],
      });
      await TrackPlayer.add(songsList);
    } catch (e) {}
  };
  return (
    <LinearGradient
      colors={['#a34c0d', '#592804', '#241001']}
      style={{flex: 1}}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Image
        source={require('./Images/left.png')}
        style={{
          width: 24,
          height: 24,
          tintColor: 'white',
          marginTop: 20,
          marginLeft: 20,
        }}
      />

      <View
        style={{
          width: '85%',
          alignSelf: 'center',
          marginTop: 20,
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: '80%',
            height: 40,
            backgroundColor: '#b06a41',
            borderRadius: 4,
            flexDirection: 'row',
            paddingLeft: 15,
            alignItems: 'center',
          }}>
          <Image
            source={require('./Images/search2.png')}
            style={{
              width: 20,
              height: 20,
              tintColor: 'white',
            }}
          />
          <Text style={{color: 'white', marginLeft: 10, fontWeight: 300}}>
            Find in playlist
          </Text>
        </View>

        <View
          style={{
            width: '15%',
            height: 40,
            backgroundColor: '#b06a41',
            borderRadius: 4,
            flexDirection: 'row',
            paddingLeft: 15,
            alignItems: 'center',
            marginLeft: 5,
          }}>
          <Text
            style={{justifyContent: 'center', color: 'white', fontWeight: 300}}>
            Sort
          </Text>
        </View>
      </View>

      <Image
        source={{uri: songsList[currentIndex].artwork}}
        style={{
          width: '70%',
          height: '35%',
          alignSelf: 'center',
          marginTop: 20,
          borderRadius: 5,
        }}
      />
      <Text
        style={{
          color: 'white',
          fontSize: 20,
          fontWeight: 600,
          marginLeft: 20,
          marginTop: 20,
        }}>
        {songsList[currentIndex].title}
      </Text>

      <View style={{flexDirection: 'row', marginTop: 20, paddingLeft: 20}}>
        <Image
          source={require('./Images/spotify.png')}
          style={{width: 18, height: 18}}
        />
        <Text style={{color: 'white', fontSize: 14, marginLeft: 10}}>
          English Songs
        </Text>
        <View />
      </View>

      <View style={{flexDirection: 'row', marginTop: 10, paddingLeft: 20}}>
        <Text style={{color: '#bababa', fontSize: 12}}>20,168 saves</Text>
        <Text style={{color: '#bababa', fontSize: 12, marginLeft: 10}}>
          4h 26m
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          marginTop: 20,
          justifyContent: 'space-between',
          alignSelf: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('./Images/plus.png')}
            style={{height: 18, width: 18, tintColor: '#bababa'}}
          />

          <Image
            source={require('./Images/arrow-down.png')}
            style={{
              height: 18,
              width: 18,
              tintColor: '#bababa',
              marginLeft: 15,
            }}
          />

          <Image
            source={require('./Images/option.png')}
            style={{
              height: 18,
              width: 18,
              tintColor: '#bababa',
              marginLeft: 15,
            }}
          />
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('./Images/suffle.png')}
            style={{width: 30, height: 30, tintColor: '#bababa'}}
          />

          <TouchableOpacity
            onPress={async () => {
              if (State.Playing == playbackState) {
                await TrackPlayer.pause();
              } else {
                await TrackPlayer.skip(currentIndex);
                await TrackPlayer.play();
              }
            }}>
            {State.Playing == playbackState ? (
              <Image
                source={require('./Images/pause.png')}
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: 20,
                  marginRight: 10,
                  tintColor: '#3ad934',
                }}
              />
            ) : (
              <Image
                source={require('./Images/play-button.png')}
                style={{
                  width: 50,
                  height: 50,
                  marginLeft: 20,
                  marginRight: 10,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={songsList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 20,
                paddingRight: 20,
                marginTop: 10,
              }}
              onPress={async () => {
                await TrackPlayer.pause();
                await TrackPlayer.skip(index);
                await TrackPlayer.play();
                setcurrentIndex(index);
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={{uri: item.artwork}}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />

                <View style={{marginLeft: 10}}>
                  <Text style={{color: 'white'}}>{item.title}</Text>
                  <Text style={{color: 'white', fontSize: 10}}>
                    {item.artist}
                  </Text>
                </View>
              </View>

              {index == currentIndex && State.Playing == playbackState && (
                <Image
                  source={require('./Images/playing.png')}
                  style={{
                    width: 18,
                    height: 18,
                    tintColor: 'white',
                    marginLeft: 20,
                  }}
                />
              )}

              <Image
                source={require('./Images/option.png')}
                style={{width: 18, height: 18, tintColor: '#bababa'}}
              />
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity
      activeOpacity={1}
        style={{
          width: '100%',
          height: 80,
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.9)',
          flexDirection: 'row',
          paddingLeft: 20,
          paddingRight: 20,
          justifyContent: 'space-between',
        }}
        onPress={()=>{
          setIsVisible(true)
        }}
        >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: songsList[currentIndex].artwork}}
            style={{width: 50, height: 50, borderRadius: 5}}
          />
          <View style={{marginLeft: 10}}>
            <Text style={{color: 'white'}}>
              {songsList[currentIndex].title}
            </Text>
            <Text style={{color: 'white', fontSize: 10}}>
              {songsList[currentIndex].artist}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{alignItems: 'center', flexDirection: 'row'}}
          onPress={async () => {
            if (State.Playing == playbackState) {
              await TrackPlayer.pause();
            } else {
              await TrackPlayer.skip(currentIndex);
              await TrackPlayer.play();
            }
          }}>
          <Image
            source={
              State.Playing == playbackState
                ? require('./Images/pause.png')
                : require('./Images/play.png')
            }
            style={{width: 30, height: 30, tintColor: 'white'}}
          />
        </TouchableOpacity>
      </TouchableOpacity>


      <SongPlayer
      IsVisBle={IsVisBle}
        songsList={songsList}
        currentIndex={currentIndex}
        playbackState={playbackState}
        progress={progress}
        onChange={(x)=>{
          setcurrentIndex(x)
        }}
        onClose={()=>{
          setIsVisible(false);
        }}
      />
    </LinearGradient>
  );
}
