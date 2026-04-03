import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { View, Text, Image, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSaved } from "../contexts/SavedContext";
import MovieCard from "@/components/MovieCard";

const Save = () => {
  const { savedMovies } = useSaved();
  {
    if (savedMovies.length === 0) {
      return (
        <View className="flex-1 bg-primary">
          <Image
            source={images.bg}
            className="absolute w-full z-0"
            resizeMode="cover"
          />
          <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

          <Text className="text-white text-center text-lg mt-20">
            No saved movies yet.
          </Text>
        </View>
      );
    }
  }
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      <Text className="text-lg text-white font-bold mt-5 mb-3 text-center">
        Saved Movies
      </Text>
      <FlatList
        data={savedMovies}
        keyExtractor={(item) => item.movie_id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginBottom: 16,
        }}
        renderItem={({ item }) => (
          <MovieCard
            id={item.movie_id}
            poster_path={item.poster_path}
            title={item.title}
            vote_average={item.vote_average}
            release_date={item.release_date}
          />
        )}
        className="mx-4 pb-32"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Save;
