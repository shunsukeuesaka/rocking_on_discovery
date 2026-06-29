import type { Nav } from '../../types';

export function LoginPage({ nav, forCompany, forAdmin }: { nav: Nav; forCompany?: boolean; forAdmin?: boolean }) {
  const title = forAdmin ? 'Admin Login' : forCompany ? 'Company Login' : 'Member Login';
  const targetAfter = forAdmin ? 'SCR-028' : forCompany ? 'SCR-017' : 'SCR-008';
  return (
    <div style={{ minHeight: 'calc(100vh - 42px)', display: 'grid', placeItems: 'center', padding: 40, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(500px 300px at 50% 30%, rgba(207,48,21,0.15), transparent 70%)' }} />
      <div style={{ width: 420, position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontFamily: 'var(--ff-display)', fontSize: 40, letterSpacing: '0.04em', fontWeight: 700 }}>Discovery<span style={{ color: 'var(--mw-red)' }}>.</span></div>
          <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--mw-gray)', marginTop: 4 }}>presented by rockin'on</div>
          <div className="eyebrow" style={{ marginTop: 8 }}>{title}</div>
        </div>
        <div className="form-card">
          <div className="field-group">
            <label className="label">メールアドレス</label>
            <input className="mw-input" defaultValue={forCompany ? 'hr@rockinon.co.jp' : forAdmin ? 'admin@discovery.rockinon.co.jp' : 'haruto@example.com'} />
          </div>
          <div className="field-group">
            <label className="label">パスワード</label>
            <input className="mw-input" type="password" defaultValue="password" />
          </div>
          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }} onClick={() => nav(targetAfter)}>
            ログイン ↗
          </button>
          {!forAdmin && !forCompany && (
            <>
              <div style={{ textAlign: 'center', color: 'var(--mw-gray)', fontSize: 11, margin: '16px 0', letterSpacing: '0.1em' }}>— OR —</div>
              <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>G　Googleでログイン</button>
            </>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, fontSize: 12 }}>
            {!forAdmin && <a style={{ color: 'var(--mw-lightgray)' }} onClick={() => nav('SCR-012')}>パスワード忘れ</a>}
            {!forAdmin && !forCompany && <a style={{ color: 'var(--mw-lightgray)' }} onClick={() => nav('SCR-006')}>新規会員登録 →</a>}
          </div>
        </div>
      </div>
    </div>
  );
}
