import { useState } from 'react'
import type { Nav, Job } from '../../types'
import { JOBS } from '../../data/mwData'
import { Img } from '../../components/Img'

// ============ JOB DETAIL ============
export function JobDetail({ nav, job }: { nav: Nav; job?: Job }) {
  const j = job || JOBS[0]
  const [fav, setFav] = useState(j.fav)
  return (
    <div className="detail">
      <div>
        <div className="breadcrumb">HOME / 求人一覧 / {j.cat} / {j.id}</div>
        <div className="flex-between flex-gap-sm" style={{ flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {j.new && <span className="badge badge-red">NEW</span>}
            <span className="badge badge-white">{j.emp}</span>
            <span className="badge badge-gray">{j.cat}</span>
          </div>
        </div>
        <h1>{j.title}</h1>

        <div className="revision-note">
          <span className="ico">●</span>
          <span>2026.05.10 — 給与・募集要項の一部を修正しました</span>
        </div>

        <div className="co-strip">
          <div className="logo">{j.coLogo}</div>
          <div style={{ flex: 1 }}>
            <div className="co-name">{j.co}</div>
            <div className="co-sub">音楽メディア事業 · 設立 1972 · 従業員 280名</div>
          </div>
          <button className="btn-ghost btn-sm" onClick={() => nav('SCR-009')}>企業詳細 →</button>
        </div>

        <div className="job-detail-visual" onClick={(e) => e.stopPropagation()}>
          <Img src={j.img} alt="求人のキービジュアル（後で差し替え）" seed={j.img} style={{ display: 'block', width: '100%', height: '100%' }} />
        </div>

        <section>
          <h3>概要</h3>
          <p>{j.desc} 既存アーティストの作品制作と並行し、新人発掘からデビューまでを一貫して担当いただくポジションです。</p>
        </section>

        <section>
          <h3>募集要項</h3>
          <div className="detail-meta-grid">
            <div className="cell"><div className="k">職種カテゴリ</div><div className="v">{j.cat}</div></div>
            <div className="cell"><div className="k">雇用形態</div><div className="v">{j.emp}</div></div>
            <div className="cell"><div className="k">勤務地</div><div className="v">{j.loc}</div></div>
            <div className="cell"><div className="k">給与</div><div className="v">{j.salary}</div></div>
            <div className="cell"><div className="k">掲載日</div><div className="v">{j.posted}</div></div>
            <div className="cell"><div className="k">応募締切</div><div className="v">2026.05.31</div></div>
          </div>
        </section>

        <section>
          <h3>仕事内容</h3>
          <ul>
            <li>新人アーティストの発掘・契約交渉</li>
            <li>作品制作全般のプロデュース（ディレクション・進行管理・予算管理）</li>
            <li>プロモーション戦略の立案と実行、レーベル内外のチームとの連携</li>
            <li>ライブ・フェス出演の企画提案</li>
          </ul>
        </section>

        <section>
          <h3>応募要件</h3>
          <ul>
            <li>音楽業界での制作・A&R実務経験 3年以上</li>
            <li>レーベル・マネジメント会社・制作プロダクションでの実務経験</li>
            <li>アーティスト・クリエイターとの信頼関係を築けるコミュニケーション能力</li>
          </ul>
          <h3 style={{ marginTop: 24 }}>歓迎要件</h3>
          <ul>
            <li>海外レーベル・アーティストとのネットワーク</li>
            <li>ライブ制作・フェスティバル運営経験</li>
          </ul>
        </section>

        <section>
          <h3>この企業の他の求人</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {(() => {
              const same = JOBS.filter((x) => x.co === j.co && x.id !== j.id)
              const list = same.length ? same : JOBS.filter((x) => x.id !== j.id).slice(0, 2)
              return list.slice(0, 2).map((jj) =>
              <div key={jj.id} className="same-co-card" onClick={() => nav('SCR-003', { job: jj })}>
                  <div className="meta">{jj.cat} · {jj.emp}</div>
                  <h3>{jj.title}</h3>
                  <div className="salary">{jj.salary}</div>
                </div>
              )
            })()}
          </div>
          <div className="same-co-note">※ 同一企業が掲載している他の求人を表示しています</div>
        </section>
      </div>

      <aside className="apply-rail">
        <div className="apply-box">
          <div className="salary-sub">想定年収</div>
          <div className="salary-big">{j.salary}</div>
          <div className="salary-sub" style={{ marginTop: 18 }}>— 勤務地</div>
          <div style={{ color: 'var(--mw-white)', fontWeight: 700, marginBottom: 20 }}>{j.loc}</div>
          {j.applyType === 'external' ?
          <>
              <button className="btn-primary" onClick={() => nav('SCR-004', { job: j })}>応募ページへ（外部サイト）↗</button>
              <div className="apply-ext-note">この求人は企業の採用サイトで受け付けています</div>
            </> :

          <button className="btn-primary" onClick={() => nav('SCR-004', { job: j })}>この求人に応募する ↗</button>
          }
          <button className="btn-secondary" onClick={() => setFav(!fav)}>
            {fav ? '♥ お気に入り登録済' : '♡ お気に入りに追加'}
          </button>
        </div>

        <div className="apply-box" style={{ marginTop: 12 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mw-red)', fontWeight: 700, marginBottom: 10 }}>— 企業について</div>
          <div style={{ fontWeight: 700, marginBottom: 4, color: 'var(--mw-white)' }}>{j.co}</div>
          <p style={{ fontSize: 12, color: 'var(--mw-lightgray)', lineHeight: 1.7, fontFamily: 'var(--ff-jp)' }}>
            1972年創業の総合音楽メディア。雑誌「ROCKIN'ON」「音楽と人」「JAPAN」を発行、フェス運営も手がける。
          </p>
          <button className="btn-ghost btn-sm mt-2" onClick={() => nav('SCR-009')}>企業ページへ →</button>
        </div>
      </aside>
    </div>)

}
