import type { Nav } from '../../types'

// ============ APPLY DONE ============
export function ApplyDone({ nav }: { nav: Nav }) {
  return (
    <div className="thanks">
      <div className="inner">
        <div className="mark">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="eyebrow">Application Received</div>
        <h1>THANK YOU.<br />応募ありがとうございます。</h1>
        <p>
          応募内容を受け付けました。登録メールアドレスに確認メールを送信しています。<br />
          企業担当者より書類選考のご連絡をお待ちください。
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button className="btn-primary" onClick={() => nav('SCR-006')}>会員登録して応募を管理 ↗</button>
          <button className="btn-secondary" onClick={() => nav('SCR-001')}>トップへ戻る</button>
        </div>

        <div className="box">
          <div style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>— Next Steps</div>
          <ul style={{ paddingLeft: 18, color: 'var(--mw-lightgray)', fontSize: 13, lineHeight: 2, fontFamily: 'var(--ff-jp)' }}>
            <li>確認メールを受信箱でご確認ください（届かない場合は迷惑メールフォルダも）</li>
            <li>書類選考の結果は7営業日以内にご連絡します</li>
            <li>会員登録すると応募状況をマイページで確認できます</li>
          </ul>
        </div>
      </div>
    </div>)

}
