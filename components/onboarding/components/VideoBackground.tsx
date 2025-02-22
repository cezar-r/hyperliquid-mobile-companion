import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Video, ResizeMode } from "expo-av";

const BG_VIDEO_PATH = "../../../assets/blob.mp4";

export const VideoBackground = () => {
    const [isVideoReady, setIsVideoReady] = useState(false);
    const [videoError, setVideoError] = useState<string | null>(null);
    const videoRef = useRef<Video>(null);

    useEffect(() => {
        if (videoError) {
            const retryTimer = setTimeout(() => {
                videoRef.current?.loadAsync(
                    require(BG_VIDEO_PATH), {}, false
                );
            }, 1000);
            return () => clearTimeout(retryTimer);
        }
    }, [videoError]);

    return (
        <Video
            ref={videoRef}
            source={require(BG_VIDEO_PATH)}
            style={[
                StyleSheet.absoluteFill,
                !isVideoReady && { opacity: 0 }
            ]}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
            isMuted
            onLoad={() => {
                setIsVideoReady(true);
                setVideoError(null);
            }}
            onError={(error) => {
                console.error('Video playback error:', error);
                setVideoError(error);
                videoRef.current?.playAsync();
            }}
            onPlaybackStatusUpdate={status => {
                if (!status.isLoaded && isVideoReady) {
                    videoRef.current?.replayAsync();
                }
            }}
        />
    );
}
