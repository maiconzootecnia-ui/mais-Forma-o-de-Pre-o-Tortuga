import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import LoginScreen from './LoginScreen.jsx'
import AdminUsers from './AdminUsers.jsx'
import PriceCalculator from '../PriceCalculator.jsx'

const BG = '#14201a'
const ACCENT = '#c9a227'

export default function App() {
  const [session, setSession] = useState(undefined) // undefined = carregando
  const [profile, setProfile] = useState(null)
  const [aba, setAba] = useState('calculadora') // 'calculadora' | 'usuarios'

  // Escuta mudanças de sessão do Supabase
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      if (!s) setProfile(null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  // Quando tem sessão, busca o profile (com role)
  useEffect(() => {
    if (!session?.user?.id) return
    supabase
      .from('profiles')
      .select('id, email, nome, role')
      .eq('id', session.user.id)
      .single()
      .then(({ data }) => setProfile(data))
  }, [session?.user?.id])

  async function sair() {
    await supabase.auth.signOut()
  }

  // Loading inicial
  if (session === undefined) {
    return <TelaCarregando texto="Carregando..." />
  }

  // Não logado
  if (!session) {
    return <LoginScreen />
  }

  // Logado mas ainda buscando profile
  if (!profile) {
    return <TelaCarregando texto="Verificando acesso..." onSair={sair} />
  }

  // Bloqueado
  if (profile.role === 'blocked') {
    return (
      <TelaMensagem
        titulo="Acesso Bloqueado"
        mensagem="Sua conta foi bloqueada pelo administrador. Entre em contato para mais informações."
        onSair={sair}
      />
    )
  }

  const admin = profile.role === 'admin'

  return (
    <div>
      {/* Barra superior */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: '#0f1811', borderBottom: '1px solid #33453a', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {admin && (
            <>
              <TabBtn ativo={aba === 'calculadora'} onClick={() => setAba('calculadora')}>Calculadora</TabBtn>
              <TabBtn ativo={aba === 'usuarios'} onClick={() => setAba('usuarios')}>Usuários</TabBtn>
            </>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ textAlign: 'right', lineHeight: 1.2 }}>
            <div style={{ fontSize: '11px', color: '#f2ede1', fontWeight: 600 }}>{profile.nome || profile.email.split('@')[0]}</div>
            <div style={{ fontSize: '9px', color: admin ? ACCENT : '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{admin ? 'Admin' : 'Usuário'}</div>
          </div>
          <button onClick={sair} style={{ padding: '6px 12px', background: 'transparent', border: '1px solid #33453a', borderRadius: '6px', color: '#9ca3af', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' }}>
            Sair
          </button>
        </div>
      </div>

      {aba === 'usuarios' && admin ? <AdminUsers /> : <PriceCalculator />}
    </div>
  )
}

function TabBtn({ ativo, onClick, children }) {
  return (
    <button onClick={onClick} style={{ padding: '6px 12px', background: ativo ? ACCENT : 'transparent', color: ativo ? BG : '#9ca3af', border: `1px solid ${ativo ? ACCENT : '#33453a'}`, borderRadius: '6px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' }}>
      {children}
    </button>
  )
}

function TelaCarregando({ texto, onSair }) {
  return (
    <div style={{ minHeight: '100vh', background: BG, color: '#f2ede1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', fontFamily: "'IBM Plex Sans', ui-sans-serif, system-ui" }}>
      <div style={{ fontSize: '13px', color: '#9ca3af' }}>{texto}</div>
      {onSair && (
        <button onClick={onSair} style={{ fontSize: '11px', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>sair</button>
      )}
    </div>
  )
}

function TelaMensagem({ titulo, mensagem, onSair }) {
  return (
    <div style={{ minHeight: '100vh', background: BG, color: '#f2ede1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: "'IBM Plex Sans', ui-sans-serif, system-ui" }}>
      <div style={{ maxWidth: '400px', textAlign: 'center' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: ACCENT, fontWeight: 600, textTransform: 'uppercase' }}>Mais@</div>
        <h1 style={{ fontSize: '22px', fontWeight: 700, marginTop: '10px' }}>{titulo}</h1>
        <p style={{ color: '#9ca3af', marginTop: '10px', lineHeight: 1.5 }}>{mensagem}</p>
        <button onClick={onSair} style={{ marginTop: '20px', padding: '10px 20px', background: 'transparent', border: '1px solid #33453a', borderRadius: '6px', color: '#f2ede1', cursor: 'pointer' }}>
          Sair
        </button>
      </div>
    </div>
  )
}
