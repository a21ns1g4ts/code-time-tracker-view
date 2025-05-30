
import React from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR, enUS, es, fr, de } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DayData } from '@/types/api';
import { formatDuration } from '@/utils/dataProcessor';
import { useLanguage } from '@/contexts/LanguageContext';
import Timeline from './Timeline';

interface DayDetailsModalProps {
  open: boolean;
  onClose: () => void;
  dayData: DayData | null;
}

const DayDetailsModal: React.FC<DayDetailsModalProps> = ({ open, onClose, dayData }) => {
  const { t, language } = useLanguage();
  const locales = { pt: ptBR, en: enUS, es: es, fr: fr, de: de };
  const locale = locales[language as keyof typeof locales] || enUS;

  if (!dayData) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t('timeline.day')} - {format(parseISO(dayData.date), 'dd/MM/yyyy', { locale })}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Timeline dayData={dayData} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DayDetailsModal;
