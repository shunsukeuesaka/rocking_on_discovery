import type { Nav } from '../../types';

// ============ SIGNUP ============
export function SignupPage({ nav }: { nav: Nav }) {
  return (
    <div className="apply-page">
      <div className="eyebrow">Sign Up</div>
      <h1>会員登録</h1>
      <p className="lede">登録して、応募管理・お気に入り保存・新着求人通知を受け取りましょう。</p>
      <div className="form-card">
        <div className="form-row">
          <div className="field-group req"><label className="label">メールアドレス</label><input className="mw-input" type="email" placeholder="you@example.com" /></div>
          <div className="field-group req"><label className="label">パスワード</label><input className="mw-input" type="password" /></div>
        </div>
        <div className="form-row">
          <div className="field-group req"><label className="label">氏名</label><input className="mw-input" /></div>
          <div className="field-group req"><label className="label">生年月日</label><input className="mw-input" type="date" /></div>
        </div>
        <div className="form-row">
          <div className="field-group req"><label className="label">電話番号</label><input className="mw-input" type="tel" placeholder="090-1234-5678" /></div>
          <div className="field-group req"><label className="label">住所</label><input className="mw-input" placeholder="東京都渋谷区…" /></div>
        </div>
        <div className="signup-note">
          <span className="ico">✉</span>
          <span>登録後、入力したメールアドレス宛に確認メールをお送りします。メール内のリンクで認証を完了してください。</span>
        </div>
        <div className="signup-note alt">
          希望職種・経験年数などは登録後、マイページから任意で設定できます。
        </div>
        <label className="filter-opt" style={{ marginTop: 10 }}>
          <input type="checkbox" defaultChecked />
          <span style={{ fontSize: 12, color: 'var(--mw-lightgray)' }}>利用規約・プライバシーポリシーに同意する</span>
        </label>
        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }} onClick={() => nav('SCR-008')}>確認メールを送信して登録 ↗</button>
        <div style={{ textAlign: 'center', color: 'var(--mw-gray)', fontSize: 11, margin: '16px 0' }}>— OR —</div>
        <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>Googleで登録</button>
      </div>
    </div>
  );
}
