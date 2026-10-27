import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#4169E1" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Meu Perfil Dev" }} />
      <Stack.Screen name="recados" options={{ title: "Mural de recados" }} />
      <Stack.Screen name="habilidades/[id]" options={{ title: "Habilidade" }} />
      <Stack.Screen name="sobre" options={{ title: "Sobre" }} />
    </Stack>
  );
}