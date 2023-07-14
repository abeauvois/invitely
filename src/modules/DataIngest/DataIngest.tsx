/* eslint-disable jsx-a11y/anchor-is-valid */
import { parsePhoneNumber } from "awesome-phonenumber";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { uniqueId } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactSpreadsheetImport, StepType } from "react-spreadsheet-import";
import { Columns } from "react-spreadsheet-import/types/steps/MatchColumnsStep/MatchColumnsStep";
import { StepState } from "react-spreadsheet-import/types/steps/UploadFlow";
import {
  Data,
  Info,
  RawData,
  Result,
} from "react-spreadsheet-import/types/types";
import { ToastContainer, toast } from "react-toastify";

import Modal from "../../shared/components/Modal";
import { LocalKeys } from "../../shared/enums/localKeys.enum";
import { verifyAddressFormat } from "../../utils/address";

import { fields } from "./fields.constant";

import "react-toastify/dist/ReactToastify.css";
import { customRSITheme } from "./customRSITheme";

dayjs.extend(customParseFormat);

function countUniqueDates(arr: Record<string, any>[]) {
  const dateCount = {} as Record<string, any>;

  arr.forEach((item) => {
    const { date } = item;

    if (dateCount[date]) {
      dateCount[date] += 1;
    } else {
      dateCount[date] = 1;
    }
  });

  return dateCount;
}

function isSameDateForAllTasks(arr: any) {
  const dateCount = countUniqueDates(arr);
  const dates = Object.keys(dateCount);
  return dates.length === 1;
}

// const dateParserFr = () => dayjs('05/02/69 1:02:03 PM -05:00', 'MM/DD/YY H:mm:ss A Z', 'fr');
const isValidDateFr = (dateToParse: string) => {
  const date = dayjs(dateToParse, "DD/MM/YYYY", true);
  return date.isValid();
};

