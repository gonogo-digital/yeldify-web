import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Senha() {
  const [senha, setSenha] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const cpf = (location.state as { cpf?: string })?.cpf || '';
  const userId = (location.state as { userId?: string })?.userId || 'user-123';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    if (!senha.trim()) {
      setError('Por favor, insira uma senha');
      setLoading(false);
      return;
    }
    try {
      await login(userId, cpf);
      navigate('/dashboard/micro');
    } finally {
      setLoading(false);
    }
  };

  const isValid = senha.trim() && !loading;

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center p-10" style={{ paddingBottom: '100px' }}>
      <div className="auth-content" style={{ maxWidth: '560px', width: '100%', textAlign: 'center' }}>
        <div style={{ marginBottom: '48px' }}>
          <div className="logo" style={{ marginBottom: '24px' }}>
            <h1 className="site-logo" style={{ fontSize: '2.2rem' }}>Yeldify</h1>
          </div>
          <div className="section-tag">ATO 2: AUTENTICACAO</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '400', letterSpacing: '-0.8px', color: 'var(--texto-principal)', margin: '12px 0' }}>
            Digite sua senha
          </h2>
          <p className="diag-description" style={{ textAlign: 'center' }}>
            {cpf && 'Bem-vindo de volta! Acesse sua conta com seguranca.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ width: '100%', marginBottom: '24px' }}>
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              disabled={loading}
              className="auth-input"
              style={{ textAlign: 'center', letterSpacing: '2px' }}
            />
            {error && <div style={{ marginTop: '16px', fontSize: '0.9rem', color: 'var(--alerta-vermelho)', minHeight: '24px' }}>{error}</div>}
          </div>
          <button type="submit" disabled={!isValid} className="btn-primary-outline" style={{ width: '100%' }}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button className="auth-back" onClick={() => navigate('/identificacao')}>
            <svg style={{ width: '12px', height: '12px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Voltar para Identificacao
          </button>
        </div>

        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--linha-divisoria)', fontSize: '0.75rem', color: 'var(--texto-mutado)', textAlign: 'center' }}>
          {cpf && `CPF: ${cpf}`}
        </div>
      </div>
    </div>
  );
}
