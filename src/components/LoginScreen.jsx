import React, { useState } from 'react'
import { supabase } from '../lib/supabase.js'

// Cores da paleta Grafite Contemporâneo (igual ao PriceCalculator)
const BG = '#14201a'
const PANEL = '#1c2a22'
const BORDER = '#33453a'
const ACCENT = '#c9a227'

export default function LoginScreen() {
  const [modo, setModo] = useState('login') // 'login' | 'cadastro'
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(null)
  const [msg, setMsg] = useState(null)
  const [carregando, setCarregando] = useState(false)

  async function entrar(e) {
    e.preventDefault()
    setErro(null); setMsg(null); setCarregando(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    setCarregando(false)
    if (error) setErro(traduzErro(error.message))
  }

  async function cadastrar(e) {
    e.preventDefault()
    setErro(null); setMsg(null); setCarregando(true)
    if (senha.length < 6) {
      setErro('A senha precisa ter no mínimo 6 caracteres.')
      setCarregando(false)
      return
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: { data: { nome: nome.trim() || null } },
    })
    setCarregando(false)
    if (error) return setErro(traduzErro(error.message))
    if (data?.user && !data.session) {
      setMsg('Conta criada. Verifique seu email para confirmar antes de entrar.')
    }
    // caso já tenha sessão (confirmação de email desativada), o AuthGate detecta
  }

  return (
    <div style={{ minHeight: '100vh', background: BG, color: '#f2ede1', fontFamily: "'IBM Plex Sans', ui-sans-serif, system-ui", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');`}</style>

      <div style={{ width: '100%', maxWidth: '380px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: ACCENT, fontWeight: 600, textTransform: 'uppercase' }}>Mais@ Pecuária Estratégica</div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', marginBottom: 0 }}>Formação de Preço</h1>
          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '6px' }}>Acesso restrito</div>
        </div>

        <div style={{ background: PANEL, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '20px' }}>
          {/* Tabs login/cadastro */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
            <button
              onClick={() => { setModo('login'); setErro(null); setMsg(null) }}
              style={tabStyle(modo === 'login')}
            >Entrar</button>
            <button
              onClick={() => { setModo('cadastro'); setErro(null); setMsg(null) }}
              style={tabStyle(modo === 'cadastro')}
            >Criar conta</button>
          </div>

          <form onSubmit={modo === 'login' ? entrar : cadastrar} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {modo === 'cadastro' && (
              <Field label="Nome">
                <input value={nome} onChange={e => setNome(e.target.value)} type="text" placeholder="Seu nome" style={inputStyle} />
              </Field>
            )}
            <Field label="Email">
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="voce@email.com" required style={inputStyle} />
            </Field>
            <Field label="Senha">
              <input value={senha} onChange={e => setSenha(e.target.value)} type="password" placeholder="••••••••" required minLength={6} style={inputStyle} />
            </Field>

            {erro && (
              <div style={{ background: '#7a1e1e30', border: '1px solid #7a1e1e', color: '#fca5a5', borderRadius: '6px', padding: '10px', fontSize: '12px' }}>
                {erro}
              </div>
            )}
            {msg && (
              <div style={{ background: `${ACCENT}20`, border: `1px solid ${ACCENT}`, color: ACCENT, borderRadius: '6px', padding: '10px', fontSize: '12px' }}>
                {msg}
              </div>
            )}

            <button type="submit" disabled={carregando} style={btnPrimaryStyle(carregando)}>
              {carregando ? 'Aguarde...' : modo === 'login' ? 'Entrar' : 'Criar conta'}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '10px', color: '#6b7280' }}>
          Zootecnista CRMV-MT 01122-ZP · Sinop/MT
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ display: 'block', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '6px', fontWeight: 500 }}>{label}</span>
      {children}
    </label>
  )
}

const inputStyle = {
  width: '100%',
  background: BG,
  border: `1px solid ${BORDER}`,
  borderRadius: '6px',
  padding: '10px 12px',
  color: '#f2ede1',
  fontSize: '15px',
  outline: 'none',
  boxSizing: 'border-box',
}

function tabStyle(ativo) {
  return {
    padding: '10px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    border: 'none',
    cursor: 'pointer',
    background: ativo ? ACCENT : 'transparent',
    color: ativo ? BG : '#9ca3af',
    transition: 'all 0.15s',
  }
}

function btnPrimaryStyle(desabilitado) {
  return {
    padding: '12px',
    borderRadius: '8px',
    background: ACCENT,
    color: BG,
    fontSize: '14px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    border: 'none',
    cursor: desabilitado ? 'not-allowed' : 'pointer',
    opacity: desabilitado ? 0.6 : 1,
    marginTop: '6px',
  }
}

function traduzErro(msg) {
  const dic = {
    'Invalid login credentials': 'Email ou senha incorretos.',
    'Email not confirmed': 'Confirme seu email antes de entrar.',
    'User already registered': 'Este email já está cadastrado. Use "Entrar".',
    'Password should be at least 6 characters.': 'A senha precisa ter no mínimo 6 caracteres.',
  }
  return dic[msg] || msg
}
