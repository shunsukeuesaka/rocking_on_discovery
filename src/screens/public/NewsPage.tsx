import type { Nav } from '../../types';

// ============ SIMPLE GENERIC (News / Static) ============
export function NewsPage({ nav }: { nav: Nav }) {
  void nav // static page; nav kept for a uniform screen signature
  return (
    <div style={{ padding: '32px 28px', maxWidth: 900 }}>
      <div className="eyebrow">Notice</div>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 48, margin: '4px 0 24px', fontWeight: 400, letterSpacing: '0.02em' }}>お知らせ</h1>
      {[
        { date: '2026.04.19', label: 'アップデート', title: '職種カテゴリに「サウンドデザイナー」を追加しました' },
        { date: '2026.04.15', label: 'メンテナンス', title: '4/22 深夜2:00-4:00 に定期メンテナンスを実施します' },
        { date: '2026.04.10', label: 'お知らせ', title: '応募フォームのファイル上限を10MBに拡大しました' },
        { date: '2026.03.28', label: 'キャンペーン', title: '企業向け春の掲載キャンペーン開始' },
      ].map((n, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 120px 1fr', gap: 20, padding: '18px 0', borderBottom: '0.5px solid var(--mw-border)', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 12, color: 'var(--mw-gray)' }}>{n.date}</div>
          <span className="badge badge-white" style={{ justifySelf: 'start' }}>{n.label}</span>
          <div style={{ color: 'var(--mw-white)', fontSize: 14, fontFamily: 'var(--ff-jp)' }}>{n.title}</div>
        </div>
      ))}
    </div>
  );
}
