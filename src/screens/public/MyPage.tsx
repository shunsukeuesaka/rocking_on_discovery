import { useState } from 'react'
import type { Nav } from '../../types'
import { JOBS } from '../../data/mwData'
import { JobCard } from '../../components/JobCard'

// ============ MY PAGE ============
export function MyPage({ nav }: { nav: Nav }) {
  const [tab, setTab] = useState('history')
  return (
    <div className="mypage">
      <div className="mypage-header">
        <div className="avatar">H</div>
        <div>
          <h1>佐藤 陽翔</h1>
          <div className="sub">MEMBER SINCE 2025.11 · HARUTO.SATO@EXAMPLE.COM</div>
        </div>
        <button className="btn-ghost">プロフィール編集</button>
      </div>

      <div className="stat-row">
        <div className="stat-card"><div className="k">応募した求人</div><div className="v">3</div><div className="delta">掲載終了 1 件を含む</div></div>
        <div className="stat-card"><div className="k">お気に入り</div><div className="v">12</div><div className="delta">+3 this week</div></div>
        <div className="stat-card"><div className="k">閲覧履歴</div><div className="v">48</div><div className="delta">過去30日</div></div>
        <div className="stat-card"><div className="k">プロフィール完成度</div><div className="v">82<span style={{ fontSize: 16, color: 'var(--mw-gray)', fontFamily: 'var(--ff-sans)' }}>%</span></div><div className="delta down">書類UPで完成</div></div>
      </div>

      <div className="tabs">
        {['history', 'favorites', 'profile', 'notify'].map((t) =>
        <div key={t} className={"tab" + (tab === t ? " active" : "")} onClick={() => setTab(t)}>
            {{ history: '応募履歴', favorites: 'お気に入り', profile: 'プロフィール', notify: '通知設定' }[t]}
          </div>
        )}
      </div>

      {tab === 'history' &&
      <div>
          <div className="history-note">応募状況の進捗（書類選考・面接など）はマイページでは管理していません。選考のご連絡は企業から直接届きます。掲載終了後も応募・お気に入りした求人はここから確認できます。</div>
          {[
        { co: 'R', coName: 'rockin\'on inc.', title: 'A&Rディレクター', status: 'active', label: '応募済み', date: '2026.04.12' },
        { co: 'S', coName: 'Sound Stage Tokyo', title: 'ライブプロダクション マネージャー', status: 'active', label: '応募済み', date: '2026.04.10' },
        { co: 'N', coName: 'Night Owl Fest', title: 'フェスブッキング担当', status: 'closed', label: '掲載終了', date: '2026.03.28' }].
        map((h, i) =>
        <div key={i} className="history-row">
              <div className="co-logo">{h.co}</div>
              <div>
                <h4>{h.title}</h4>
                <div className="sub">{h.coName}</div>
              </div>
              <div><span className={"status-pill " + h.status}>{h.label}</span></div>
              <div className="date">{h.date}</div>
            </div>
        )}
        </div>
      }

      {tab === 'favorites' &&
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {JOBS.slice(0, 6).map((j) => <JobCard key={j.id} job={{ ...j, fav: true }} nav={nav} />)}
        </div>
      }

      {tab === 'profile' &&
      <div className="form-card" style={{ maxWidth: 720 }}>
          <div className="form-row">
            <div className="field-group"><label className="label">氏名</label><input className="mw-input" defaultValue="佐藤 陽翔" /></div>
            <div className="field-group"><label className="label">年齢</label><input className="mw-input" defaultValue="28" /></div>
          </div>
          <div className="field-group"><label className="label">希望職種</label><input className="mw-input" defaultValue="A&R・プロデュース" /></div>
          <div className="field-group"><label className="label">希望勤務地</label><input className="mw-input" defaultValue="東京・リモート可" /></div>
          <div className="field-group"><label className="label">スキル</label>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['ProTools', 'Logic Pro', 'Ableton', 'A&R実務', 'ライブ制作', 'プロジェクト管理'].map((s) => <span key={s} className="tag">{s} ×</span>)}
              <span className="tag" style={{ borderStyle: 'dashed' }}>+ 追加</span>
            </div>
          </div>
          <div className="field-group"><label className="label">自己紹介</label>
            <textarea className="mw-textarea" rows={4} defaultValue="大学時代からレーベル立ち上げに関わり..." />
          </div>
          <button className="btn-primary">変更を保存 ↗</button>
        </div>
      }

      {tab === 'notify' &&
      <div className="form-card" style={{ maxWidth: 560 }}>
          {[
        ['新着求人のお知らせ', '希望条件にマッチする新着求人を週1回お届け'],
        ['お気に入り求人の期限リマインド', '保存した求人の応募締切が近づいたときに通知'],
        ['フォロー中企業の新着求人', 'フォローした企業が新しい求人を掲載したとき'],
        ['おすすめ求人通知', 'あなたに合った求人レコメンドを月1回お届け']].
        map(([t, s], i) =>
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '0.5px solid var(--mw-border)' }}>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--mw-white)', fontSize: 13 }}>{t}</div>
                <div style={{ fontSize: 11, color: 'var(--mw-gray)', marginTop: 2 }}>{s}</div>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: 40, height: 22 }}>
                <input type="checkbox" defaultChecked={i < 2} style={{ opacity: 0 }} />
                <span style={{ position: 'absolute', inset: 0, background: i < 2 ? 'var(--mw-red)' : 'rgba(255,255,255,0.12)', borderRadius: 11, cursor: 'pointer' }}>
                  <span style={{ position: 'absolute', top: 2, left: i < 2 ? 20 : 2, width: 18, height: 18, background: '#fff', borderRadius: '50%', transition: 'left .2s' }}></span>
                </span>
              </label>
            </div>
        )}
        </div>
      }
    </div>)

}
