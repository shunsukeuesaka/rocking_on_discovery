// MusicWork — Company & Admin screens
const { useState: useStateCA } = React;

// ============ COMPANY DASHBOARD (SCR-017) ============
function CompanyDashboard({ nav }) {
  return (
    <div style={{ padding: '32px 28px' }}>
      <div className="eyebrow">Company Console</div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 44, margin: '4px 0 6px', fontWeight: 400, letterSpacing: '0.02em' }}>DASHBOARD</h1>
      <p className="h-sub">rockin'on inc. · 本日 2026.04.20</p>

      <div className="stat-row" style={{ marginTop: 24 }}>
        <div className="stat-card"><div className="k">公開中の求人</div><div className="v">5</div><div className="delta">+1 this week</div></div>
        <div className="stat-card"><div className="k">新規応募</div><div className="v">28</div><div className="delta">+6 vs last week</div></div>
        <div className="stat-card"><div className="k">書類選考中</div><div className="v">12</div><div className="delta">要対応 3</div></div>
        <div className="stat-card"><div className="k">求人閲覧数</div><div className="v">4,218</div><div className="delta">過去30日</div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 24 }}>
        <div className="form-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase' }}>— Applications Trend</h3>
            <span style={{ fontSize: 11, color: 'var(--mw-gray)', fontFamily: 'var(--ff-mono)' }}>LAST 14 DAYS</span>
          </div>
          <MiniChart values={[3, 5, 2, 8, 6, 9, 4, 7, 11, 8, 6, 12, 9, 14]} />
        </div>

        <div className="form-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase' }}>— Job Performance</h3>
            <span style={{ fontSize: 11, color: 'var(--mw-gray)', fontFamily: 'var(--ff-mono)' }}>VIEW / APPLY RATE</span>
          </div>
          {window.MW_DATA.jobs.slice(0, 3).map((j, i) => (
            <div key={j.id} style={{ padding: '10px 0', borderBottom: '0.5px solid var(--mw-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <span style={{ color: 'var(--mw-white)', fontFamily: 'var(--ff-jp)' }}>{j.title}</span>
                <span style={{ fontFamily: 'var(--ff-mono)', color: 'var(--mw-red-light)' }}>{[1284, 892, 541][i]} views</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginTop: 8, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'var(--mw-red)', width: [85, 62, 38][i] + '%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="form-card" style={{ marginTop: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase' }}>— Recent Applicants</h3>
          <button className="btn-ghost btn-sm" onClick={() => nav('SCR-020')}>すべて表示 →</button>
        </div>
        {[
          { name: '佐藤 陽翔', job: 'A&Rディレクター', date: '2026.04.20 09:14', status: 'new', label: '新規' },
          { name: '田中 美咲', job: 'ライブ制作マネージャー', date: '2026.04.19 17:42', status: 'review', label: '書類選考' },
          { name: '鈴木 湊', job: 'レコーディングエンジニア', date: '2026.04.19 14:08', status: 'interview', label: '面接調整' },
          { name: 'Kyle Parker', job: 'MVディレクター', date: '2026.04.18 11:30', status: 'new', label: '新規' },
        ].map((a, i) => (
          <div key={i} className="history-row" style={{ borderBottom: '0.5px solid var(--mw-border)' }}>
            <div className="co-logo">{a.name[0]}</div>
            <div>
              <h4>{a.name}</h4>
              <div className="sub">{a.job}</div>
            </div>
            <div><span className={"status-pill " + a.status}>{a.label}</span></div>
            <div className="date">{a.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniChart({ values }) {
  const max = Math.max(...values);
  return (
    <div style={{ height: 140, display: 'flex', alignItems: 'flex-end', gap: 4, padding: '0 4px' }}>
      {values.map((v, i) => (
        <div key={i} style={{ flex: 1, height: (v / max * 100) + '%', background: i === values.length - 1 ? 'var(--mw-red)' : 'rgba(207,48,21,0.45)', borderRadius: '2px 2px 0 0', position: 'relative' }}>
          {i === values.length - 1 && (
            <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', fontSize: 10, color: 'var(--mw-red-light)', fontFamily: 'var(--ff-mono)' }}>{v}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ============ JOB MGMT LIST (SCR-018) ============
function JobMgmtList({ nav }) {
  const [tab, setTab] = useStateCA('active');
  return (
    <div style={{ padding: '32px 28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <div className="eyebrow">Job Management</div>
          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 44, margin: '4px 0', fontWeight: 400, letterSpacing: '0.02em' }}>求人管理</h1>
        </div>
        <button className="btn-primary" onClick={() => nav('SCR-019')}>＋ 新規求人作成</button>
      </div>

      <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
        {[
          ['active', '公開中', 5], ['draft', '下書き', 2], ['review', '審査中', 1], ['closed', '終了', 12]
        ].map(([k, n, c]) => (
          <button key={k} className={"jobmgmt-tab" + (tab === k ? " active" : "")} onClick={() => setTab(k)}>
            {n} <span style={{ opacity: 0.5, marginLeft: 6 }}>{c}</span>
          </button>
        ))}
      </div>

      <div className="form-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '0.5px solid var(--mw-border)' }}>
              {['JOB TITLE', 'STATUS', 'VIEWS', 'APPLY', 'POSTED', 'ACTION'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 10, letterSpacing: '0.14em', color: 'var(--mw-gray)', fontWeight: 700, fontFamily: 'var(--ff-mono)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {window.MW_DATA.jobs.slice(0, 5).map((j, i) => (
              <tr key={j.id} style={{ borderBottom: '0.5px solid var(--mw-border)' }}>
                <td style={{ padding: '16px', color: 'var(--mw-white)' }}>
                  <div style={{ fontWeight: 700, fontFamily: 'var(--ff-jp)' }}>{j.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--mw-gray)', marginTop: 2, fontFamily: 'var(--ff-mono)' }}>{j.id}</div>
                </td>
                <td style={{ padding: '16px' }}><span className="status-pill new">公開中</span></td>
                <td style={{ padding: '16px', fontFamily: 'var(--ff-mono)', color: 'var(--mw-lightgray)' }}>{[1284, 892, 541, 723, 412][i]}</td>
                <td style={{ padding: '16px', fontFamily: 'var(--ff-mono)', color: 'var(--mw-red-light)' }}>{[42, 28, 12, 18, 8][i]}</td>
                <td style={{ padding: '16px', fontFamily: 'var(--ff-mono)', color: 'var(--mw-gray)', fontSize: 11 }}>{j.posted}</td>
                <td style={{ padding: '16px' }}>
                  <button className="btn-ghost btn-sm" onClick={() => nav('SCR-019')}>編集</button>
                  <button className="btn-ghost btn-sm" onClick={() => nav('SCR-020')} style={{ marginLeft: 4 }}>応募者</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============ JOB EDITOR (SCR-019) ============
function JobEditor({ nav }) {
  return (
    <div style={{ padding: '32px 28px', maxWidth: 1100 }}>
      <div className="eyebrow">Job Editor</div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 44, margin: '4px 0 24px', fontWeight: 400, letterSpacing: '0.02em' }}>求人作成・編集</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
        <div className="form-card">
          <div className="form-row">
            <div className="field-group req" style={{ flex: 2 }}><label className="label">求人タイトル</label><input className="mw-input" defaultValue="A&Rディレクター / 新人発掘〜作品プロデュース" /></div>
            <div className="field-group req"><label className="label">職種カテゴリ</label>
              <select className="mw-input">{window.MW_DATA.categories.map(c => <option key={c.en}>{c.ja}</option>)}</select>
            </div>
          </div>
          <div className="form-row">
            <div className="field-group req"><label className="label">雇用形態</label>
              <select className="mw-input"><option>正社員</option><option>契約社員</option><option>業務委託</option></select>
            </div>
            <div className="field-group req"><label className="label">年収レンジ</label>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <input className="mw-input" defaultValue="550" /><span style={{ color: 'var(--mw-gray)' }}>〜</span><input className="mw-input" defaultValue="850" /><span style={{ color: 'var(--mw-gray)', fontSize: 12 }}>万円</span>
              </div>
            </div>
            <div className="field-group"><label className="label">勤務地</label><input className="mw-input" defaultValue="東京・渋谷 / リモート可" /></div>
          </div>
          <div className="field-group req">
            <label className="label">業務概要</label>
            <textarea className="mw-textarea" rows="4" defaultValue="Discovery運営の rockin'on inc. では、アーティスト発掘から作品プロデュースまで..." />
          </div>
          <div className="field-group req">
            <label className="label">業務内容（1行ずつ）</label>
            <textarea className="mw-textarea" rows="5" defaultValue="新人アーティストの発掘・契約交渉&#10;作品制作全般のプロデュース&#10;プロモーション戦略の立案と実行" />
          </div>
          <div className="field-group req">
            <label className="label">応募条件</label>
            <textarea className="mw-textarea" rows="3" defaultValue="音楽業界での制作・A&R実務経験 3年以上&#10;レーベル・マネジメント会社での実務経験" />
          </div>
          <div className="field-group">
            <label className="label">歓迎要件</label>
            <textarea className="mw-textarea" rows="3" />
          </div>
          <div className="field-group">
            <label className="label">タグ（カンマ区切り）</label>
            <input className="mw-input" defaultValue="A&R, 新規開拓, プロデュース" />
          </div>
        </div>

        <div>
          <div className="apply-box">
            <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mw-red)', fontWeight: 700, marginBottom: 14 }}>— Publishing</div>
            <div className="field-group">
              <label className="label">ステータス</label>
              <select className="mw-input"><option>下書き</option><option>公開申請</option><option>公開中</option></select>
            </div>
            <div className="field-group">
              <label className="label">応募締切</label>
              <input className="mw-input" type="date" defaultValue="2026-05-31" />
            </div>
            <label className="filter-opt" style={{ margin: '14px 0' }}>
              <input type="checkbox" defaultChecked /><span style={{ fontSize: 12, color: 'var(--mw-lightgray)' }}>注目求人枠に表示</span>
            </label>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 8 }}>公開申請する ↗</button>
            <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>下書き保存</button>
          </div>

          <div className="apply-box" style={{ marginTop: 12 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mw-red)', fontWeight: 700, marginBottom: 10 }}>— Review Checklist</div>
            <div style={{ fontSize: 11, color: 'var(--mw-lightgray)', lineHeight: 2, fontFamily: 'var(--ff-jp)' }}>
              <div>✓ タイトル入力済</div>
              <div>✓ 年収記入済</div>
              <div style={{ color: 'var(--mw-gray)' }}>○ 歓迎要件（推奨）</div>
              <div>✓ 業務内容 3件以上</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ APPLICANT LIST (SCR-020) ============
function ApplicantList({ nav }) {
  return (
    <div style={{ padding: '32px 28px' }}>
      <div className="eyebrow">Applicant Management</div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 44, margin: '4px 0', fontWeight: 400, letterSpacing: '0.02em' }}>応募者管理</h1>
      <p className="h-sub">A&Rディレクター — 応募者 42名</p>

      <div style={{ display: 'flex', gap: 4, margin: '24px 0 16px' }}>
        {[['all', '全て', 42], ['new', '新規', 12], ['review', '書類選考', 18], ['interview', '面接', 8], ['offer', '内定', 2], ['reject', '不合格', 2]].map(([k, n, c], i) => (
          <button key={k} className={"jobmgmt-tab" + (i === 0 ? " active" : "")}>{n} <span style={{ opacity: 0.5, marginLeft: 4 }}>{c}</span></button>
        ))}
      </div>

      <div className="form-card" style={{ padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '0.5px solid var(--mw-border)', background: 'rgba(255,255,255,0.02)' }}>
              {['NAME', 'JOB', 'STATUS', 'RATING', 'APPLIED', 'ACTION'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 10, letterSpacing: '0.14em', color: 'var(--mw-gray)', fontWeight: 700, fontFamily: 'var(--ff-mono)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { name: '佐藤 陽翔', age: 28, job: 'A&Rディレクター', status: 'new', label: '新規', stars: 0, date: '2026.04.20' },
              { name: '田中 美咲', age: 31, job: 'A&Rディレクター', status: 'review', label: '書類選考', stars: 4, date: '2026.04.19' },
              { name: '鈴木 湊', age: 26, job: 'A&Rディレクター', status: 'interview', label: '面接', stars: 5, date: '2026.04.18' },
              { name: 'Kyle Parker', age: 34, job: 'A&Rディレクター', status: 'review', label: '書類選考', stars: 3, date: '2026.04.17' },
              { name: '山田 楓', age: 29, job: 'A&Rディレクター', status: 'offer', label: '内定', stars: 5, date: '2026.04.10' },
            ].map((a, i) => (
              <tr key={i} style={{ borderBottom: '0.5px solid var(--mw-border)' }} onClick={() => nav('SCR-021')}>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--mw-red)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontFamily: 'var(--ff-display)' }}>{a.name[0]}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--mw-white)', fontFamily: 'var(--ff-jp)' }}>{a.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--mw-gray)', fontFamily: 'var(--ff-mono)' }}>{a.age}歳</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px', color: 'var(--mw-lightgray)', fontFamily: 'var(--ff-jp)' }}>{a.job}</td>
                <td style={{ padding: '16px' }}><span className={"status-pill " + a.status}>{a.label}</span></td>
                <td style={{ padding: '16px', color: 'var(--mw-red)', letterSpacing: 2 }}>{'★'.repeat(a.stars)}{'☆'.repeat(5 - a.stars)}</td>
                <td style={{ padding: '16px', fontFamily: 'var(--ff-mono)', color: 'var(--mw-gray)' }}>{a.date}</td>
                <td style={{ padding: '16px' }}>
                  <button className="btn-ghost btn-sm" onClick={e => { e.stopPropagation(); nav('SCR-021'); }}>詳細 →</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============ APPLICANT DETAIL (SCR-021) ============
function ApplicantDetail({ nav }) {
  return (
    <div style={{ padding: '32px 28px' }}>
      <div className="breadcrumb">応募者管理 / A&Rディレクター / 佐藤 陽翔</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, marginTop: 16 }}>
        <div>
          <div className="form-card" style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--mw-red)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 32, fontFamily: 'var(--ff-display)' }}>佐</div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 28, letterSpacing: '0.02em', color: 'var(--mw-white)' }}>佐藤 陽翔 <span style={{ fontSize: 14, color: 'var(--mw-gray)', fontFamily: 'var(--ff-mono)' }}>/ 28</span></h2>
                <div style={{ fontSize: 12, color: 'var(--mw-lightgray)', marginTop: 4, fontFamily: 'var(--ff-jp)' }}>haruto.sato@example.com · 090-1234-5678 · 東京都渋谷区</div>
                <div style={{ marginTop: 10, display: 'flex', gap: 4 }}>
                  {['ProTools', 'Logic Pro', 'A&R実務', 'ライブ制作'].map(s => <span key={s} className="tag">{s}</span>)}
                </div>
              </div>
            </div>
          </div>

          <div className="form-card">
            <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase', marginBottom: 12 }}>— 志望動機</h3>
            <p style={{ fontSize: 13, lineHeight: 1.9, color: 'var(--mw-lightgray)', fontFamily: 'var(--ff-jp)' }}>
              rockin'on が手がけるフェスに学生時代から足を運び、音楽業界に入りたいという想いを強く持ってきました。
              現職のレーベルで5年間、新人アーティストのA&Rを担当し、2組のデビューをサポートしてまいりました。
              rockin'on のメディア力とフェス制作力を活かした、よりスケールの大きなアーティスト育成に挑戦したいと考えています。
            </p>
          </div>

          <div className="form-card" style={{ marginTop: 12 }}>
            <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase', marginBottom: 12 }}>— 職務経歴</h3>
            {[
              { y: '2021 - Present', co: 'Blue Record Label', role: 'A&R Staff' },
              { y: '2019 - 2021', co: 'Sound Studio Tokyo', role: 'Assistant Producer' },
              { y: '2019', co: '大学卒業 (音楽学部)', role: '' },
            ].map((w, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 16, padding: '12px 0', borderBottom: i < 2 ? '0.5px solid var(--mw-border)' : 'none' }}>
                <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 11, color: 'var(--mw-red-light)' }}>{w.y}</div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--mw-white)', fontFamily: 'var(--ff-jp)' }}>{w.co}</div>
                  {w.role && <div style={{ fontSize: 12, color: 'var(--mw-lightgray)', marginTop: 2 }}>{w.role}</div>}
                </div>
              </div>
            ))}
          </div>

          <div className="form-card" style={{ marginTop: 12 }}>
            <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase', marginBottom: 12 }}>— 応募書類</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              {['履歴書_佐藤陽翔.pdf', '職務経歴書_佐藤陽翔.pdf'].map(f => (
                <div key={f} style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontFamily: 'var(--ff-mono)' }}>
                  📄 {f} <span style={{ color: 'var(--mw-red-light)', marginLeft: 6 }}>↓</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="apply-box">
            <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mw-red)', fontWeight: 700, marginBottom: 12 }}>— Status</div>
            <select className="mw-input" defaultValue="review" style={{ marginBottom: 10 }}>
              <option value="new">新規</option>
              <option value="review">書類選考中</option>
              <option value="interview">面接</option>
              <option value="offer">内定</option>
              <option value="reject">不合格</option>
            </select>
            <div className="field-group">
              <label className="label">評価</label>
              <div style={{ display: 'flex', gap: 4, fontSize: 24 }}>
                {[1, 2, 3, 4, 5].map(s => <span key={s} style={{ color: s <= 4 ? 'var(--mw-red)' : 'rgba(255,255,255,0.2)', cursor: 'pointer' }}>★</span>)}
              </div>
            </div>
            <div className="field-group">
              <label className="label">社内メモ</label>
              <textarea className="mw-textarea" rows="4" defaultValue="志望動機が明確。A&R経験も十分。1次面接に進めて良さそう。" />
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 8 }}>次のステップへ ↗</button>
            <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>メッセージを送る</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ ANALYTICS (SCR-022) ============
