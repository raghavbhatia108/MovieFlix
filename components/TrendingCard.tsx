import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import React from "react";
import { Link } from "expo-router";
import { images } from "@/constants/images";

const TrendingCard = ({ movie: { movie_id, title, poster_url }, index }) => {
  return (
    <Link href={`/movie/${movie_id}`} asChild>
      <TouchableOpacity className="relative " style={{ width: 140 }}>
        <Image
          source={{ uri: poster_url }}
          style={{ width: "100%", height: 240 }}
          className="rounded-lg"
        />
        <View className="absolute bottom-3 px-2 py-1 rounded-lg bottom-9 -left-3.5">
          <MaskedView
            maskElement={
              <Text className="text-6xl text-white font-bold">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            ></Image>
          </MaskedView>
        </View>
        <Text className="text-white font-bold text-sm mt-1" numberOfLines={1}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;

const styles = StyleSheet.create({});
