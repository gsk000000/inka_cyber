import { useState, useMemo } from 'react';
import { useVuln } from '../context/VulnContext';
import Filters from '../components/Filters';
import VulnerabilityList from '../components/VulnerabilityList';
import VulnerabilityForm from '../components/VulnerabilityForm';

export default function DashboardPage() {
  const { vulns, addVuln, updateVuln, deleteVuln } = useVuln();
  const [showForm, setShowForm] = useState(false);
  const [editingVuln, setEditingVuln] = useState(null);
  const [filtros, setFiltros] = useState({ riesgo: '', tipo: '', fecha: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const filtradas = useMemo(() => {
    return vulns.filter((v) => {
      if (filtros.riesgo && v.riesgo !== filtros.riesgo) return false;
      if (filtros.tipo && !v.tipo.toLowerCase().includes(filtros.tipo.toLowerCase())) return false;
      if (filtros.fecha && v.fecha !== filtros.fecha) return false;
      return true;
    });
  }, [vulns, filtros]);

  const handleEdit = (vuln) => {
    setEditingVuln(vuln);
    setShowForm(true);
  };

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      if (editingVuln) {
        await updateVuln(editingVuln.id, data);
      } else {
        await addVuln(data);
      }
      
      setSubmitSuccess(true);
      setTimeout(() => {
        setShowForm(false);
        setEditingVuln(null);
        setIsSubmitting(false);
        setSubmitSuccess(false);
      }, 1000);
    } catch (error) {
      console.error("Error al guardar:", error);
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingVuln(null);
  };

  return (
    <div className="dashboard-container">
      <div className="glass-card">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard - Vulnerabilidades</h1>
          <button 
            className={`btn-glass-primary ${showForm ? 'cancel' : ''}`}
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) setEditingVuln(null);
            }}
            disabled={isSubmitting}
          >
            {showForm ? 'Cancelar' : '+ Registrar Nueva'}
          </button>
        </div>

        <Filters filtros={filtros} setFiltros={setFiltros} />

        {showForm && (
          <VulnerabilityForm 
            initialData={editingVuln || {}}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isEditing={!!editingVuln}
            isSubmitting={isSubmitting}
            submitSuccess={submitSuccess}
          />
        )}

        <VulnerabilityList 
          vulns={filtradas} 
          onEdit={handleEdit}
          onDelete={(id) => {
            if (window.confirm('¿Estás seguro de eliminar esta vulnerabilidad?')) {
              deleteVuln(id);
            }
          }}
        />
      </div>
    </div>
  );
}