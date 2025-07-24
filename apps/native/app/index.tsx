import { useQuery } from "convex/react";
import { Text, View } from "react-native";
import { api } from "../../../convex/_generated/api";


export default function Index() {
  const tasks = useQuery(api.tasks.getTasks);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {tasks?.map(({ _id, text }) => <Text key={_id}>{text}</Text>)}
    </View>
  );
}