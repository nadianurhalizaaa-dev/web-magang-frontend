import React, { useEffect, useState, useCallback } from 'react';
import { Calendar, MapPin, User, MessageSquare, ArrowLeft, Clock, Tag } from 'lucide-react';
import CommentForm from './CommentForm';
import { API_BASE_URL } from '../config/api';

function DetailAktivitas({ id = 1, onBack, onOpenAuth }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const fetchDetail = useCallback(() => {
    if (!id) return;
    setLoading(true);
    setImgFailed(false);
    fetch(`${API_BASE_URL || 'http://127.0.0.1:8000/api'}/aktivitas/${id}`, {
      headers: { 'Accept': 'application/json' }
    })
      .then(res => {
        if (!res.ok) throw new Error('Gagal memuat detail aktivitas');
        return res.json();
      })
      .then(result => {
        setData(result.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching detail aktivitas:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const getImageUrl = (foto) => {
    if (!foto) return null;
    if (foto.startsWith('http://') || foto.startsWith('https://')) return foto;
    const baseUrl = (API_BASE_URL || 'http://127.0.0.1:8000/api').replace(/\/api\/?$/, '');
    if (foto.startsWith('/')) return `${baseUrl}${foto}`;
    return `${baseUrl}/${foto}`;
  };

  if (loading) {
    return (
      <div className="detail-full-page shadow-card">
        <div className="aktivitas-loading">
          <div className="spinner"></div>
          <p>Memuat detail aktivitas magang...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="detail-full-page shadow-card">
        <div className="aktivitas-error">
          <p>⚠️ {error || 'Data aktivitas tidak ditemukan.'}</p>
          {onBack && (
            <button onClick={onBack} className="btn btn-secondary">
              <ArrowLeft size={16} /> Kembali ke Beranda
            </button>
          )}
        </div>
      </div>
    );
  }

  const imgUrl = getImageUrl(data.foto);

  return (
    <div className="detail-full-page shadow-card">
      {/* Top Header & Navigation */}
      <div className="detail-page-header">
        {onBack && (
          <button type="button" className="btn-back-link" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>Kembali ke Beranda & Aktivitas</span>
          </button>
        )}
      </div>

      {/* Hero Image Banner */}
      {imgUrl && !imgFailed && (
        <div className="detail-full-hero-img">
          <img
            src={imgUrl}
            alt={data.judul}
            onError={() => setImgFailed(true)}
          />
        </div>
      )}

      {/* Title & Metadata */}
      <div className="detail-title-section">
        {data.kategori && (
          <span className="detail-kategori-tag">
            <Tag size={13} />
            {data.kategori}
          </span>
        )}
        <h1 className="detail-page-title">{data.judul}</h1>

        <div className="detail-meta-pills">
          <span className="meta-pill author">
            <User size={15} />
            <span>Oleh: <strong>{data.user?.name || 'Admin'}</strong></span>
          </span>
          <span className="meta-pill date">
            <Calendar size={15} />
            <span>Tanggal: <strong>{data.tanggal}</strong></span>
          </span>
          {data.lokasi && (
            <span className="meta-pill location">
              <MapPin size={15} />
              <span>Lokasi: <strong>{data.lokasi}</strong></span>
            </span>
          )}
        </div>
      </div>

      {/* Description Content */}
      <div className="detail-description-section">
        <h3>Deskripsi Aktivitas</h3>
        <p className="detail-text-content">{data.deskripsi}</p>
      </div>

      <hr className="detail-divider" />

      {/* Comments Section */}
      <div className="detail-comments-section">
        <div className="comments-title-bar">
          <MessageSquare size={22} className="icon-primary" />
          <h3>Komentar Pengguna ({data.komentar?.length || 0})</h3>
        </div>

        <div className="comment-form-wrapper">
          <CommentForm
            aktivitasId={data.id}
            onCommentAdded={fetchDetail}
            onOpenAuth={onOpenAuth}
          />
        </div>

        <div className="comments-list-wrapper">
          {(!data.komentar || data.komentar.length === 0) ? (
            <p className="no-comments-text">Belum ada komentar pada aktivitas ini. Jadilah yang pertama memberikan masukan!</p>
          ) : (
            data.komentar.map(k => (
              <div key={k.id} className="comment-item-card">
                <div className="comment-avatar">
                  {k.user?.name ? k.user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="comment-body">
                  <div className="comment-header">
                    <strong className="comment-author">{k.user?.name || 'Pengguna'}</strong>
                    {k.created_at && (
                      <span className="comment-date">
                        <Clock size={12} />
                        {new Date(k.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    )}
                  </div>
                  <p className="comment-text">{k.komentar}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailAktivitas;