function AnalyticsPage({ nav }) {
  return (
    <div style={{ padding: '32px 28px' }}>
      <div className="eyebrow">Analytics</div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 44, margin: '4px 0 24px', fontWeight: 400, letterSpacing: '0.02em' }}>ANALYTICS</h1>

      <div className="stat-row">
        <div className="stat-card"><div className="k">総閲覧</div><div className="v">12,842</div><div className="delta">+18% MoM</div></div>
        <div className="stat-card"><div className="k">応募数</div><div className="v">128</div><div className="delta">+24% MoM</div></div>
        <div className="stat-card"><div className="k">応募率</div><div className="v">0.99<span style={{ fontSize: 18, color: 'var(--mw-gray)', fontFamily: 'var(--ff-sans)' }}>%</span></div><div className="delta">業界平均 0.62%</div></div>
        <div className="stat-card"><div className="k">内定数</div><div className="v">4</div><div className="delta">過去90日</div></div>
      </div>

      <div className="form-card" style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
          <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase' }}>— Monthly Trend</h3>
          <div style={{ display: 'flex', gap: 16, fontSize: 11 }}>
            <span style={{ color: 'var(--mw-red)' }}>● 閲覧数</span>
            <span style={{ color: 'var(--mw-red-light)' }}>● 応募数</span>
          </div>
        </div>
        <MiniChart values={[520, 680, 750, 890, 820, 1200, 1400, 1380, 1650, 1580, 1840, 2100]} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--mw-gray)', fontFamily: 'var(--ff-mono)', marginTop: 6 }}>
          <span>MAY</span><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span><span>OCT</span><span>NOV</span><span>DEC</span><span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>
        <div className="form-card">
          <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase', marginBottom: 14 }}>— Traffic Sources</h3>
          {[
            ['Direct', 42], ['検索 (Organic)', 28], ['rockin\'on 媒体', 18], ['SNS', 8], ['その他', 4]
          ].map(([src, pct]) => (
            <div key={src} style={{ padding: '8px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <span style={{ color: 'var(--mw-white)', fontFamily: 'var(--ff-jp)' }}>{src}</span>
                <span style={{ color: 'var(--mw-red-light)', fontFamily: 'var(--ff-mono)' }}>{pct}%</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginTop: 6, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'var(--mw-red)', width: pct + '%' }} />
              </div>
            </div>
          ))}
        </div>

        <div className="form-card">
          <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase', marginBottom: 14 }}>— Applicant Demographics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <div style={{ fontSize: 10, color: 'var(--mw-gray)', marginBottom: 8, fontFamily: 'var(--ff-mono)' }}>AGE</div>
              {[['20代', 32], ['30代', 48], ['40代', 16], ['50代+', 4]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 12 }}>
                  <span style={{ fontFamily: 'var(--ff-jp)', color: 'var(--mw-lightgray)' }}>{k}</span>
                  <span style={{ fontFamily: 'var(--ff-mono)', color: 'var(--mw-red-light)' }}>{v}%</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--mw-gray)', marginBottom: 8, fontFamily: 'var(--ff-mono)' }}>EXPERIENCE</div>
              {[['1〜3年', 22], ['3〜5年', 38], ['5〜10年', 28], ['10年+', 12]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 12 }}>
                  <span style={{ fontFamily: 'var(--ff-jp)', color: 'var(--mw-lightgray)' }}>{k}</span>
                  <span style={{ fontFamily: 'var(--ff-mono)', color: 'var(--mw-red-light)' }}>{v}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ ADMIN OVERVIEW (SCR-028) ============
