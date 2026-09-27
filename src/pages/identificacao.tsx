import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

const validarCPF = (cpf: string): boolean => {
  const apenasNumeros = cpf.replace(/\D/g, '');
  if (apenasNumeros.length !== 11) return false;
  if (/^(\d)\1+$/.test(apenasNumeros)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(apenasNumeros.charAt(i)) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(apenasNumeros.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(apenasNumeros.charAt(i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(apenasNumeros.charAt(10))) return false;

  return true;
};

export default function Identificacao() {
  const [cpf, setCpf] = useState('');
  const [, setStatus] = useState<'idle' | 'analyzing' | 'recognized' | 'new'>('idle');
  const [message, setMessage] = useState('');
  const [cpfInvalido, setCpfInvalido] = useState(false);
  const [verificando, setVerificando] = useState(false);
  const navigate = useNavigate();

  const formatarCPF = (valor: string): string => {
    const apenasNumeros = valor.replace(/\D/g, '');
    if (apenasNumeros.length <= 3) return apenasNumeros;
    if (apenasNumeros.length <= 6) return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(3)}`;
    if (apenasNumeros.length <= 9) return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(3, 6)}.${apenasNumeros.slice(6)}`;
    return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(3, 6)}.${apenasNumeros.slice(6, 9)}-${apenasNumeros.slice(9, 11)}`;
  };

  useEffect(() => {
    const apenasNumeros = cpf.replace(/\D/g, '');
    if (apenasNumeros.length === 0) {
      setStatus('idle');
      setMessage('');
      setCpfInvalido(false);
    } else if (apenasNumeros.length < 11) {
      setStatus('analyzing');
      setMessage('Analisando base com seguranca local...');
      setCpfInvalido(false);
    } else if (apenasNumeros.length === 11) {
      const valido = validarCPF(apenasNumeros);
      setCpfInvalido(!valido);
      if (!valido) {
        setStatus('idle');
        setMessage('CPF invalido. Verifique os digitos.');
      } else {
        setVerificando(true);
        setStatus('analyzing');
        setMessage('Verificando CPF na base...');
        api.verificarCpf(apenasNumeros)
          .then((res) => {
            setVerificando(false);
            setStatus(res.existe ? 'recognized' : 'new');
            setMessage(res.existe ? 'Usuario reconhecido...' : 'Novo usuario detectado...');
            const timer = setTimeout(() => {
              if (res.existe) {
                navigate('/senha', { state: { cpf: cpf, userId: res.user_id } });
              } else {
                navigate('/onboarding', { state: { cpf: cpf, isNewUser: true } });
              }
            }, 1500);
            return () => clearTimeout(timer);
          })
          .catch(() => {
            setVerificando(false);
            setCpfInvalido(true);
            setStatus('idle');
            setMessage('Erro ao verificar CPF. Tente novamente.');
          });
      }
    }
  }, [cpf, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const apenasNumeros = cpf.replace(/\D/g, '');
    if (apenasNumeros.length === 11 && validarCPF(apenasNumeros)) {
      setVerificando(true);
      api.verificarCpf(apenasNumeros)
        .then((res) => {
          if (res.existe) {
            navigate('/senha', { state: { cpf: cpf, userId: res.user_id } });
          } else {
            navigate('/onboarding', { state: { cpf: cpf, isNewUser: true } });
          }
        })
        .catch(() => {
          setCpfInvalido(true);
          setMessage('Erro ao verificar CPF. Tente novamente.');
        })
        .finally(() => setVerificando(false));
    }
  };

  const isComplete = cpf.replace(/\D/g, '').length === 11 && validarCPF(cpf.replace(/\D/g, ''));

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center p-10" style={{ paddingBottom: '100px' }}>
      <div className="auth-content" style={{ maxWidth: '560px', width: '100%', textAlign: 'center' }}>
        <div style={{ marginBottom: '48px' }}>
          <div className="logo" style={{ marginBottom: '24px' }}>
            <h1 className="site-logo" style={{ fontSize: '2.2rem' }}>Yeldify</h1>
          </div>
          <div className="section-tag">ATO 1: IDENTIFICACAO</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '400', letterSpacing: '-0.8px', color: 'var(--texto-principal)', margin: '12px 0' }}>
            Analisar perfil com seguranca local
          </h2>
          <p className="diag-description" style={{ maxWidth: '100%', textAlign: 'center' }}>
            Digite seu CPF para que possamos analisar seu perfil com seguranca local.
            <br />
            <span style={{ fontSize: '0.8rem' }}>(Somente voce tem acesso as suas informacoes)</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ width: '100%', marginBottom: '24px' }}>
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(formatarCPF(e.target.value))}
              placeholder="000.000.000-00"
              maxLength={14}
              className="auth-input"
              style={{ textAlign: 'center', letterSpacing: '2px', borderColor: cpfInvalido ? 'var(--alerta-vermelho)' : 'var(--linha-divisoria)' }}
            />
            <div className="auth-feedback" style={{ minHeight: '24px', color: cpfInvalido ? 'var(--alerta-vermelho)' : 'var(--texto-mutado)' }}>{message}</div>
          </div>
          <button type="submit" disabled={!isComplete || verificando} className="btn-primary-outline" style={{ width: '100%' }}>
            {verificando ? 'Verificando...' : isComplete ? 'Continuar' : 'Digite seu CPF'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button className="auth-back" onClick={() => navigate('/')}>
            <svg style={{ width: '12px', height: '12px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Voltar para a Pagina Inicial
          </button>
        </div>

        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--linha-divisoria)', fontSize: '0.75rem', color: 'var(--texto-mutado)', textAlign: 'center' }}>
          Seu CPF e usado apenas para identificar seu perfil.<br />
          Nao compartilhamos suas informacoes com ninguem.
        </div>
      </div>
    </div>
  );
}
