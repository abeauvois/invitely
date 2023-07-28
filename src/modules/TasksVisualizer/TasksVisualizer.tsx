// import dayjs from "dayjs";
import dayjs from "dayjs";
import { useState, useEffect, useCallback } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import {
  CreateOptimizDTO,
  GeocodedAddressesResponseDto,
} from "../../generated/openapi";
import { DragAndDrop, Drop } from "../../shared/components/DragAndDrop";
import { FormGroup } from "../../shared/components/FormGroup";
import Modal from "../../shared/components/Modal";
import { User } from "../../types/User";
import { reorder } from "../../utils/reorder";
import { useAuthStore } from "../auth/auth.store";

import { DraggableTask } from "./DraggableTask";
import { TasksVisualizerProps } from "./TasksVisualizerProps";
import { handlerServiceTypeList, truckTypeList } from "./constraints.constant";
import { parseAddress } from "./parseAddress";
import { useCreateOrder, useVerifyCalculatePrice } from "./taskVisualizerQuery";

export interface ActiveConstraints {
  truckType: CreateOptimizDTO.vehicleType[number];
  handlerServiceType: string;
  amplitudeType: string;
}

interface TasksVisualizerFormProps {
  requiredDeliveryDate: string;
}

export type OrderTaskPayload = ReturnType<typeof buildPayloadTask>;
export type OrderPayload = ReturnType<typeof buildPayload>;

function buildPayloadTask(task: TasksVisualizerProps) {
  return {
    id: task.id,
    position: task.position,
    payloadDescription: task.details,
    comment: task.commentary,
    pickup: task.pickup,
    delivery: task.delivery,
    destinationAddress: {
      line1: task.destinationAddress.line1,
      city: task.destinationAddress.city,
      country: task.destinationAddress.country,
      zipCode: task.destinationAddress.zipCode,
      latitude: 0,
      longitude: 0,
      contact: {
        name: task.contactName,
        phone: task.contactPhoneNumber,
        company: task.companyName,
      },
    },
  };
}
function buildPayload(
  user: User,
  tasks: OrderTaskPayload[],
  activeConstraints: ActiveConstraints,
  requiredDeliveryDate: string,
) {
  return {
    externalId: "id",
    externalClientId: user.id,
    externalClientName: `${user.firstname} ${user.lastname}`,
    externalClientEmail: user.email,
    externalClientPhone: user.phone,
    vehicleType: activeConstraints.truckType as CreateOptimizDTO["vehicleType"],
    numHandlers: +activeConstraints.handlerServiceType,
    requiredDeliveryDate,
    tasks,
  };
}

// refactor this component by extracting the tasks list to a custom hook
const useTaskList = (activeConstraints: any, requiredDeliveryDate: string) => {
  const { user } = useAuthStore();
  const [taskList, setTaskList] = useState<TasksVisualizerProps[]>([]);
  const [payload, setPayload] = useState<OrderPayload | null>(null);
  const [isBusy, setIsBusy] = useState<boolean>(false);

  // Load TasksList from localStorage
  useEffect(() => {
    const data = localStorage.getItem("tasksVisualizerData");
    if (data) {
      const newTasks = JSON.parse(data);
      setTaskList(newTasks);
      toast.success("Vos tâches ont été chargées avec succès");
    }
  }, []);

  // Build OrderPayload from tasks list
  useEffect(() => {
    if (!user || !taskList.length) return;
    const newOrderPayload = buildPayload(
      user,
      taskList.map(buildPayloadTask),
      activeConstraints,
      requiredDeliveryDate,
    );
    setPayload(newOrderPayload);
  }, [user, activeConstraints, requiredDeliveryDate, taskList]);

  // Called by DraggableTask when Loading component or address is changed
  const onChangeTaskAddress =
    (taskId: string) =>
    (
      geocodedData: GeocodedAddressesResponseDto | undefined,
      isLoading: boolean,
    ) => {
      if (isLoading) {
        setIsBusy(true);
        return;
      }

      const taskIndex = taskList.findIndex((task) => task.id === taskId);
      if (taskIndex === -1) return;

      let parsedNewAddress;
      try {
        parsedNewAddress = parseAddress(geocodedData);
        if (!parsedNewAddress) return;
      } catch (error) {
        toast.error(
          "Veuillez renseigner une adresse valide incluant une ville",
        );
        return;
      }

      const newTaskList = [...taskList];
      const task = newTaskList[taskIndex];

      newTaskList[taskIndex] = {
        ...task,
        destinationAddress: parsedNewAddress,
      };

      setTaskList(newTaskList);
      localStorage.setItem("tasksVisualizerData", JSON.stringify(newTaskList));
      // invalidate geocoded addresses
      // queryClient.invalidateQueries(QueryKeys.GET_GEOCODED_ADDRESS);
    };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const reorderedItems = reorder(
      [...taskList],
      source.index,
      destination.index,
    );

    const items = reorderedItems.map((item, index) => ({
      ...item,
      position: index,
    }));

    setTaskList(items);
  };

  return {
    isBusy,
    taskList,
    payload,
    onChangeTaskAddress,
    handleDragEnd,
  };
};

