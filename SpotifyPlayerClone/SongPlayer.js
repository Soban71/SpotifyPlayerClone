import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import TrackPlayer, { State } from 'react-native-track-player';

export default function SongPlayer({
  songsList,
  currentIndex,
  playbackState,
  progress,
  IsVisBle,
  onClose,
}) {

  const [currentSongIndex , setCurrentSongIndex] = useState(currentIndex)
  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  return (
    <Modal isVisible={IsVisBle} style={{margin: 0}}>
      <LinearGradient
        colors={['#067a02', '#064f03', '#032901', '#000000']}
        style={{flex: 1}}>
        <TouchableOpacity
          style={{
            marginTop: 40,
            marginLeft: 20,
          }}
          onPress={() => {
            onClose();
          }}>
          <Image
            source={require('./Images/left.png')}
            style={{
              width: 24,
              height: 24,
              tintColor: 'white',
            }}
          />
        </TouchableOpacity>

        <Image
          source={{uri: songsList[currentSongIndex].artwork}}
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
          {songsList[currentSongIndex].title}
        </Text>

        <Text
          style={{
            color: 'white',
            fontSize: 17,
            fontWeight: 200,
            marginLeft: 20,
          }}>
          {songsList[currentSongIndex].artist}
        </Text>

        <Slider
          style={{width: '90%', height: 40, alignSelf: 'center'}}
          minimumValue={progress.position}
          maximumValue={progress.duration}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#ffffff"
        />

        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
          }}>
          <Text style={{color: 'white'}}>{format(progress.position)}</Text>
          <Text style={{color: 'white'}}>{format(progress.duration)}</Text>
        </View>

        <View
          style={{
            width: '90%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection:'row',
            marginTop:30,
            alignSelf:'center'
          }}>

            <TouchableOpacity onPress={async()=>{
if(currentSongIndex > 0){
  await TrackPlayer.skip(currentSongIndex-1);
await TrackPlayer.play();
setCurrentSongIndex(currentSongIndex-1);
}



}}>
              <Image source={require('./Images/previous.png')} 
              style={{width:30,height:30,tintColor:'white'}} />
            </TouchableOpacity>

            <TouchableOpacity
            style={{
              width:60,
              height:60,
              borderRadius:30,
              backgroundColor:'white',
              justifyContent:'center',
              alignItems:'center'
            }}
            onPress={async()=>{
              if (State.Playing == playbackState) {
                await TrackPlayer.pause();
              } else {
                await TrackPlayer.skip(currentIndex);
                await TrackPlayer.play();
              }
            }}
            >
              <Image 
              source={State.Playing===playbackState ?require('./Images/pause2.png')
              :require('./Images/play.png')} 
              style={{width:30,height:30,tintColor:'black'}} />
            </TouchableOpacity>

            <TouchableOpacity onPress={async()=>{


              await TrackPlayer.skip(currentSongIndex+1);
              await TrackPlayer.play();
              setCurrentSongIndex(currentSongIndex+1);

            }}>
              <Image source={require('./Images/next.png')} 
              style={{width:35,height:35,tintColor:'white'}} />
            </TouchableOpacity>
          </View>
      </LinearGradient>
    </Modal>
  );
}
