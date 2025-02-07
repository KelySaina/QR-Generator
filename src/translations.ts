interface Translations {
  [key: string]: {
    title: string;
    contentLabel: string;
    contentPlaceholder: string;
    fileNameLabel: string;
    fileNamePlaceholder: string;
    downloadButton: string;
    footer: string;
  };
}

export const translations: Translations = {
  en: {
    title: "QR Code Generator",
    contentLabel: "Content",
    contentPlaceholder: "Enter text or URL",
    fileNameLabel: "File Name",
    fileNamePlaceholder: "Enter file name",
    downloadButton: "Download QR Code",
    footer: `© ${new Date().getFullYear()} KS Services. All rights reserved.`,
  },
  fr: {
    title: "Générateur de Code QR",
    contentLabel: "Contenu",
    contentPlaceholder: "Entrez du texte ou une URL",
    fileNameLabel: "Nom du fichier",
    fileNamePlaceholder: "Entrez le nom du fichier",
    downloadButton: "Télécharger le Code QR",
    footer: `© ${new Date().getFullYear()} KS Services. Tous droits réservés.`,
  },
};
