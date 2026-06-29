import { useState } from 'react';
import type { Nav } from '../../types';

export function StaticPage({ nav }: { nav: Nav }) {
  void nav // static page; nav kept for a uniform screen signature
  const [tab, setTab] = useState('faq');
  const [who, setWho] = useState('user');
  const tabs: [string, string][] = [['terms', '利用規約'], ['privacy', 'プライバシー'], ['faq', 'FAQ'], ['contact', 'お問い合わせ']];
  return (
    <div style={{ padding: '32px 28px', maxWidth: 900 }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
        {tabs.map(([key, label]) => (
          <button key={key} className={tab === key ? "jobmgmt-tab active" : "jobmgmt-tab"} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      {tab === 'faq' && (
        <div>
          <div className="eyebrow">FAQ</div>
          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 48, margin: '4px 0 24px', fontWeight: 400, letterSpacing: '0.02em' }}>よくある質問</h1>
          {[
            ['登録は無料ですか？', '会員登録・利用はすべて無料です。求職者の方は一切費用はかかりません。'],
            ['非公開で応募できますか？', '現職の企業に応募情報が伝わることはありません。企業側には応募時にのみ情報が開示されます。'],
            ['海外からの応募は可能ですか？', 'リモート可の求人については海外からのご応募も受け付けています。'],
            ['プロフィール情報は安全に管理されますか？', 'SSL暗号化通信、アクセス制限、定期的なセキュリティ監査を実施しています。'],
          ].map(([q, a], i) => (
            <div key={i} className="form-card" style={{ marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--mw-white)', marginBottom: 8 }}>Q. {q}</div>
              <div style={{ fontSize: 13, color: 'var(--mw-lightgray)', fontFamily: 'var(--ff-jp)', lineHeight: 1.8 }}>A. {a}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'contact' && (
        <div>
          <div className="eyebrow">Contact</div>
          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 48, margin: '4px 0 8px', fontWeight: 400, letterSpacing: '0.02em' }}>お問い合わせ</h1>
          <p className="h-sub" style={{ marginBottom: 20 }}>お問い合わせの種別を選択してください。企業の方とユーザーの方でフォームが分かれています。</p>

          <div className="contact-switch">
            <button className={who === 'user' ? 'active' : ''} onClick={() => setWho('user')}>ユーザーの方</button>
            <button className={who === 'company' ? 'active' : ''} onClick={() => setWho('company')}>企業の方</button>
          </div>

          {who === 'user' ? (
            <div className="form-card" style={{ marginTop: 16 }}>
              <div className="contact-lead">求人・応募・会員登録など、サービスのご利用に関するお問い合わせ</div>
              <div className="form-row">
                <div className="field-group req"><label className="label">お名前</label><input className="mw-input" /></div>
                <div className="field-group req"><label className="label">メールアドレス</label><input className="mw-input" type="email" /></div>
              </div>
              <div className="field-group"><label className="label">お問い合わせ種別</label>
                <select className="mw-input"><option>応募・選考について</option><option>会員登録・ログイン</option><option>退会について</option><option>その他</option></select>
              </div>
              <div className="field-group req"><label className="label">お問い合わせ内容</label><textarea className="mw-textarea" rows={5}></textarea></div>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>送信する ↗</button>
            </div>
          ) : (
            <div className="form-card" style={{ marginTop: 16 }}>
              <div className="contact-lead">求人掲載・プラン・お見積りなど、掲載をご検討の企業さま向け</div>
              <div className="form-row">
                <div className="field-group req"><label className="label">会社名</label><input className="mw-input" /></div>
                <div className="field-group req"><label className="label">ご担当者名</label><input className="mw-input" /></div>
              </div>
              <div className="form-row">
                <div className="field-group req"><label className="label">メールアドレス</label><input className="mw-input" type="email" /></div>
                <div className="field-group"><label className="label">電話番号</label><input className="mw-input" type="tel" /></div>
              </div>
              <div className="field-group"><label className="label">お問い合わせ種別</label>
                <select className="mw-input"><option>掲載プラン・お見積り</option><option>掲載の流れについて</option><option>請求・契約について</option><option>その他</option></select>
              </div>
              <div className="field-group req"><label className="label">お問い合わせ内容</label><textarea className="mw-textarea" rows={5}></textarea></div>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>送信する ↗</button>
            </div>
          )}
        </div>
      )}

      {(tab === 'terms' || tab === 'privacy') && (
        <div>
          <div className="eyebrow">{tab === 'terms' ? 'Terms' : 'Privacy'}</div>
          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 48, margin: '4px 0 24px', fontWeight: 400, letterSpacing: '0.02em' }}>{tab === 'terms' ? '利用規約' : 'プライバシーポリシー'}</h1>
          <div className="form-card">
            <p style={{ fontSize: 13, color: 'var(--mw-lightgray)', fontFamily: 'var(--ff-jp)', lineHeight: 1.9 }}>
              {tab === 'terms'
                ? '本規約は、Discovery（presented by rockin\'on）が提供するサービスの利用条件を定めるものです。会員は本規約に同意のうえサービスを利用するものとします。（本文はプレースホルダーです）'
                : '当社は、取得した個人情報を法令およびプライバシーポリシーに従って適切に管理します。会員管理画面へのアクセスは限定された環境からのみ許可されます。（本文はプレースホルダーです）'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
