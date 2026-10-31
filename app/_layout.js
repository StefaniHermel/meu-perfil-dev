// ============================================================
// LAYOUT PRINCIPAL: define a barra de abas (Tabs) do app
// ============================================================

// Tabs cria a barra de abas na parte de baixo da tela
import { Tabs } from "expo-router";

// Ionicons: ícones usados em cada aba
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    // screenOptions vale para TODAS as abas.
    // tabBarActiveTintColor = cor da aba ativa (verde)
    <Tabs screenOptions={{ tabBarActiveTintColor: "#4D7C2A" }}>
      {/* ABA INÍCIO
          headerShown: false esconde o cabeçalho automático com o texto
          "Início", porque a Home já tem o seu próprio Cabecalho */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Início", // texto que aparece embaixo do ícone
          headerShown: false,
          // focused = true quando esta é a aba ativa:
          // ícone cheio na ativa, só o contorno (-outline) nas outras
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* ABA BUSCA (mantém o cabeçalho com o título "Busca") */}
      <Tabs.Screen
        name="busca"
        options={{
          title: "Busca",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* ABA NOTIFICAÇÕES (mantém o cabeçalho com o título) */}
      <Tabs.Screen
        name="notificacoes"
        options={{
          title: "Notificações",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* TELAS ESCONDIDAS DA BARRA
          href: null faz a tela existir (dá para abrir com router.push),
          mas sem aparecer como aba */}

      {/* Habilidades tem o próprio Stack (app/habilidades/_layout.js),
          então desligamos o cabeçalho das Tabs para não ficar duplicado */}
      <Tabs.Screen
        name="habilidades"
        options={{ href: null, headerShown: false }}
      />

      <Tabs.Screen
        name="recados"
        options={{ href: null, title: "Recados" }}
      />

      <Tabs.Screen name="sobre" options={{ href: null, title: "Sobre" }} />
    </Tabs>
  );
}