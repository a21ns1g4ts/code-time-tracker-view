
import { enTranslations } from './en';
import { ptTranslations } from './pt';
import { esTranslations } from './es';
import { frTranslations } from './fr';
import { deTranslations } from './de';
import { itTranslations } from './it';
import { jaTranslations } from './ja';

export const translations = {
  en: enTranslations,
  pt: ptTranslations,
  es: esTranslations,
  fr: frTranslations,
  de: deTranslations,
  it: itTranslations,
  ja: jaTranslations,
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof enTranslations;
