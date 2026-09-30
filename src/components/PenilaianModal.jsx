import React, { useState, useEffect } from 'react';

export default function PenilaianModal({ isOpen, onClose, laporan, onSubmit }) {
  const [nilaiNumeric, setNilaiNumeric] = useState('');
  const [poinNilai, setPoinNilai] = useState('A (Sangat Baik)');
  const [judulNilai, setJudulNilai] = useState('Penilaian Akhir Laporan Magang');
  const [catatan, setCatatan] = useState('');

  useEffect(() => {
    if (laporan && laporan.nilai_laporan) {
      setNilaiNumeric(laporan.nilai_laporan);
    } else {
      setNilaiNumeric('');
    }
  }, [laporan]);

  if (!isOpen || !laporan) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nilaiNumeric) return;

    onSubmit(laporan.id_laporan, {
      id_laporan_magang: laporan.id_laporan,
      id_pembimbing: 101,
      judul_nilai: judulNilai,
      poin_nilai: poinNilai,
      catatan: catatan,
      nilai_laporan: parseFloat(nilaiNumeric),
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Penilaian Laporan Magang</h3>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div style={{ padding: '0.85rem', backgroundColor: '#ecfdf5', borderRadius: '8px', marginBottom: '1.25rem', border: '1px solid #a7f3d0' }}>
              <div style={{ fontSize: '0.78rem', color: '#065f46' }}>Input Penilaian Akhir Pembimbing:</div>
              <div style={{ fontWeight: 700, color: '#064e3b' }}>{laporan.judul_laporan}</div>
              <div style={{ fontSize: '0.8rem', color: '#047857' }}>Peserta: <b>{laporan.nama_peserta}</b></div>
            </div>

            <div className="form-group">
              <label className="form-label">Judul Penilaian *</label>
              <input 
                type="text" 
                className="form-control" 
                value={judulNilai}
                onChange={(e) => setJudulNilai(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Nilai Angka (0-100) *</label>
                <input 
                  type="number" 
                  step="0.01" 
                  min="0" 
                  max="100" 
                  className="form-control" 
                  placeholder="Contoh: 92.50"
                  value={nilaiNumeric}
                  onChange={(e) => setNilaiNumeric(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Predikat / Poin Nilai *</label>
                <select 
                  className="form-control"
                  value={poinNilai}
                  onChange={(e) => setPoinNilai(e.target.value)}
                >
                  <option value="A (Sangat Baik)">A (Sangat Baik)</option>
                  <option value="B+ (Baik)">B+ (Baik)</option>
                  <option value="B (Cukup Baik)">B (Cukup Baik)</option>
                  <option value="C (Perlu Evaluasi)">C (Perlu Evaluasi)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Catatan & Evaluasi Pembimbing</label>
              <textarea 
                className="form-control" 
                placeholder="Catatan apresiasi atau evaluasi untuk peserta magang..."
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Batal</button>
            <button type="submit" className="btn-primary">Simpan Penilaian</button>
          </div>
        </form>
      </div>
    </div>
  );
}
