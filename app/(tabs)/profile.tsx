import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { View, Text, Image, ScrollView, FlatList } from "react-native";
import { useSaved } from "../contexts/SavedContext";

const Profile = () => {
  const { savedMovies } = useSaved();
  const user = {
    name: "Guest User",
    email: "guest@movieFlix.com",
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png",
  };
  const savedCount = savedMovies.length;
  const watchedCount = 0;
  const favoriteCount = savedMovies.filter(
    (movie: any) => movie.vote_average > 7,
  ).length;
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <Image
          source={{ uri: user.avatar }}
          className="w-24 h-24 rounded-full mx-auto"
        />
        <Text className="text-white text-center text-xl font-bold mt-3">
          {user.name}
        </Text>
        <Text className="text-gray-400 text-center text-sm mb-5">
          {user.email}
        </Text>

        <View className="flex-row justify-between mt-8">
          <StatCard label="Saved" value={savedCount} />
          <StatCard label="Watched" value={watchedCount} />
          <StatCard label="Favorites" value={favoriteCount} />
        </View>
        {savedMovies.length > 0 && (
          <View className="mt-8">
            <Text className="text-white text-lg font-semibold mb-5">
              Recently Saved
            </Text>
            <FlatList
              data={savedMovies.slice(0, 6)}
              horizontal
              keyExtractor={(item) => item.movie_id.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                  className="w-32 h-48 rounded-lg mr-4"
                  resizeMode="cover"
                />
              )}
            />
          </View>
        )}
        <View className="mt-10">
          <Text className="text-white text-lg font-semibold mb-3">
            Settings
          </Text>

          <SettingsItem title="Account" />
          <SettingsItem title="Notifications" />
          <SettingsItem title="Theme" />
          <SettingsItem title="Logout" isDanger />
        </View>
        <View className="mt-10 items-center">
          <Text className="text-light-300 text-xs">Built by Raghav Bhatia</Text>
        </View>
      </ScrollView>
    </View>
  );
};

function StatCard({ label, value }: any) {
  return (
    <View className="bg-dark-100 p-4 rounded-xl items-center w-[30%]">
      <Text className="text-white text-lg font-bold">{value}</Text>
      <Text className="text-light-300 text-xs">{label}</Text>
    </View>
  );
}
function SettingsItem({ title, isDanger = false }: any) {
  return (
    <View className="bg-dark-100 p-4 rounded-xl mb-3">
      <Text className={`${isDanger ? "text-red-400" : "text-white"}`}>
        {title}
      </Text>
    </View>
  );
}

export default Profile;
