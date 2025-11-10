import type { Task } from "../../../api/types/TaskTypes/TaskDTO";

type DescriptionTaskProps = {
    task: Task
}

export function DescriptionTask({task}:DescriptionTaskProps) {
    return (
      <div className="flex items-start justify-center flex-col gap-3 w-full">
        <p className="text-sm">
          <span className="font-semibold text-xl ">Descrição: </span>
          <span className=" max-w-[350px]">{task.Content}</span>
        </p>
        <p className="flex text-lg gap-2">
          <span className="font-semibold text-xl">Data de entrega:</span>
          {task.EndDate.toString().split("T")[0].replaceAll("-", "/")}
        </p>
        <p className="flex text-lg gap-2">
          <span className="font-semibold text-xl">Prioridade:</span>
          {task.Priority}
        </p>
      </div>
    );
}