function AdminOverview({ nav }) {
  return (
    <div style={{ padding: '32px 28px' }}>
      <div className="eyebrow">System Admin</div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 44, margin: '4px 0 6px', fontWeight: 400, letterSpacing: '0.02em' }}>OVERVIEW</h1>
      <p className="h-sub">Discovery Platform · 2026.04.20 10:14 JST</p>

      <div className="stat-row" style={{ marginTop: 24 }}>
        <div className="stat-card"><div className="k">Active Jobs</div><div className="v">1,284</div><div className="delta">+42 this week</div></div>
        <div className="stat-card"><div className="k">Partner Companies</div><div className="v">312</div><div className="delta">+6 this month</div></div>
        <div className="stat-card"><div className="k">Registered Members</div><div className="v">48,291</div><div className="delta">+1,204 MoM</div></div>
        <div className="stat-card"><div className="k">Pending Reviews</div><div className="v">7</div><div className="delta down">要対応</div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14, marginTop: 20 }}>
        <div className="form-card">
          <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase', marginBottom: 14 }}>— Platform Activity (14D)</h3>
          <MiniChart values={[820, 950, 1020, 880, 1120, 1350, 1280, 1420, 1580, 1480, 1620, 1750, 1680, 1920]} />
        </div>
        <div className="form-card">
          <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase', marginBottom: 14 }}>— System Status</h3>
          {[
            ['API Server', 'operational'], ['Database', 'operational'], ['Search Index', 'operational'], ['Email Service', 'degraded'], ['Payment Gateway', 'operational']
          ].map(([s, st]) => (
            <div key={s} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '0.5px solid var(--mw-border)', fontSize: 12 }}>
              <span style={{ color: 'var(--mw-white)', fontFamily: 'var(--ff-jp)' }}>{s}</span>
              <span style={{ color: st === 'operational' ? '#8FD38A' : '#E8B658', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--ff-mono)', fontSize: 11, textTransform: 'uppercase' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />{st}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="form-card" style={{ marginTop: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase' }}>— Pending Review Queue</h3>
          <button className="btn-ghost btn-sm" onClick={() => nav('SCR-029')}>全て見る →</button>
        </div>
        {[
          { co: 'Grain Pictures', job: 'MVディレクター', date: '2026.04.20 08:32', type: '新規求人' },
          { co: 'Night Owl Fest', job: 'フェスブッキング担当', date: '2026.04.19 16:44', type: '編集' },
          { co: '株式会社 Rhythm Mgmt', job: '—', date: '2026.04.19 11:20', type: '新規企業登録' },
        ].map((p, i) => (
          <div key={i} className="history-row" style={{ borderBottom: '0.5px solid var(--mw-border)' }} onClick={() => nav('SCR-029')}>
            <div className="co-logo">{p.co[0]}</div>
            <div>
              <h4>{p.job !== '—' ? p.job : p.co}</h4>
              <div className="sub">{p.co} · {p.type}</div>
            </div>
            <div><span className="status-pill review">審査待</span></div>
            <div className="date">{p.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ ADMIN REVIEW (SCR-029) ============
function AdminReview({ nav }) {
  return (
    <div style={{ padding: '32px 28px' }}>
      <div className="eyebrow">Content Review</div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 44, margin: '4px 0 24px', fontWeight: 400, letterSpacing: '0.02em' }}>求人審査</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }}>
        <div className="form-card">
          <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center' }}>
            <div style={{ width: 44, height: 44, background: 'rgba(207,48,21,0.2)', color: 'var(--mw-red)', borderRadius: 8, display: 'grid', placeItems: 'center', fontWeight: 700, fontFamily: 'var(--ff-display)' }}>G</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--ff-display)', fontSize: 22, letterSpacing: '0.02em' }}>MVディレクター / 音楽映像制作</div>
              <div style={{ fontSize: 11, color: 'var(--mw-gray)', fontFamily: 'var(--ff-mono)' }}>SCR-0129 · Grain Pictures · 提出 2026.04.20 08:32</div>
            </div>
            <span className="status-pill review">審査待</span>
          </div>

          <div className="detail-meta-grid">
            <div className="cell"><div className="k">Category</div><div className="v">映像・MV制作</div></div>
            <div className="cell"><div className="k">Employment</div><div className="v">業務委託</div></div>
            <div className="cell"><div className="k">Location</div><div className="v">東京・渋谷</div></div>
            <div className="cell"><div className="k">Salary</div><div className="v">400〜650万円</div></div>
          </div>

          <h4 style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--mw-red)', textTransform: 'uppercase', margin: '20px 0 10px' }}>— Overview</h4>
          <p style={{ fontSize: 13, color: 'var(--mw-lightgray)', lineHeight: 1.9, fontFamily: 'var(--ff-jp)' }}>
            邦楽アーティストのMV制作を中心に、ライブ映像、ドキュメンタリー映像の企画・演出・撮影・編集まで一貫して担当いただきます...
          </p>

          <div style={{ marginTop: 24, padding: 14, background: 'rgba(207,48,21,0.08)', border: '0.5px solid rgba(207,48,21,0.3)', borderRadius: 8 }}>
            <div style={{ fontSize: 11, color: 'var(--mw-red-light)', marginBottom: 6, fontWeight: 700 }}>⚠ Auto-Check: 2 issues</div>
            <ul style={{ paddingLeft: 18, fontSize: 12, color: 'var(--mw-lightgray)', lineHeight: 1.8, fontFamily: 'var(--ff-jp)' }}>
              <li>年収レンジが業界平均から外れています（下限が低め）</li>
              <li>歓迎要件が未記入です</li>
            </ul>
          </div>
        </div>

        <div>
          <div className="apply-box">
            <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mw-red)', fontWeight: 700, marginBottom: 14 }}>— Decision</div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 8, background: '#4A9F3E', borderColor: '#4A9F3E' }}>✓ 承認して公開</button>
            <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', marginBottom: 8 }}>修正依頼</button>
            <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center', color: '#E86858' }}>却下</button>

            <div className="field-group" style={{ marginTop: 16 }}>
              <label className="label">審査コメント</label>
              <textarea className="mw-textarea" rows="5" placeholder="企業担当者に送られるコメントを記入..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ ADMIN COMPANIES (SCR-030) ============
