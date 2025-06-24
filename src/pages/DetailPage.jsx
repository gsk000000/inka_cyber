import { useParams, useNavigate } from 'react-router-dom';
import { useVuln } from '../context/VulnContext.jsx';
import VulnerabilityForm from '../components/VulnerabilityForm.jsx';
import EvidenceManager from '../components/EvidenceManager.jsx';

export default function VulnerabilityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vulns, updateVuln, deleteVuln } = useVuln();
  const vuln = vulns.find(v => v.id === id);

  if (!vuln) return <div className="glass-card">Vulnerabilidad no encontrada</div>;

  return (
    <div className="glass-card">
      <button className="btn-glass" onClick={() => navigate(-1)}>
        ← Volver al dashboard
      </button>

      <div className="vuln-header">
        <h2>{vuln.nombre}</h2>
        <span className={`risk-badge ${vuln.riesgo.toLowerCase()}`}>
          {vuln.riesgo}
        </span>
      </div>

      <div className="vuln-meta">
        <p><strong>Tipo:</strong> {vuln.tipo}</p>
        <p><strong>Fecha:</strong> {vuln.fecha}</p>
        <p><strong>Gravedad:</strong> {vuln.gravedad}</p>
        <p><strong>Categoría:</strong> {vuln.categoria}</p>
      </div>

      <div className="vuln-section">
        <h3>Descripción</h3>
        <p>{vuln.descripcion}</p>
      </div>

      <div className="vuln-section">
        <h3>Recomendaciones</h3>
        <p>{vuln.recomendaciones}</p>
      </div>

      <div className="vuln-section">
        <h3>Soluciones propuestas</h3>
        <ul className="solutions-list">
          {vuln.soluciones.map((solucion, index) => (
            <li key={index}>{solucion}</li>
          ))}
        </ul>
      </div>

      <EvidenceManager vuln={vuln} updateVuln={updateVuln} />

      <div className="vuln-actions">
        <button 
          className="btn-danger" 
          onClick={() => {
            if (window.confirm('¿Estás seguro de eliminar esta vulnerabilidad?')) {
              deleteVuln(id);
              navigate('/');
            }
          }}
        >
          Eliminar vulnerabilidad
        </button>
      </div>
    </div>
  );
}