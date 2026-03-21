import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { Button, Card, Input, SafeAreaView, Text, Textarea, View } from "@/src/components/atoms";
import { styles } from './StyleGuideTemplate.styles';

export function StyleGuideTemplate() {
  const theme = useTheme();
  const { t, i18n } = useTranslation(['common']);
  const [petName, setPetName] = useState('Milo');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setNotes(t('screens.styleGuide.sections.textarea.sampleValue'));
  }, [i18n.resolvedLanguage, t]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text type="title">{t('screens.styleGuide.title')}</Text>
        <Text>
          {t('screens.styleGuide.description')}
        </Text>

        <Card
          title={t('screens.styleGuide.sections.text.title')}
          subtitle={t('screens.styleGuide.sections.text.subtitle')}>
          <View style={styles.section}>
            <Text type="title">{t('screens.styleGuide.sections.text.titleText')}</Text>
            <Text type="subtitle">{t('screens.styleGuide.sections.text.subtitleText')}</Text>
            <Text>{t('screens.styleGuide.sections.text.bodyText')}</Text>
            <Text type="defaultSemiBold">{t('screens.styleGuide.sections.text.helperText')}</Text>
            <Text type="link">{t('screens.styleGuide.sections.text.linkText')}</Text>
          </View>
        </Card>

        <Card
          title={t('screens.styleGuide.sections.buttons.title')}
          subtitle={t('screens.styleGuide.sections.buttons.subtitle')}>
          <View style={styles.section}>
            <Button mode="contained">{t('screens.styleGuide.sections.buttons.contained')}</Button>
            <Button mode="elevated">{t('screens.styleGuide.sections.buttons.elevated')}</Button>
            <Button mode="contained-tonal">{t('screens.styleGuide.sections.buttons.containedTonal')}</Button>
            <Button mode="outlined">{t('screens.styleGuide.sections.buttons.outlined')}</Button>
            <Button mode="text">{t('screens.styleGuide.sections.buttons.text')}</Button>
          </View>
        </Card>

        <Card
          title={t('screens.styleGuide.sections.inputs.title')}
          subtitle={t('screens.styleGuide.sections.inputs.subtitle')}>
          <View style={styles.section}>
            <Input
              label={t('screens.styleGuide.sections.inputs.petNameLabel')}
              value={petName}
              onChangeText={setPetName}
            />
            <Input
              mode="flat"
              label={t('screens.styleGuide.sections.inputs.flatLabel')}
              placeholder={t('screens.styleGuide.sections.inputs.flatPlaceholder')}
            />
            <Input
              label={t('screens.styleGuide.sections.inputs.errorLabel')}
              value={t('screens.styleGuide.sections.inputs.errorValue')}
              error
            />
            <Input
              label={t('screens.styleGuide.sections.inputs.disabledLabel')}
              value={t('screens.styleGuide.sections.inputs.disabledValue')}
              disabled
            />
          </View>
        </Card>

        <Card
          title={t('screens.styleGuide.sections.textarea.title')}
          subtitle={t('screens.styleGuide.sections.textarea.subtitle')}>
          <View style={styles.section}>
            <Textarea
              label={t('screens.styleGuide.sections.textarea.careNotesLabel')}
              value={notes}
              onChangeText={setNotes}
              numberOfLines={5}
            />
            <Textarea
              mode="flat"
              label={t('screens.styleGuide.sections.textarea.flatLabel')}
              placeholder={t('screens.styleGuide.sections.textarea.flatPlaceholder')}
              numberOfLines={4}
            />
          </View>
        </Card>

        <Card
          title={t('screens.styleGuide.sections.cards.title')}
          subtitle={t('screens.styleGuide.sections.cards.subtitle')}>
          <View style={styles.section}>
            <Card mode="contained" title={t('screens.styleGuide.sections.cards.containedTitle')}>
              <Text>{t('screens.styleGuide.sections.cards.containedBody')}</Text>
            </Card>
            <Card mode="outlined" title={t('screens.styleGuide.sections.cards.outlinedTitle')}>
              <Text>{t('screens.styleGuide.sections.cards.outlinedBody')}</Text>
            </Card>
            <Card
              mode="elevated"
              title={t('screens.styleGuide.sections.cards.elevatedTitle')}
              subtitle={t('screens.styleGuide.sections.cards.elevatedSubtitle')}
              left={() => (
                <MaterialDesignIcons
                  name="paw"
                  size={20}
                  color={theme.colors.primary}
                  style={styles.cardIcon}
                />
              )}>
              <Text>{t('screens.styleGuide.sections.cards.elevatedBody')}</Text>
            </Card>
          </View>
        </Card>

        <Card
          title={t('screens.styleGuide.sections.view.title')}
          subtitle={t('screens.styleGuide.sections.view.subtitle')}>
          <View style={styles.section}>
            <View style={[styles.surfaceSample, { backgroundColor: theme.colors.surfaceVariant }]}>
              <Text type="defaultSemiBold">{t('screens.styleGuide.sections.view.sampleTitle')}</Text>
              <Text>{t('screens.styleGuide.sections.view.sampleBody')}</Text>
            </View>
          </View>
        </Card>

        <Card
          title={t('screens.styleGuide.sections.safeAreaView.title')}
          subtitle={t('screens.styleGuide.sections.safeAreaView.subtitle')}>
          <View style={styles.section}>
            <Text>{t('screens.styleGuide.sections.safeAreaView.body')}</Text>
          </View>
        </Card>

      </ScrollView>
    </SafeAreaView>
  );
}
