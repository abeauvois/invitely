import { Bars4Icon } from "@heroicons/react/24/outline";
import { PropsWithChildren } from "react";
import { Draggable } from "react-beautiful-dnd";

export const Drag = ({
  id,
  index,
  ...props
}: PropsWithChildren & { id: string; index: number }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            className="flex flex-row items-center"
            {...provided.draggableProps}
            {...props}
          >
            <div className="p-4" {...provided.dragHandleProps}>
              <Bars4Icon className="h-8 w-8 text-gray-600" />
            </div>
            {props.children}
          </div>
        );
      }}
    </Draggable>
  );
};
