export default function EvidenceManager({ vuln, updateVuln }) {
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const validTypes = ['application/pdf', 'image/png', 'image/jpeg'];
    
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    if (invalidFiles.length > 0) {
      alert('Solo se permiten archivos PDF, PNG o JPG');
      return;
    }

    const newEvidencias = [...vuln.evidencias, ...files];
    updateVuln(newEvidencias);
  };

  const remove = (idx) => {
    const newEvidencias = vuln.evidencias.filter((_, i) => i !== idx);
    updateVuln(newEvidencias);
  };

  return (
    <div className="compact-evidence">
      <h4>Evidencias</h4>
      <div className="evidence-controls">
        <label className="file-input-label">
          <input 
            type="file" 
            onChange={handleUpload}
            accept=".pdf,.png,.jpg,.jpeg"
            multiple
          />
          <span>+ Añadir archivos</span>
        </label>
        
        {vuln.evidencias.length > 0 && (
          <div className="evidence-preview">
            {vuln.evidencias.map((ev, i) => (
              <div key={i} className="evidence-item">
                <span className="file-name">{ev.name}</span>
                <button 
                  onClick={() => remove(i)}
                  className="remove-btn"
                  aria-label="Eliminar"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}