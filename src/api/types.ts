export type TipoLancamento = 'ENTRADA' | 'SAIDA';
export type MetodoPagamento = 'cartao' | 'especie' | 'pix' | 'outros';

export interface Transacao {
  id: string;
  budget_id: string;
  budget_nome: string;
  budget_categoria: string;
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
  tipo: TipoLancamento;
  conta: string;
  metodo_pagamento: MetodoPagamento;
  pendente: boolean;
}

export interface TransacaoList {
  items: Transacao[];
  total: number;
  page: number;
  page_size: number;
}

export interface Orcamento {
  id: string;
  nome: string;
  categoria: string;
  valor_restante: number;
  valor_planejado: number;
  gasto: number;
  data_criacao: string;
  ativo: boolean;
  nota_governanca: string | null;
}

export interface OrcamentoList {
  items: Orcamento[];
  total: number;
  page: number;
  page_size: number;
}

export interface ResumoMicro {
  saldo_disponivel: number;
  total_receitas: number;
  total_despesas: number;
  qtd_orcamentos_ativos: number;
}

export type StatusOrcamento = 'ok' | 'atencao' | 'estourado';

export interface OrcamentoStatus {
  id: string;
  nome: string;
  categoria: string;
  teto: number;
  gasto: number;
  percentual: number;
  status: StatusOrcamento;
}

export interface Desvio {
  budget_id: string;
  nome: string;
  percentual: number;
  excedente: number;
  dias_restantes: number;
}

export interface DashboardMicro {
  resumo: ResumoMicro;
  orcamentos: OrcamentoStatus[];
  desvios: Desvio[];
  transacoes_recentes: Transacao[];
}

export interface CriarTransacaoPayload {
  budget_id: string;
  valor: number;
  data: string;
  descricao: string;
  categoria: string;
  conta: string;
  metodo_pagamento: MetodoPagamento;
  pendente: boolean;
}

export interface EditarTransacaoPayload {
  descricao?: string;
  categoria?: string;
  conta?: string;
  metodo_pagamento?: MetodoPagamento;
  pendente?: boolean;
  valor?: number;
  data?: string;
  budget_id?: string;
}

export interface CriarOrcamentoPayload {
  nome: string;
  categoria: string;
  valor: number;
  validade_meses: number;
}

export interface EditarOrcamentoPayload {
  nome?: string;
  valor?: number;
  validade_meses?: number;
  ativo?: boolean;
  nota_governanca?: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface ListarTransacoesParams {
  tipo?: TipoLancamento;
  ano_mes?: string;
  budget_id?: string;
  page?: number;
  page_size?: number;
}

export interface ListarOrcamentosParams {
  sort_by?: string;
  pasta?: 'ativos' | 'arquivados' | 'todos';
  page?: number;
  page_size?: number;
}

export interface VerificarCpfResponse {
  existe: boolean;
  user_id?: string;
}