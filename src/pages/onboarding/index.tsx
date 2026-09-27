import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(1);

  const irSlide = (numero: number) => {
    setActiveSlide(numero);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex flex-col">
      <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header className="flex justify-between items-center w-full py-10 px-15">
          <div className="logo-text">Yeldify</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--texto-mutado)', fontFamily: 'var(--fonte-dados)' }}>
            Relatório de Diagnóstico
          </div>
        </header>

        {/* Container de Slides */}
        <main className="diagnosis-container flex-1">
          {/* SLIDE 1: OS DESVIOS E ALERTAS */}
          <div className={`diag-slide ${activeSlide === 1 ? 'active' : ''}`} id="slide-1">
            <span className="diag-tag">01 / Pontos de Atenção</span>
            <h1 className="diag-title">Identificamos desvios e oportunidades de ajuste estrutural.</h1>
            <p className="diag-description">
              Sua categoria de Alimentação ficou 28% acima do ideal histórico. Além disso, houve um gasto pontual com manutenção residencial — um excelente gatilho pra consolidar sua Reserva de Emergência.
            </p>
            
            <div className="metrics-grid">
              <div className="metric-item">
                <span className="metric-label">Desvio em Alimentação</span>
                <span className="metric-value" style={{ color: 'var(--alerta-vermelho)' }}>+ R$ 340,00</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Impacto Residencial (Pontual)</span>
                <span className="metric-value">R$ 1.200,00</span>
              </div>
            </div>

            <div className="diag-footer">
              <span style={{ fontSize: '0.75rem', color: 'var(--texto-mutado)', fontFamily: 'var(--fonte-dados)' }}>
                Passo 1 de 3
              </span>
              <button className="btn-text-link" onClick={() => irSlide(2)}>
                Ver os acertos e vitórias
              </button>
            </div>
          </div>

          {/* SLIDE 2: OS ACERTOS E VITÓRIAS */}
          <div className={`diag-slide ${activeSlide === 2 ? 'active' : ''}`} id="slide-2">
            <span className="diag-tag">02 / Reconhecimento de Consistência</span>
            <h1 className="diag-title">Em contrapartida, sua base de consistência apresentou fôlego.</h1>
            <p className="diag-description">
              Você manteve rigor nas transferências recorrentes, reduziu gastos com transporte em relação ao trimestre passado e destinou recursos para projetos sociais.
            </p>
            
            <div className="metrics-grid">
              <div className="metric-item">
                <span className="metric-label">Economia em Transporte</span>
                <span className="metric-value" style={{ color: 'var(--verde-terroso)' }}>- 18%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Aporte Social & Consistência</span>
                <span className="metric-value">R$ 450,00</span>
              </div>
            </div>

            <div className="diag-footer">
              <button className="btn-text-link" onClick={() => irSlide(1)} style={{ rotate: '180deg' }}>
                ← Voltar
              </button>
              <button className="btn-text-link" onClick={() => irSlide(3)}>
                Ver proposta de orçamentos
              </button>
            </div>
          </div>

          {/* SLIDE 3: A PROPOSTA */}
          <div className={`diag-slide ${activeSlide === 3 ? 'active' : ''}`} id="slide-3">
            <span className="diag-tag">03 / Proposta do Sistema</span>
            <h1 className="diag-title">O Yeldify estruturou estes tetos. O poder de aceite é seu.</h1>
            <p className="diag-description">
              Com base no seu histórico de 3 meses, sugerimos travar estes limites para garantir estabilidade. Você pode revisar, desmarcar ou ajustar qualquer item na próxima etapa.
            </p>
            
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <span style={{ 
                display: 'inline-block', 
                padding: '12px 24px', 
                background: 'var(--bg-elevado)', 
                border: '1px solid var(--linha-divisoria)',
                borderRadius: '8px',
                fontSize: '0.9rem',
                color: 'var(--texto-principal)'
              }}>
                5 orçamentos sugeridos · Revisar e confirmar
              </span>
            </div>

            <div className="diag-footer">
              <button className="btn-text-link" onClick={() => irSlide(2)} style={{ rotate: '180deg' }}>
                ← Voltar
              </button>
              <button className="btn-primary-outline" onClick={() => navigate('/onboarding/orcamentos')}>
                Ver e Aplicar Proposta
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