export const DataIngest = (): React.ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);
  const [initialStepState, setInitialStepState] = useState<
    Exclude<StepState, { type: StepType.selectSheet }>
  >({ type: StepType.upload });

  const [isIngestOpen, setIsIngestOpen] = useState(false);

  const onConfirmRecovery = useCallback(() => {
    if (localStorage.getItem(LocalKeys.PREVIEW)) {
      navigate("/tasks-visualizer");
    }

    const step = localStorage.getItem(LocalKeys.STEP) as
      | StepType.selectHeader
      | StepType.matchColumns
      | StepType.validateData;
    const data = JSON.parse(
      localStorage.getItem(LocalKeys.DATA) || "",
    ) as RawData[];
    const headers = localStorage.getItem(LocalKeys.HEADERS);

    let initialState: Exclude<StepState, { type: StepType.selectSheet }>;

    switch (step) {
      case StepType.selectHeader:
        initialState = {
          type: StepType.selectHeader,
          data,
        };
        break;
      case StepType.matchColumns:
        initialState = {
          type: StepType.matchColumns,
          data,
          headerValues: JSON.parse(headers || "") as RawData,
        };
        break;
      case StepType.validateData:
        initialState = {
          type: StepType.validateData,
          data,
        };
        break;
      default:
        initialState = { type: StepType.upload };
        break;
    }

    setInitialStepState(initialState);
    setIsRecoveryOpen(false);
    setIsIngestOpen(true);
  }, [navigate]);

  const onCancelRecovery = useCallback(() => {
    localStorage.removeItem(LocalKeys.STEP);
    localStorage.removeItem(LocalKeys.HEADERS);
    localStorage.removeItem(LocalKeys.DATA);
    localStorage.removeItem(LocalKeys.PREVIEW);

    setIsRecoveryOpen(false);
  }, []);

  const onUpload = useCallback(async (data: RawData[]) => {
    localStorage.setItem(LocalKeys.STEP, StepType.selectHeader);
    localStorage.setItem(LocalKeys.DATA, JSON.stringify(data));
    return data;
  }, []);

  const onSelectHeader = useCallback(
    async (headerValues: RawData, data: RawData[]) => {
      localStorage.setItem(LocalKeys.STEP, StepType.matchColumns);
      localStorage.setItem(LocalKeys.HEADERS, JSON.stringify(headerValues));
      localStorage.setItem(LocalKeys.DATA, JSON.stringify(data));
      return {
        headerValues,
        data,
      };
    },
    [],
  );

  const onMatchColumns = useCallback(
    async (table: Data<string>[], _: RawData[], __: Columns<string>) => {
      localStorage.setItem(LocalKeys.STEP, StepType.validateData);
      localStorage.setItem(LocalKeys.DATA, JSON.stringify(table));
      return table;
    },
    [],
  );

  const onClose = useCallback(() => {
    localStorage.removeItem(LocalKeys.STEP);
    localStorage.removeItem(LocalKeys.HEADERS);
    localStorage.removeItem(LocalKeys.DATA);
    setIsIngestOpen(false);
    setInitialStepState({ type: StepType.upload });
  }, []);

  const rowHook = (
    row: Data<string>,
    addError: (fieldKey: string, error: Info) => void,
    _: Data<string>[],
  ) => {
    // Address format checking
    const address = `${row.address}, ${row.zipCode}, ${row.city}, France`;

    // At least one of the fields Pickup or Delivery must be TRUE
    if (row.pickup === false && row.delivery === false) {
      addError("pickup", {
        message: "Au moins un des champs Pickup ou Delivery doit être activé",
        level: "error",
      });
    }

    // Date format checking
    if (!isValidDateFr(row.date as string)) {
      addError("date", {
        message: "La date est obligatoire et doit être au format JJ/MM/AAAA",
        level: "error",
      });
    }

    if (!verifyAddressFormat(address)) {
      addError("address", {
        message:
          "Le format de l'adresse, du code postal ou de la ville est incorrect",
        level: "error",
      });
      addError("zipCode", {
        message:
          "Le format de l'adresse, du code postal ou de la ville est incorrect",
        level: "error",
      });
      addError("city", {
        message:
          "Le format de l'adresse, du code postal ou de la ville est incorrect",
        level: "error",
      });
    }
    // phone number format checking
    const contactPhoneNumber = parsePhoneNumber(
      row.contactPhoneNumber as string,
      {
        regionCode: "FR",
      },
    );

    if (!contactPhoneNumber.valid)
      addError("contactPhoneNumber", {
        message: "Le format du numéro de téléphone est incorrect",
        level: "error",
      });

    return { ...row };
  };

  const onSubmit = useCallback(
    async (data: Result<string>, _: File) => {
      if (data.invalidData.length) {
        toast.error(
          "Votre fichier a été rejeté car il contient des erreurs non corrigées",
        );
        return;
      }
      if (data.validData.length < 3) {
        toast.error("Une tournée doit contenir au minimum 3 addresses");
        return;
      }

      if (!isSameDateForAllTasks(data.validData)) {
        toast.error("Toutes les tâches doivent avoir la même date");
        return;
      }

      const mappedTasks = data.validData
        .sort((a, b) => {
          return Number(a.order) - Number(b.order);
        })
        .map((task, index) => {
          return {
            ...task,
            id: uniqueId("task-"),
            position: index,
            destinationAddress: {
              line1: task.address,
              city: task.city,
              country: "FR",
              zipCode: task.zipCode,
              latitude: 0,
              longitude: 0,
              contact: {
                name: task.contactName,
                phone: task.contactPhoneNumber,
                company: task.companyName,
              },
            },
            address: undefined,
            zipCode: undefined,
            city: undefined,
          };
        });

      localStorage.setItem("tasksVisualizerData", JSON.stringify(mappedTasks));
      navigate("/tasks-visualizer");
    },
    [navigate],
  );

  useEffect(() => {
    const step = localStorage.getItem(LocalKeys.STEP);
    const data = localStorage.getItem(LocalKeys.DATA);
    const taskListData = localStorage.getItem(LocalKeys.PREVIEW);
    if ((step && data) || taskListData) {
      if (location.state && location.state.from !== "success") {
        setIsRecoveryOpen(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // clean the navigation state
  useEffect(() => {
    navigate(".", { replace: true }); // <-- redirect to current path w/o state
  }, [navigate]);

  return (
    <>
      <div>
        <div className="relative px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-supervan sm:text-6xl">
                <span className="text-supervan">OPTIMIZ</span>
              </h1>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                L&apos;offre tournée de{" "}
                <span className="tracking-tight text-supervan">Supervan</span>
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Téléchargez le template, envoyez nous votre fichier de tournée,
                validez le puis confirmez votre commande. Vous pourrez ensuite
                suivre vos livraisons.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  type="button"
                  className="rounded-md bg-supervan px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-supervan-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-supervan"
                  onClick={() => setIsIngestOpen(true)}
                >
                  Démarrer une commande
                </button>
                <a
                  href={`${process.env.SUPERVAN_OPTIMIZ_TEMPLATE_URL}`}
                  rel="noopener noreferrer"
                  className="rounded-md border-2 border-gray-900 px-3 py-2 text-sm font-semibold text-gray-900"
                >
                  Télécharger le fichier d&apos;exemple
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Modal
        title="Reprendre la commande"
        description="Vous aviez commencé un processus d'ingestion, voulez-vous le finaliser ?"
        isOpen={isRecoveryOpen}
        confirmationText="Oui, continuer"
        cancelText="Non, recommencer"
        onCancel={onCancelRecovery}
        onConfirm={onConfirmRecovery}
        closeModal={() => setIsRecoveryOpen(false)}
      />

      <ReactSpreadsheetImport
        initialStepState={initialStepState}
        isOpen={isIngestOpen}
        onClose={onClose}
        uploadStepHook={onUpload}
        selectHeaderStepHook={onSelectHeader}
        matchColumnsStepHook={onMatchColumns}
        rowHook={rowHook}
        onSubmit={onSubmit}
        fields={fields}
        autoMapHeaders
        autoMapDistance={1}
        dateFormat="DD/MM/YYYY"
        customTheme={customRSITheme}
        translations={{
          uploadStep: {
            title: "Téléchargez votre fichier de tournée",
          },
          selectHeaderStep: {
            title: "Sélectionnez les entetes de colonnes",
          },
          matchColumnsStep: {
            title: "Associez les entetes avec les colonnes",
          },
          validationStep: {
            title: "Corrigez les données",
          },
        }}
      />
    </>
  );
};

export default DataIngest;
