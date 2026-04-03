import { Link } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSaved } from "@/app/contexts/SavedContext";
import { icons } from "@/constants/icons";

type MovieCardProps = {
  id: number;
  poster_path?: string;
  title: string;
  vote_average: number;
  release_date?: string;
};

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: MovieCardProps) => {
  const { toggleSave, isSaved } = useSaved();

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://placehold.co/600x400/1a1a1a/FFFFFF.png";

  const savePayload = {
    movie_id: id,
    title,
    poster_path: poster_path || "",
    vote_average: vote_average || 0,
    release_date: release_date || "",
  };

  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{ uri: posterUrl }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <TouchableOpacity
          onPress={(event) => {
            event.stopPropagation?.();
            toggleSave(savePayload);
          }}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 20,
            padding: 6,
          }}
        >
          <Ionicons
            name={isSaved(id) ? "heart" : "heart-outline"}
            size={18}
            color={isSaved(id) ? "#A78BFA" : "#fff"}
          />
        </TouchableOpacity>

        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
          <Text className="text-xs font-medium text-light-300 uppercase">
            Movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
