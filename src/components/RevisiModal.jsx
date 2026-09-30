import React, { useState } from 'react';

export default function RevisiModal({ isOpen, onClose, laporan, onSubmit }) {
  const [linkDoc, setLinkDoc] = useState('');

  if (!isOpen || !laporan) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!linkDoc) return;

    onSubmit(laporan.id_laporan, {
      link_google_doc: linkDoc
    });

    setLinkDoc('');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Mengunggah Ulang / Revisi Laporan (UC-04)</h3>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div style={{ padding: '0.85rem', backgroundColor: '#fff1f2', borderRadius: '8px', marginBottom: '1.25rem', border: '1px solid #fecdd3' }}>
              <div style={{ fontSize: '0.78rem', color: '#be123c', fontWeight: 700 }}>Catatan Revisi dari Pembimbing:</div>
              <div style={{ fontSize: '0.88rem', color: '#881337', marginTop: '0.25rem' }}>
                {laporan.catatan_revisi || 'Belum ada catatan detail.'}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Link Google Doc Berkas Perbaikan *</label>
              <input 
                type="url" 
                className="form-control" 
                placeholder="https://docs.google.com/document/d/..."
                value={linkDoc}
                onChange={(e) => setLinkDoc(e.target.value)}
                required 
              />
              <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem', display: 'block' }}>
                Masukkan tautan dokumen Google Docs yang sudah diperbaiki untuk diperiksa ulang pembimbing.
              </span>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Batal</button>
            <button type="submit" className="btn-primary">Kirim Revisi</button>
          </div>
        </form>
      </div>
    </div>
  );
}
