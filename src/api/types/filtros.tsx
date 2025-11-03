export interface Filtros {
    // Tipagem exata para os valores que o usuário pode selecionar no filtro de status
    status: 'todas' | 'concluido' | 'não Concluido' | 'pendente';

    // Tipagem exata para os valores que o usuário pode selecionar no filtro de prazo
    prazo: 'todas' | 'atraso' | 'dia' | 'semana' | 'mês';

    // Se você tivesse um filtro de busca por texto, seria adicionado aqui:
    // termoBusca?: string;
}