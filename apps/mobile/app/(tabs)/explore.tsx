import { StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";

import { Card, SafeAreaView, Text } from "@/components/atoms";

export default function TabTwoScreen() {
  const { t } = useTranslation(["common"]);

  return (
    <SafeAreaView style={styles.container}>
      <Text type="title">{t("screens.explore.title")}</Text>
      <Card title={t("screens.explore.cardTitle")} subtitle={t("screens.explore.cardSubtitle")}>
        <Text>{t("screens.explore.description")}</Text>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
});
