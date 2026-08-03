import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'

const BG = '#14201a'
const PANEL = '#1c2a22'
const BORDER = '#33453a'
const ACCENT = '#c9a227'

export default function AdminUsers() {
  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  async function carregar() {
    setCarregando(true); setErro(null)
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, nome, role, created_at')
      .order('created_at', { ascending: false })
    setCarregando(false)
    if (error) return setErro(error.message)
    setUsuarios(data || [])
  }

  useEffect(() => { carregar() }, [])

  async function mudarRole(id, novoRole) {
    const { error } = await supabase.from('profiles').update({ role: novoRole }).eq('id', id)
    if (error) return alert('Erro: ' + error.message)
    carregar()
  }

  const stats = {
    total: usuarios.length,
    admins: usuarios.filter(u => u.role === 'admin').length,
    users: usuarios.filter(u => u.role === 'user').length,
    blocked: usuarios.filter(u => u.role === 'blocked').length,
  }

  return (
    <div style={{ minHeight: '100vh', background: BG, color: '#f2ede1', padding: '20px', fontFamily: "'IBM Plex Sans', ui-sans-serif, system-ui" }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: ACCENT, fontWeight: 600, textTransform: 'uppercase' }}>Painel Administrativo</div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '4px 0 0 0' }}>Usuários</h2>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
          <StatCard label="Total" value={stats.total} />
          <StatCard label="Admins" value={stats.admins} accent />
          <StatCard label="Usuários" value={stats.users} />
          <StatCard label="Bloqueados" value={stats.blocked} />
        </div>

        {carregando && <p style={{ color: '#9ca3af' }}>Carregando...</p>}
        {erro && <p style={{ color: '#fca5a5' }}>Erro: {erro}</p>}

        {!carregando && !erro && (
          <div style={{ background: PANEL, border: `1px solid ${BORDER}`, borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '600px' }}>
                <thead>
                  <tr style={{ background: BG, borderBottom: `1px solid ${BORDER}` }}>
                    <Th>Nome / Email</Th>
                    <Th>Cadastro</Th>
                    <Th>Papel</Th>
                    <Th align="right">Ações</Th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map(u => (
                    <tr key={u.id} style={{ borderBottom: `1px solid ${BORDER}80` }}>
                      <td style={tdStyle}>
                        <div style={{ fontWeight: 600 }}>{u.nome || '—'}</div>
                        <div style={{ fontSize: '11px', color: '#9ca3af' }}>{u.email}</div>
                      </td>
                      <td style={{ ...tdStyle, fontSize: '11px', color: '#9ca3af', fontFamily: 'ui-monospace, monospace' }}>
                        {new Date(u.created_at).toLocaleDateString('pt-BR')}
                      </td>
                      <td style={tdStyle}>
                        <RoleBadge role={u.role} />
                      </td>
                      <td style={{ ...tdStyle, textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                          {u.role !== 'admin' && (
                            <ActionBtn onClick={() => mudarRole(u.id, 'admin')} color={ACCENT}>Promover admin</ActionBtn>
                          )}
                          {u.role !== 'user' && (
                            <ActionBtn onClick={() => mudarRole(u.id, 'user')} color="#6b7280">Usuário</ActionBtn>
                          )}
                          {u.role !== 'blocked' && (
                            <ActionBtn onClick={() => mudarRole(u.id, 'blocked')} color="#dc2626">Bloquear</ActionBtn>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {usuarios.length === 0 && (
                    <tr><td colSpan={4} style={{ ...tdStyle, textAlign: 'center', color: '#9ca3af', padding: '30px' }}>Nenhum usuário cadastrado ainda.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Th({ children, align = 'left' }) {
  return <th style={{ padding: '10px 14px', textAlign: align, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', fontWeight: 600 }}>{children}</th>
}

const tdStyle = { padding: '12px 14px', verticalAlign: 'top' }

function StatCard({ label, value, accent }) {
  return (
    <div style={{ background: PANEL, border: `1px solid ${accent ? ACCENT + '60' : BORDER}`, borderRadius: '8px', padding: '12px 14px' }}>
      <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: '22px', fontWeight: 700, color: accent ? ACCENT : '#f2ede1', fontFamily: 'ui-monospace, monospace' }}>{value}</div>
    </div>
  )
}

function RoleBadge({ role }) {
  const map = {
    admin: { txt: 'Admin', bg: ACCENT + '30', color: ACCENT, border: ACCENT + '80' },
    user: { txt: 'Usuário', bg: '#6b728030', color: '#e5e7eb', border: '#6b7280' },
    blocked: { txt: 'Bloqueado', bg: '#dc262630', color: '#fca5a5', border: '#dc2626' },
  }
  const s = map[role] || map.user
  return (
    <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
      {s.txt}
    </span>
  )
}

function ActionBtn({ onClick, children, color }) {
  return (
    <button onClick={onClick} style={{ padding: '6px 10px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${color}80`, background: 'transparent', color, cursor: 'pointer' }}>
      {children}
    </button>
  )
}