function AdminCompanies({ nav }) {
  return (
    <div style={{ padding: '32px 28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div className="eyebrow">Company Management</div>
          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 44, margin: '4px 0', fontWeight: 400, letterSpacing: '0.02em' }}>掲載企業管理</h1>
        </div>
        <button className="btn-primary">＋ 企業を追加</button>
      </div>

      <div className="form-card" style={{ padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '0.5px solid var(--mw-border)', background: 'rgba(255,255,255,0.02)' }}>
              {['COMPANY', 'PLAN', 'JOBS', 'TOTAL SPEND', 'STATUS', 'JOINED'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 10, letterSpacing: '0.14em', color: 'var(--mw-gray)', fontWeight: 700, fontFamily: 'var(--ff-mono)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { co: 'rockin\'on inc.', plan: 'ENTERPRISE', jobs: 5, spend: '¥2,400,000', st: 'active', joined: '2024.03' },
              { co: 'Sound Stage Tokyo', plan: 'STANDARD', jobs: 3, spend: '¥450,000', st: 'active', joined: '2025.02' },
              { co: 'Grain Pictures', plan: 'BASIC', jobs: 1, spend: '¥50,000', st: 'review', joined: '2026.04' },
              { co: 'Night Owl Fest', plan: 'STANDARD', jobs: 2, spend: '¥300,000', st: 'active', joined: '2025.08' },
              { co: 'Blue Record Label', plan: 'STANDARD', jobs: 4, spend: '¥600,000', st: 'active', joined: '2025.01' },
              { co: 'Rhythm Management', plan: '—', jobs: 0, spend: '—', st: 'pending', joined: '2026.04' },
            ].map((c, i) => (
              <tr key={i} style={{ borderBottom: '0.5px solid var(--mw-border)' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 6, background: 'var(--mw-red)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontFamily: 'var(--ff-display)' }}>{c.co[0]}</div>
                    <div style={{ fontWeight: 700, color: 'var(--mw-white)', fontFamily: 'var(--ff-jp)' }}>{c.co}</div>
                  </div>
                </td>
                <td style={{ padding: '16px' }}><span className="badge badge-white">{c.plan}</span></td>
                <td style={{ padding: '16px', fontFamily: 'var(--ff-mono)', color: 'var(--mw-lightgray)' }}>{c.jobs}</td>
                <td style={{ padding: '16px', fontFamily: 'var(--ff-mono)', color: 'var(--mw-red-light)' }}>{c.spend}</td>
                <td style={{ padding: '16px' }}>
                  <span className={"status-pill " + (c.st === 'active' ? 'new' : c.st === 'review' ? 'review' : 'interview')}>
                    {c.st === 'active' ? '稼働中' : c.st === 'review' ? '審査中' : '承認待'}
                  </span>
                </td>
                <td style={{ padding: '16px', fontFamily: 'var(--ff-mono)', color: 'var(--mw-gray)' }}>{c.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============ ADMIN MEMBERS (SCR-031) ============
function AdminMembers({ nav }) {
  return (
    <div style={{ padding: '32px 28px' }}>
      <div className="eyebrow">Member Management</div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 44, margin: '4px 0 24px', fontWeight: 400, letterSpacing: '0.02em' }}>会員管理</h1>

      <div className="stat-row">
        <div className="stat-card"><div className="k">総会員数</div><div className="v">48,291</div><div className="delta">+1,204 MoM</div></div>
        <div className="stat-card"><div className="k">アクティブ (30d)</div><div className="v">12,482</div><div className="delta">+8%</div></div>
        <div className="stat-card"><div className="k">今月の応募</div><div className="v">3,482</div><div className="delta">+24% MoM</div></div>
        <div className="stat-card"><div className="k">凍結中アカウント</div><div className="v">12</div><div className="delta">要確認 3</div></div>
      </div>

      <div style={{ display: 'flex', gap: 8, margin: '20px 0', alignItems: 'center' }}>
        <input className="mw-input" placeholder="メール・ID・氏名で検索" style={{ flex: 1, maxWidth: 400 }} />
        <select className="mw-input" style={{ width: 180 }}>
          <option>全ステータス</option><option>アクティブ</option><option>休眠</option><option>凍結</option>
        </select>
        <button className="btn-ghost">CSV Export ↓</button>
      </div>

      <div className="form-card" style={{ padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '0.5px solid var(--mw-border)', background: 'rgba(255,255,255,0.02)' }}>
              {['MEMBER', 'EMAIL', 'APPLIES', 'LAST ACTIVE', 'STATUS', 'JOINED'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 10, letterSpacing: '0.14em', color: 'var(--mw-gray)', fontWeight: 700, fontFamily: 'var(--ff-mono)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { name: '佐藤 陽翔', em: 'haruto.sato@example.com', a: 3, la: '2026.04.20', st: 'active', j: '2025.11' },
              { name: '田中 美咲', em: 'misaki.t@example.com', a: 8, la: '2026.04.19', st: 'active', j: '2025.06' },
              { name: '鈴木 湊', em: 'minato.s@example.com', a: 5, la: '2026.04.18', st: 'active', j: '2024.12' },
              { name: 'Kyle Parker', em: 'kyle.p@example.com', a: 2, la: '2026.04.17', st: 'active', j: '2026.02' },
              { name: '山田 楓', em: 'kaede.y@example.com', a: 12, la: '2026.04.10', st: 'active', j: '2024.08' },
              { name: '(freezed) user_01482', em: 'u01482@example.com', a: 0, la: '2026.02.02', st: 'frozen', j: '2026.01' },
            ].map((u, i) => (
              <tr key={i} style={{ borderBottom: '0.5px solid var(--mw-border)' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: u.st === 'frozen' ? 'rgba(255,255,255,0.15)' : 'var(--mw-red)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontFamily: 'var(--ff-display)' }}>{u.name[0]}</div>
                    <div style={{ fontWeight: 700, color: 'var(--mw-white)', fontFamily: 'var(--ff-jp)' }}>{u.name}</div>
                  </div>
                </td>
                <td style={{ padding: '16px', fontFamily: 'var(--ff-mono)', fontSize: 11, color: 'var(--mw-lightgray)' }}>{u.em}</td>
                <td style={{ padding: '16px', fontFamily: 'var(--ff-mono)', color: 'var(--mw-red-light)' }}>{u.a}</td>
                <td style={{ padding: '16px', fontFamily: 'var(--ff-mono)', color: 'var(--mw-gray)', fontSize: 11 }}>{u.la}</td>
                <td style={{ padding: '16px' }}>
                  <span className={"status-pill " + (u.st === 'active' ? 'new' : 'reject')}>
                    {u.st === 'active' ? 'アクティブ' : '凍結'}
                  </span>
                </td>
                <td style={{ padding: '16px', fontFamily: 'var(--ff-mono)', color: 'var(--mw-gray)', fontSize: 11 }}>{u.j}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Object.assign(window, { CompanyDashboard, JobMgmtList, JobEditor, ApplicantList, ApplicantDetail, AnalyticsPage, AdminOverview, AdminReview, AdminCompanies, AdminMembers });
