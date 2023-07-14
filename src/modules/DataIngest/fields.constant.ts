import { Fields } from "react-spreadsheet-import/types/types";

export const fields: Fields<string> = [
  {
    label: "Ordre *",
    key: "order",
    alternateMatches: ["Ordre", "ordre", "Ordre *", "ordre *"],
    fieldType: { type: "input" },
    validations: [
      {
        rule: "required",
        errorMessage: "Spécifiez l'ordre de vos courses",
        level: "error",
      },
    ],
  },
  {
    label: "Date *",
    key: "date",
    alternateMatches: ["Date", "date", "Date *", "date *"],
    fieldType: { type: "input" },
    validations: [
      {
        rule: "required",
        errorMessage: "La date de la course est requise",
        level: "error",
      },
    ],
  },
  {
    label: "Collecte",
    key: "pickup",
    alternateMatches: ["Collecte", "collecte", "Collecte *", "collecte *"],
    fieldType: { type: "checkbox" },
    description: "Cochez si la course est une collecte",
    validations: [
      {
        rule: "required",
        errorMessage: "Ce champ est obligatoire",
        level: "error",
      },
    ],
  },
  {
    label: "Livraison",
    key: "delivery",
    alternateMatches: ["Livraison", "livraison", "Livraison *", "livraison *"],
    fieldType: { type: "checkbox" },
    description: "Cochez si la course est une livraison",
    validations: [
      {
        rule: "required",
        errorMessage: "Ce champ est obligatoire",
        level: "error",
      },
    ],
  },
  {
    label: "Adresse *",
    key: "address",
    alternateMatches: ["Adresse", "adresse", "Adresse *", "adresse *"],
    fieldType: { type: "input" },
    validations: [
      {
        rule: "required",
        errorMessage: "L'addresse de destination de la course est requise",
        level: "error",
      },
    ],
  },
  {
    label: "Code postal *",
    key: "zipCode",
    alternateMatches: [
      "Code postal",
      "code postal",
      "Code Postal",
      "code Postal",
      "Code postal *",
      "code postal *",
      "Code Postal *",
      "code Postal *",
    ],
    fieldType: { type: "input" },
    validations: [
      {
        rule: "required",
        errorMessage: "Le code postal est requis",
        level: "error",
      },
    ],
  },
  {
    label: "Ville *",
    key: "city",
    alternateMatches: ["Ville", "ville", "Ville *", "ville *"],
    fieldType: { type: "input" },
    validations: [
      {
        rule: "required",
        errorMessage: "Le nom de la ville est requis",
        level: "error",
      },
    ],
  },
  {
    label: "Détails marchandise (descriptif, quantité) *",
    key: "details",
    alternateMatches: [
      "Détails marchandise",
      "détails marchandise",
      "Détails Marchandise",
      "Détails marchandise (descriptif, quantité)",
      "Détails Marchandise (Descriptif, Quantité)",
      "Détails marchandise (Descriptif, Quantité)",
      "Détails Marchandise (descriptif, quantité)",
      "Détails marchandise (descriptif, quantité) *",
      "Détails Marchandise (Descriptif, Quantité) *",
      "Détails marchandise (Descriptif, Quantité) *",
      "Détails Marchandise (descriptif, quantité) *",
    ],
    fieldType: { type: "input" },
    description: "Quantité et légère description de la marchandise",
    validations: [
      {
        rule: "required",
        errorMessage:
          "Renseignez la quantité et un léger descriptif de la marchandise",
        level: "error",
      },
    ],
  },
  {
    label: "Commentaires (spécificités)",
    key: "commentary",
    alternateMatches: [
      "Commentaires",
      "commentaires",
      "Commentaires (spécificités)",
      "Commentaires (Spécificités)",
    ],
    fieldType: { type: "input" },
    description: "Commentaire ou précision supplémentaire",
  },
  {
    label: "Nom Société *",
    key: "companyName",
    alternateMatches: [
      "Nom Société",
      "nom société",
      "Nom société",
      "nom Société",
      "Nom Société *",
      "nom société *",
      "Nom société *",
      "nom Société *",
    ],
    fieldType: { type: "input" },
    validations: [
      {
        rule: "required",
        errorMessage:
          "Renseignez le nom de la société pour laquelle vous effectuez la course",
        level: "error",
      },
    ],
  },
  {
    label: "Nom du contact *",
    key: "contactName",
    alternateMatches: [
      "Nom du contact",
      "nom du contact",
      "Nom du Contact",
      "nom du Contact",
      "Nom du contact *",
      "nom du contact *",
      "Nom du Contact *",
      "nom du Contact *",
    ],
    fieldType: { type: "input" },
    validations: [
      {
        rule: "required",
        errorMessage: "Renseignez le nom du contact pour la société",
        level: "error",
      },
    ],
  },
  {
    label: "Numéro du contact *",
    key: "contactPhoneNumber",
    alternateMatches: [
      "Numéro du contact",
      "numéro du contact",
      "Numéro du Contact",
      "numéro du Contact",
      "Numéro du contact *",
      "numéro du contact *",
      "Numéro du Contact *",
      "numéro du Contact *",
    ],
    fieldType: { type: "input" },
    validations: [
      {
        rule: "required",
        errorMessage: "Renseignez le nom du contact pour la société",
        level: "error",
      },
    ],
  },
];

export default fields;
