import { PropsWithChildren } from "react";
import { Droppable } from "react-beautiful-dnd";

export const Drop = ({ id, ...props }: PropsWithChildren & { id: string }) => {
  return (
    <Droppable droppableId={id}>
      {(provided, _) => {
        return (
          <div ref={provided.innerRef} {...provided.droppableProps} {...props}>
            {props.children}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};
