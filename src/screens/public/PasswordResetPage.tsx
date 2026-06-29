import { useState } from 'react';
import type { Nav } from '../../types';

// ============ PASSWORD RESET ============
export function PasswordResetPage({ nav }: { nav: Nav }) {
  const [sent, setSent] = useState(false);
  return (
    <div style={{ minHeight: 'calc(100vh - 42px)', display: 'grid', placeItems: 'center', padding: 40 }}>
      <div style={{ width: 420 }}>
        <div className="eyebrow" style={{ textAlign: 'center' }}>Password Reset</div>
        <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 44, textAlign: 'center', margin: '4px 0 24px', fontWeight: 400, letterSpacing: '0.02em' }}>パスワード再設定</h1>
        <div className="form-card">
          {!sent ? (
            <div>
              <p style={{ fontSize: 13, color: 'var(--mw-lightgray)', marginBottom: 18, fontFamily: 'var(--ff-jp)', lineHeight: 1.8 }}>
                登録済みのメールアドレスを入力してください。再設定用のリンクをお送りします。
              </p>
              <div className="field-group"><label className="label">メール</label><input className="mw-input" defaultValue="haruto@example.com" /></div>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setSent(true)}>リセットメールを送信 ↗</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--mw-red)', color: '#fff', display: 'grid', placeItems: 'center', margin: '0 auto 16px', fontSize: 24 }}>✉</div>
              <div style={{ fontWeight: 700, marginBottom: 8, color: 'var(--mw-white)' }}>メールを送信しました</div>
              <p style={{ fontSize: 12, color: 'var(--mw-lightgray)', lineHeight: 1.8, fontFamily: 'var(--ff-jp)' }}>
                haruto@example.com 宛にリセットリンクを送りました。<br />
                リンクの有効期限は30分です。
              </p>
              <button className="btn-ghost mt-3" onClick={() => nav('SCR-007')} style={{ marginTop: 16 }}>ログインへ戻る</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
