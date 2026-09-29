import { http } from './client';
import type {
  CriarOrcamentoPayload,
  CriarTransacaoPayload,
  DashboardMicro,
  EditarOrcamentoPayload,
  EditarTransacaoPayload,
  ListarOrcamentosParams,
  ListarTransacoesParams,
  Orcamento,
  OrcamentoList,
  Token,
  Transacao,
  TransacaoList,
  VerificarCpfResponse,
} from './types';

export const api = {
  // ===== Auth
  async login(userId: string): Promise<Token> {
    return http.post<Token>('/auth/token', { user_id: userId }, {});
  },

  async verificarCpf(cpf: string): Promise<VerificarCpfResponse> {
    return http.get<VerificarCpfResponse>('/auth/verificar-cpf', { cpf });
  },

  // ===== Transações
  async listarTransacoes(params?: ListarTransacoesParams): Promise<TransacaoList> {
    return http.get<TransacaoList>('/transacoes/', params);
  },
  async criarTransacao(payload: CriarTransacaoPayload): Promise<Transacao> {
    return http.post<Transacao>('/despesas/', payload);
  },
  async criarReceita(payload: CriarTransacaoPayload): Promise<Transacao> {
    return http.post<Transacao>('/receitas/', payload);
  },
  async editarTransacao(id: string, payload: EditarTransacaoPayload): Promise<Transacao> {
    return http.patch<Transacao>(`/transacoes/${id}`, payload);
  },

  // ===== Orçamentos
  async listarOrcamentos(params?: ListarOrcamentosParams): Promise<OrcamentoList> {
    return http.get<OrcamentoList>('/orcamentos/', params);
  },
  async criarOrcamento(payload: CriarOrcamentoPayload): Promise<Orcamento> {
    return http.post<Orcamento>('/orcamentos/', payload);
  },
  async editarOrcamento(id: string, payload: EditarOrcamentoPayload): Promise<Orcamento> {
    return http.put<Orcamento>(`/orcamentos/${id}`, payload);
  },

  // ===== Dashboard
  async dashboardMicro(anoMes?: string): Promise<DashboardMicro> {
    return http.get<DashboardMicro>('/dashboard/micro', { ano_mes: anoMes });
  },
};

export type {
  DashboardMicro,
  Orcamento,
  OrcamentoList,
  Transacao,
  TransacaoList,
  TipoLancamento,
  VerificarCpfResponse,
} from './types';