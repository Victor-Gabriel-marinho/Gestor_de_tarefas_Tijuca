import { useState } from "react";

function Filtrar({ onFiltroChange }: { onFiltroChange: (filtro: any) => void }) {
  const [status, setStatus] = useState<string>("todas"); // "concluido", "naoConcluido", "pendente"
  const [prazo, setPrazo] = useState<string>("todas");   // "atraso", "dia", "semana", "mes"

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id
   if (status === id) {
        if (id === "todas") {
            return; 
        }
        return; 
    }
    setStatus(id);
    onFiltroChange({ status: id, prazo}); // envia filtro atualizado
  };

  const handlePrazoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id
   if (prazo === id) {
        if (id === "todas") {
            return;
        }
        return;
    }
    setPrazo(id);
    onFiltroChange({ status, prazo: id});
  };

  
  return (
    <div className="flex flex-col bg-[#251F1F] text-white w-[200px] rounded-[10px] absolute right-[-100px]">
      <div className="flex flex-col justify-center items-center">
        <p className="p-1">Filtro</p>
        {/* FILTRO DE STATUS */}
        <h3 className="p-2">Status da tarefa</h3>
        <ul className="p-3 space-y-2 flex flex-col gap-2">
          {["todas", "concluido", "progresso", "pendente"].map((id) => (
            <li key={id} className="flex flex-row items-center">
              <input
                type="checkbox"
                id={id}
                name="filtroStatus"
                className="rounded w-4 h-4 border border-white"
                checked={status === id}
                onChange={handleStatusChange}
              />
              <p className="pl-2">
                {id}
              </p>
            </li>
          ))}
        </ul>
        {/* FILTRO DE PRAZO */}
        <p className="p-2">Prazo</p>
        <ul className="p-3 space-y-2">
          {["todas", "atraso", "dia", "semana", "mes"].map((id) => (
            <li key={id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="filtroPrazo"
                id={id}
                className="rounded w-4 h-4 border border-white"
                checked={prazo === id}
                onChange={handlePrazoChange}
              />
              <p className="pl-2">
                {id}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Filtrar;