const useActiveConstraints = () => {
  const [activeConstraints, setActiveConstraints] = useState<ActiveConstraints>(
    {
      truckType: "12M3",
      handlerServiceType: "1",
      amplitudeType: "6h",
    },
  );

  const onChangeTruckType = (truckTypeKey: string) => {
    setActiveConstraints({ ...activeConstraints, truckType: truckTypeKey });
  };

  const onChangeHandlerServiceType = (handlerServiceTypeKey: string) => {
    setActiveConstraints({
      ...activeConstraints,
      handlerServiceType: handlerServiceTypeKey,
    });
  };

  return { activeConstraints, onChangeTruckType, onChangeHandlerServiceType };
};

const useOrderCreator = (payload: OrderPayload | null) => {
  const orderCreator = useCreateOrder();

  const createOrder = useCallback(async () => {
    if (!payload) return;
    orderCreator.mutateAsync(payload);
  }, [orderCreator, payload]);

  return { createOrder };
};

const useCalculatePrice = (payload: OrderPayload | null) => {
  const [price, setPrice] = useState(0);
  const getPrice = useVerifyCalculatePrice();

  const verifyAndCalculatePrice = async () => {
    if (!payload || !payload.tasks?.length) return;

    try {
      const data = await getPrice.mutateAsync(payload);
      setPrice(data);
    } catch (error: any) {
      toast.error(error.body.message);
    }
  };

  // Calculate price when constraints change
  useEffect(() => {
    verifyAndCalculatePrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  return { price, getPrice };
};

const useHandlers = () => {
  const navigate = useNavigate();
  const [isGoBackOpen, setIsGoBackOpen] = useState(false);

  const onGoBack = () => {
    localStorage.removeItem("tasksVisualizerData");
    setIsGoBackOpen(false);
    navigate("/");
  };

  return { isGoBackOpen, setIsGoBackOpen, onGoBack, navigate };
};

export const TasksVisualizer = () => {
  const { isGoBackOpen, setIsGoBackOpen, onGoBack, navigate } = useHandlers();

  const form = useForm<TasksVisualizerFormProps>({
    mode: "onSubmit",
    // defaultValues: { requiredDeliveryDate: 9 },
    // resolver: yupResolver(deliveryZoneValidator),
  });

  form.watch("requiredDeliveryDate");

  const { activeConstraints, onChangeTruckType, onChangeHandlerServiceType } =
    useActiveConstraints();

  const { isBusy, taskList, payload, onChangeTaskAddress, handleDragEnd } =
    useTaskList(activeConstraints, form.getValues("requiredDeliveryDate"));

  const { createOrder } = useOrderCreator(payload);

  const onValidate = async (values: TasksVisualizerFormProps) => {
    if (!values.requiredDeliveryDate) {
      toast.error("Veuillez renseigner une date & heure de départ");
      form.setError("requiredDeliveryDate", {
        type: "required",
        message: "Veuillez renseigner une date & heure de départ",
      });
      return;
    }
    const startOfToday = dayjs().startOf("day");
    if (dayjs(values.requiredDeliveryDate).isBefore(startOfToday)) {
      toast.error(
        "Veuillez renseigner une date & heure de départ à partir de demain",
      );
      form.setError("requiredDeliveryDate", {
        type: "required",
        message:
          "Veuillez renseigner une date & heure de départ à partir de demain",
      });
      return;
    }
    await createOrder();
    navigate("/success");
  };

  const { price, getPrice } = useCalculatePrice(payload);

  const isPriceOk = isBusy || getPrice.isLoading || price;

  // const onChangeAmplitudeType = (amplitudeTypeKey: string) => {
  //   setActiveConstraints({
  //     ...activeConstraints,
  //     amplitudeType: amplitudeTypeKey,
  //   });
  // };

  if (!taskList.length) return null;

  if (!localStorage.getItem("tasksVisualizerData")) return <Navigate to="/" />;

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-10 w-full bg-white py-4 text-center shadow-sm lg:px-8">
          <h3 className="text-1xl font-bold tracking-tight text-invitely sm:text-4xl">
            Votre commande
          </h3>
        </div>
        {!isPriceOk && (
          <div className="mb-10 w-full bg-red-300 py-4 text-center shadow-sm lg:px-8">
            <h3 className="text-1xl text-xl tracking-tight text-white">
              une particularité dans votre demande nécessite un échange
              commercial, le prix n est donc pas calculable, veuillez ignorer sa
              valeur.
            </h3>
            <h3>
              Cliquez sur &quot;Envoyer la commande&quot;, un commercial va
              revenir vers vous pour un prix adapté.
            </h3>
          </div>
        )}
        <div className="flex h-full w-full flex-row">
          <div className="flex w-9/12 flex-col items-center justify-center">
            <div className="flex w-5/6 flex-row items-center rounded-md bg-slate-50 p-2 shadow-sm">
              <div className="flex w-full flex-col rounded-md ">
                <DragAndDrop onDragEnd={handleDragEnd}>
                  <Drop id="droppable-id">
                    {taskList.map((task, index) => {
                      return (
                        <DraggableTask
                          task={task}
                          index={index}
                          onChangeTaskAddress={onChangeTaskAddress}
                        />
                      );
                    })}
                  </Drop>
                </DragAndDrop>
              </div>
            </div>

            <div className="my-10 flex w-5/6 flex-row justify-around rounded-md bg-white p-4">
              <div>
                <h2 className="mb-4 text-xl tracking-tight text-invitely sm:text-2xl">
                  Choisissez le véhicule qui vous convient
                </h2>
                <div className="flex flex-row justify-around rounded-sm bg-slate-50 p-3">
                  {truckTypeList.map((truckType) => (
                    <button
                      type="button"
                      onClick={() => onChangeTruckType(truckType.key)}
                    >
                      <div
                        className={`contraint-option flex flex-col justify-between p-2 ${
                          activeConstraints.truckType === truckType.key
                            ? "bg-invitely"
                            : "bg-white hover:shadow-md"
                        }`}
                      >
                        <h3
                          className={`font-extrabold ${
                            activeConstraints.truckType === truckType.key
                              ? "text-white"
                              : "text-invitely"
                          }`}
                        >
                          {truckType.shortTitle}
                        </h3>
                        <p
                          className={`font-light	text-cyan-800 ${
                            activeConstraints.truckType === truckType.key
                              ? "text-white"
                              : "text-cyan-700"
                          }`}
                        >
                          {truckType.title}
                        </p>
                        <img
                          src={`${
                            activeConstraints.truckType === truckType.key
                              ? truckType.imageUrl
                              : truckType.activeImageUrl
                          }`}
                          alt={truckType.key}
                        />
                        <p
                          className={`font-light ${
                            activeConstraints.truckType === truckType.key
                              ? "text-white"
                              : "text-cyan-700"
                          }`}
                        >
                          {truckType.capacity} Kgs
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-red-500">
                  *Accès parking souterrain impossible
                </p>
              </div>
              <div>
                <h2 className="mb-4 text-xl tracking-tight text-invitely sm:text-2xl">
                  Choissisez une prestation de manutention
                </h2>
                <div className="flex flex-row justify-around rounded-sm bg-slate-50 p-3">
                  {handlerServiceTypeList.map((handlerServiceType) => (
                    <button
                      type="button"
                      onClick={() =>
                        onChangeHandlerServiceType(handlerServiceType.key)
                      }
                    >
                      <div
                        className={`contraint-option flex flex-col justify-between p-2 ${
                          activeConstraints.handlerServiceType ===
                          handlerServiceType.key
                            ? "bg-invitely"
                            : "bg-white hover:shadow-md"
                        }`}
                      >
                        <p
                          className={`font-extrabold ${
                            activeConstraints.handlerServiceType ===
                            handlerServiceType.key
                              ? "text-white"
                              : "text-invitely"
                          }`}
                        >
                          {handlerServiceType.title}
                        </p>
                        <img
                          src={`${handlerServiceType.imageUrl}`}
                          alt={handlerServiceType.title}
                          className="w-30 h-24"
                          height={150}
                          width={120}
                        />
                        <p
                          className={`font-light	 ${
                            activeConstraints.handlerServiceType ===
                            handlerServiceType.key
                              ? "text-white"
                              : "text-cyan-800"
                          }`}
                        >
                          {handlerServiceType.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* <div className="my-10 flex w-5/6 flex-row justify-around rounded-md bg-white p-4">
              <div className="w-4/6">
                <h2 className="mb-4 text-center text-xl tracking-tight text-invitely sm:text-2xl">
                  Choissisez l&apos;amplitude horaire
                </h2>
                <div className="flex flex-row justify-around rounded-sm bg-slate-50 p-2">
                  {amplitudeTypeList.map((amplitudeType) => (
                    <button
                      type="button"
                      onClick={() => onChangeAmplitudeType(amplitudeType.key)}
                    >
                      <div
                        className={`contraint-option flex flex-col  p-2 ${
                          activeConstraints.amplitudeType === amplitudeType.key
                            ? "bg-invitely-light"
                            : "bg-white hover:shadow-md"
                        }`}
                      >
                        <p
                          className={`text-2xl font-extrabold	 ${
                            activeConstraints.amplitudeType ===
                            amplitudeType.key
                              ? "text-white"
                              : "text-invitely"
                          }`}
                        >
                          {amplitudeType.duration}
                        </p>
                        <p
                          className={`font-extralight	 ${
                            activeConstraints.amplitudeType ===
                            amplitudeType.key
                              ? "text-white"
                              : "text-cyan-800"
                          }`}
                        >
                          {amplitudeType.startHour} -&gt;{" "}
                          {amplitudeType.endHour}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div> */}
          </div>

          <div className="flex w-3/12 flex-col">
            <div className="fixed flex w-56 flex-col items-center gap-4">
              <FormGroup
                label="Date & heure de départ* ( ex: 21/01/2024 13:45 )"
                errorText={form.formState.errors.requiredDeliveryDate?.message}
                direction="vertical"
              >
                <input
                  type="datetime-local"
                  {...form.register("requiredDeliveryDate", {})}
                />
              </FormGroup>
              <div className="w-full rounded-md bg-invitely p-4 text-center text-white">
                <p className="text-3xl font-bold">PRIX</p>
                <br />
                <p className="text-3xl font-extrabold">
                  {(price / 100).toFixed(2)}€
                  <span className="ml-2 text-sm font-light">HT</span>
                </p>
                <br />
                <p className="text-xl font-semibold">
                  {((price + price * 0.2) / 100).toFixed(2)}€
                  <span className="ml-2 text-xs font-light">TTC</span>
                </p>
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-invitely px-3 py-2 font-extrabold text-white hover:bg-invitely-dark"
                onClick={form.handleSubmit(onValidate)}
              >
                Envoyer la commande
              </button>
              <button
                type="button"
                className="w-full rounded-md border-2 border-gray-900 px-3 py-2 font-semibold text-gray-900 hover:bg-invitely-light"
                onClick={() => setIsGoBackOpen(true)}
              >
                Retour en arrière
              </button>
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
        title="Retour en arrière ?"
        description="Cela annulera la commande en cours"
        isOpen={isGoBackOpen}
        confirmationText="Non, rester sur la page"
        cancelText="Oui, retour en arrière"
        onCancel={() => onGoBack()}
        onConfirm={() => setIsGoBackOpen(false)}
        closeModal={() => setIsGoBackOpen(false)}
      />
    </div>
  );
};

export default TasksVisualizer;
