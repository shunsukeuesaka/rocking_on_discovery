import { useState } from 'react'
import type { Nav, Job } from '../../types'
import { JOBS } from '../../data/mwData'

// ============ APPLY FORM ============
export function ApplyPage({ nav, job }: { nav: Nav; job?: Job }) {
  const j = job || JOBS[0]
  const [step, setStep] = useState(0)
  const [proceed, setProceed] = useState(false)
  const steps = ['基本情報', '書類アップロード', '確認・送信']

  // 外部サイト応募の求人
  if (j.applyType === 'external') {
    return (
      <div className="apply-page">
        <div className="eyebrow">External Application</div>
        <h1>外部サイトで応募</h1>
        <p className="lede">{j.co} — {j.title}</p>
        <div className="gate-card">
          <div className="gate-ico">↗</div>
          <h2>この求人は企業の採用サイトで受け付けています</h2>
          <p>応募は {j.co} の採用フォームで行います。下のボタンから外部サイトへ移動してください。当サイトの会員登録は不要です。</p>
          <div className="gate-actions">
            <button className="btn-primary" onClick={() => nav('SCR-005', { job: j })}>採用サイトへ移動 ↗</button>
            <button className="btn-ghost" onClick={() => nav('SCR-003', { job: j })}>← 求人詳細へ戻る</button>
          </div>
          <div className="gate-url">{j.applyUrl}</div>
        </div>
      </div>)

  }

  // サイト内応募 → 会員必須ゲート
  if (!proceed) {
    return (
      <div className="apply-page">
        <div className="eyebrow">Apply to {j.id}</div>
        <h1>応募フォーム</h1>
        <p className="lede">{j.co} — {j.title}</p>
        <div className="gate-card">
          <div className="gate-ico">🔒</div>
          <h2>当サイトからの応募には会員登録が必要です</h2>
          <p>応募状況の管理・お気に入り・新着通知のため、サイト内応募は会員限定です。ログインまたは会員登録のうえ応募にお進みください。</p>
          <div className="gate-actions">
            <button className="btn-primary" onClick={() => nav('SCR-006')}>会員登録して応募 ↗</button>
            <button className="btn-secondary" onClick={() => nav('SCR-007')}>ログイン</button>
          </div>
          <button className="gate-demo" onClick={() => setProceed(true)}>（デモ）ログイン済みとして続ける →</button>
        </div>
      </div>)

  }

  return (
    <div className="apply-page">
      <div className="eyebrow">Apply to {j.id}</div>
      <h1>応募フォーム</h1>
      <p className="lede">{j.co} — {j.title}</p>

      <div className="wiz-steps">
        {steps.map((s, i) =>
        <div key={i} className={"wiz-step" + (i === step ? " active" : "") + (i < step ? " done" : "")}>
            <div className="num">{i < step ? "✓" : i + 1}</div>
            <div className="lbl">{s}</div>
          </div>
        )}
      </div>

      <div className="autofill-banner">
        <span className="ico">●</span>
        <span>会員情報から自動入力しています。必要に応じて修正してください。</span>
      </div>

      <div className="form-card">
        {step === 0 &&
        <div>
            <div className="form-row">
              <div className="field-group req"><label className="label">氏名</label><input className="mw-input" defaultValue="佐藤 陽翔" /></div>
              <div className="field-group"><label className="label">フリガナ</label><input className="mw-input" defaultValue="サトウ ハルト" /></div>
            </div>
            <div className="form-row">
              <div className="field-group req"><label className="label">メール</label><input className="mw-input" defaultValue="haruto.sato@example.com" /></div>
              <div className="field-group req"><label className="label">電話</label><input className="mw-input" defaultValue="090-1234-5678" /></div>
            </div>
            <div className="form-row">
              <div className="field-group"><label className="label">生年月日</label><input className="mw-input" defaultValue="1998-05-12" /></div>
              <div className="field-group"><label className="label">現住所</label><input className="mw-input" defaultValue="東京都渋谷区" /></div>
            </div>
            <div className="field-group req">
              <label className="label">志望動機</label>
              <textarea className="mw-textarea" rows={5} defaultValue="rockin'on が手がけるフェスに学生時代から足を運び..." />
            </div>
            <div className="field-group">
              <label className="label">自己PR</label>
              <textarea className="mw-textarea" rows={4} />
            </div>
          </div>
        }

        {step === 1 &&
        <div>
            <div className="field-group req">
              <label className="label">履歴書</label>
              <div className="uploader">
                <div className="dz-title">📄 クリックまたはドラッグで追加</div>
                <div className="dz-sub">PDF / Word / 画像 (最大 5MB)</div>
              </div>
            </div>
            <div className="field-group">
              <label className="label">職務経歴書</label>
              <div className="uploader">
                <div className="dz-title">📑 クリックまたはドラッグで追加</div>
                <div className="dz-sub">PDF / Word / 画像 (最大 5MB)</div>
              </div>
            </div>
            <div className="field-group">
              <label className="label">ポートフォリオ URL（任意）</label>
              <input className="mw-input" placeholder="https://" />
            </div>
          </div>
        }

        {step === 2 &&
        <div>
            <div style={{ fontSize: 13, color: 'var(--mw-lightgray)', lineHeight: 1.8, fontFamily: 'var(--ff-jp)' }}>
              <h4 style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase', marginBottom: 10 }}>— 応募内容の確認</h4>
              <div className="detail-meta-grid">
                <div className="cell"><div className="k">氏名</div><div className="v">佐藤 陽翔</div></div>
                <div className="cell"><div className="k">メール</div><div className="v">haruto.sato@example.com</div></div>
                <div className="cell"><div className="k">電話</div><div className="v">090-1234-5678</div></div>
                <div className="cell"><div className="k">応募先</div><div className="v">{j.title}</div></div>
              </div>
              <p style={{ marginTop: 16 }}>送信ボタンを押すと、{j.co} に応募情報が送信されます。登録メールアドレス宛に応募受付確認メールが届きます。</p>
            </div>
          </div>
        }
      </div>

      <div className="form-actions">
        <button className="btn-ghost" onClick={() => step > 0 ? setStep(step - 1) : nav('SCR-003', { job: j })}>
          ← 戻る
        </button>
        {step < 2 ?
        <button className="btn-primary" onClick={() => setStep(step + 1)}>次へ ↗</button> :

        <button className="btn-primary" onClick={() => nav('SCR-005', { job: j })}>応募を送信する ↗</button>
        }
      </div>
    </div>)

}
