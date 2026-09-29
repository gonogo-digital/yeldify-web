import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockData } from '../hooks/useMockData';

export default function Landing() {
  const navigate = useNavigate();
  const { isUsuarioExistente, isUsuarioNovo } = useMockData();
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);
  const [cpf, setCpf] = useState('');
  const [feedback, setFeedback] = useState('');
  
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // Intersection Observer para animações de fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const formatarCPF = (valor: string): string => {
    const apenasNumeros = valor.replace(/\D/g, '');
    if (apenasNumeros.length <= 3) return apenasNumeros;
    if (apenasNumeros.length <= 6) {
      return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(3)}`;
    }
    if (apenasNumeros.length <= 9) {
      return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(3, 6)}.${apenasNumeros.slice(6)}`;
    }
    return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(3, 6)}.${apenasNumeros.slice(6, 9)}-${apenasNumeros.slice(9, 11)}`;
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = formatarCPF(e.target.value);
    setCpf(valor);

    if (valor.replace(/\D/g, '').length >= 11) {
      if (isUsuarioExistente(valor)) {
        setFeedback('Bem vindo de volta, vamos lá');
      } else if (isUsuarioNovo(valor)) {
        setFeedback('Vamos começar sua jornada do seu universo financeiro');
      } else {
        setFeedback('Vamos começar sua jornada do seu universo financeiro');
      }
    } else {
      setFeedback('');
    }
  };

  const handleIniciarExperiencia = () => {
    setShowAuthOverlay(true);
  };

  const handleFecharExperiencia = () => {
    setShowAuthOverlay(false);
    setCpf('');
    setFeedback('');
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cpf.replace(/\D/g, '').length === 11) {
      navigate('/identificacao');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      {/* Header Fixado */}
      <header className="site-header">
        <div className="site-logo">Yeldify</div>
        <button className="header-cta" onClick={handleIniciarExperiencia}>
          Iniciar Experiência
        </button>
      </header>

      {/* ATO I: O Manifesto */}
      <section 
        className="lp-section"
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <span className="section-tag">01 / Manifesto</span>
        <h1 className="section-title">Não vendemos controle financeiro. Vendemos a paz absoluta de ter dinheiro em caixa.</h1>
        <p className="section-description">A complexidade do seu patrimônio merece um refúgio de clareza. Menos planilhas, mais silêncio mental.</p>
      </section>

      {/* ATO II: O Ecossistema */}
      <section 
        className="lp-section"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <span className="section-tag">02 / Arquitetura Total</span>
        <h1 className="section-title">Tudo sobre o seu dinheiro, do café diário ao seu patrimônio global.</h1>
        <p className="section-description">O Yeldify desmancha a fronteira entre o que você gasta hoje e o que seu capital rende amanhã.</p>
        
        <div className="arguments-grid">
          <div className="arg-card">
            <h3 className="arg-title">Visão Operacional (Micro)</h3>
            <p className="arg-text">Saiba exatamente quanto gastou, quanto pode gastar e governe seus tetos sem fricção ou rigidez excessiva.</p>
          </div>
          <div className="arg-card">
            <h3 className="arg-title">Visão Estratégica (Macro)</h3>
            <p className="arg-text">Acompanhe seu patrimônio líquido consolidado e descubra com precisão cirúrgica onde realizar seus próximos aportes.</p>
          </div>
        </div>
      </section>

      {/* ATO III: Inteligência Preditiva */}
      <section 
        className="lp-section"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <span className="section-tag">03 / Previsibilidade</span>
        <h1 className="section-title">Um conselheiro inteligente que antecipa o seu futuro.</h1>
        <p className="section-description">O sistema lê padrões silenciosos do seu histórico e traduz o caos de extratos bancários em rotas claras de estabilidade.</p>
      </section>

      {/* ATO IV: Soberania Absoluta */}
      <section 
        className="lp-section"
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <span className="section-tag">04 / Soberania</span>
        <h1 className="section-title">O sistema propõe. Você decide. O poder é inteiramente seu.</h1>
        <p className="section-description">Sem caixas pretas ou automações cegas. O Yeldify entrega o diagnóstico; você bate o martelo e mantém o comando absoluto das suas escolhas.</p>
      </section>

      {/* ATO V: Fechamento & CTA */}
      <section 
        className="lp-section"
        style={{ alignItems: 'center', textAlign: 'center' }}
        ref={(el) => (sectionsRef.current[4] = el)}
      >
        <span className="section-tag">05 / O Próximo Passo</span>
        <h1 className="section-title" style={{ textAlign: 'center' }}>
          Sua tranquilidade financeira começa com um único toque.
        </h1>
        <button 
          className="header-cta" 
          style={{ padding: '16px 36px', fontSize: '0.75rem', marginTop: '20px' }}
          onClick={handleIniciarExperiencia}
        >
          Iniciar Experiência Yeldify →
        </button>
      </section>

      {/* Tela de Entrada (O Acesso por CPF) */}
      <div className={`auth-overlay ${showAuthOverlay ? 'open' : ''}`}>
        <button className="auth-back" onClick={handleFecharExperiencia}>
          ← Voltar à leitura
        </button>
        <form className="auth-content" onSubmit={handleAuthSubmit}>
          <div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '400', marginBottom: '12px', letterSpacing: '-1px' }}>
              Identificação
            </h2>
            <p style={{ color: 'var(--texto-mutado)', fontSize: '0.95rem' }}>
              Digite seu CPF para o sistema reconhecer sua base de dados.
            </p>
          </div>
          <div>
            <input
              type="text"
              className="auth-input"
              placeholder="000.000.000-00"
              maxLength={14}
              value={cpf}
              onChange={handleCpfChange}
            />
            <div className={`auth-feedback ${feedback ? 'visible' : ''}`}>
              {feedback}
            </div>
          </div>
          <button type="submit" className="header-cta" style={{ display: feedback ? 'block' : 'none' }}>
            Continuar
          </button>
        </form>
        <div></div>
      </div>
    </div>
  );
}
